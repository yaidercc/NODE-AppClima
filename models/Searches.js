const axios = require('axios');
class Searches {
    historial = ['New york', 'Madrid', 'San Jose'];
    constructor() {
        // TODO: read db if exists.
    }
    /**
     * Params for the mapbox api
     */
    get ParamsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    /**
     * Params for the weather api
     */
    get paramsWeather(){
        return {
            'appid':process.env.OPENWATHER_KEY,
            'units':'metric',
            'lang':'es'         
        }
    }

    /**
     * look information of the city
     * @param {*} place 
     * @returns climate info or []
     */
    async city(place = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.ParamsMapBox
            })

            const resp = await instance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],

            }))
        } catch (error) {
            return [];
        }
    }

    /**
     * look for climatic information of the city with latitude and length
     * @param {*} lat latitude
     * @param {*} lon length
     * @returns 
     */
    async PlaceClimate(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params:{...this.paramsWeather,lat,lon}
            });
            const resp = await instance.get();
            return {
                desc:resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp,
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Searches;
const fs = require("fs");
const axios = require('axios');
class Searches {
    historial = ['New york', 'Madrid', 'San Jose'];
    dbPath = './db/database.json';
    constructor() {
        // TODO: read db if exists.
        this.readDB();
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
    get paramsWeather() {
        return {
            'appid': process.env.OPENWATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    get CapitalizedHistorial() {
        return this.historial.map(places => {
            let words = places.split(" ");
            words = words.map(p => p[0].toUpperCase() + p.substring(1))
            return words.join(" ");
        })
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
                params: {
                    ...this.paramsWeather,
                    lat,
                    lon
                }
            });
            const resp = await instance.get();
            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp,
            }

        } catch (error) {
            console.log(error);
        }
    }

    addToHistorial(lugar = '') {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(lugar.toLocaleLowerCase());

        // Save in db
        this.guardarDB();

    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    readDB() {
        //
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {
            encoding: 'utf-8'
        });

        const data = JSON.parse(info);

        this.historial = [...data.historial];
    }
}

module.exports = Searches;
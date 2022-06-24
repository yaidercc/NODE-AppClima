// Modules and resources
require('dotenv').config()
const {
    leerInput,
    pausa,
    inquirerMenu,
    ListPLaces
} = require("./helpers/inquirer");
const Searches = require("./models/Searches");

// Code

const main = async () => {
    let opt;
    const searches = new Searches();
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // show Message
                const place = await leerInput("Ciudad: ");

                // Search places
                const places = await searches.city(place);

                // Select place
                const id = await ListPLaces(places);
                if (id === '0') continue;
                const placeSelected = places.find(p => p.id == id);
                
                //save in db
                searches.addToHistorial(placeSelected.name)

                // climate
                const climate = await searches.PlaceClimate(placeSelected.lat, placeSelected.lng);
                // Show results
                console.clear();
                console.log('\n Informacion de la ciudad. \n'.green);
                console.log('Ciudad: ', placeSelected.name);
                console.log('Lat: ', placeSelected.lat);
                console.log('Lng: ', placeSelected.lng);
                console.log('Temperatura: ', climate.temp + '°');
                console.log('Minima: ', climate.min);
                console.log('Maxima: ', climate.max);
                console.log('Como esta el clima : ', climate.desc);
                break;
            case 2:
                searches.CapitalizedHistorial.forEach((place, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${place}`);
                })
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt != 0);
}

main();
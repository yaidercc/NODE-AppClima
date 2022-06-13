// Modules and resources

const { leerInput, pausa, inquirerMenu } = require("./helpers/inquirer");
const Searches= require("./models/Searches");

// Code

const main =async()=>{
    let opt;
    const searches= new Searches();
    do{
        opt=await inquirerMenu();

        switch (opt) {
            case 1:
                // show Message
                const place= await leerInput("Ciudad: ");
                console.log(place);
                // Search places

                // Select places

                // climate
                console.log('\n Informacion de la ciudad. \n'.green);
                console.log('Ciudad: ',);
                console.log('Lat: ',);
                console.log('Lng: ',);
                console.log('Temperatura: ',);
                console.log('Minima: ',);
                console.log('Maxima: ',);
                break;
        
            default:
                break;
        }
        if(opt!==0) await pausa();
    }while(opt!=0);
}

main();
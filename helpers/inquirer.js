//Resources
const inquirer=require("inquirer");
require("colors");

const questions=[
    {
        type:'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value:1,
                name: `${'1.'.green} Buscar ciudad.`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial.`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir.`
            },
        ]
    }
];



const inquirerMenu=async()=>{
    console.clear();
    console.log("========================".green);
    console.log("Seleccione una opción");
    console.log("========================".green);

    const {option} = await inquirer.prompt(questions);

    return option;

}

const pausa=async()=>{
    const question=[
        {
            type: 'input',
            name: 'enter',
            message:`Presione ${'enter'.green} para continuar.`
        }
    ]
    console.log("\n");
    await inquirer.prompt(
        question
    );
    
}

const leerInput=async(message)=>{
    const question=[
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc}=await inquirer.prompt(question);

    return desc;
}

const ListPLaces = async(places = [])=>{
    const choices = places.map((place,key)=>{
        const idx=`${key+1}.`.green;
        return{
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    choices.unshift({
        value:'0',
        name: '0.'.green+' Cancelar'
    })

    const preguntas=[
        {
            type:'list',
            name:'id',
            message:'Seleccione lugar: ',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas);

    return id;
}

const mensajeConfirmacion= async()=>{

    const preguntas=[
        {
            type:'confirm',
            name:'asnwer',
            message:'¿Estas seguro que deseas borrar esta tarea?',
        }
    ];

    const {asnwer} = await inquirer.prompt(preguntas);

    return asnwer;
}

const mostrarListadoChecklist = async(tareas = [])=>{
    const choices = tareas.map((item,key)=>{
        const idx=`${key+1}.`.green;
        return{
            value: item.id,
            name: `${idx} ${item.desc}`,
            checked:(item.completadoEn) ? true : false
        }
    });
    const preguntas=[
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(preguntas);

    return ids;
}

module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    ListPLaces,
    mensajeConfirmacion,
    mostrarListadoChecklist
}
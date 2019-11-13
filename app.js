//const axios = require('axios')


const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const ciudadBD = require('./bd');
const fs = require('fs'); //sirve para crear un archivo

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv

const getInfo = async(direccion) => {
    try {
        const coords = await lugar.getLugar(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        let c1 = new ciudadBD(direccion, temp.temp, temp.pressure, temp.humidity)
        return c1
    } catch (error) {
        console.log(`No se pudo determinar el clima en ${direccion}`);
    }
};

function avc(ciudad) {
    console.log("Localidad : " + ciudad.ciudad);
    console.log("Temperatura : " + ciudad.temp);
    console.log("Presión : " + ciudad.presion);
    console.log("Humedad : " + ciudad.humedad);

    fs.appendFile('clima.txt',
        `${ciudad.ciudad} 
        ${ciudad.temp} 
        ${ciudad.presion} 
        ${ciudad.humedad}
        ${''}`,
        (error) => {
            if (error) throw error;

        })
}

getInfo(argv.direccion)
    .then(function(data) {
        avc(data)
    })
    .catch(console.log);
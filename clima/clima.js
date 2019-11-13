const axios = require('axios')

const getClima = async(lat, lng) => {

    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&appid=ad04adf4c8de1eed867ce711a3049b8d&units=metric`)

    return resp.data.main
}

module.exports = {
    getClima
}
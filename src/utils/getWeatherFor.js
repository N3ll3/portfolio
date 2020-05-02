const request = require("postman-request");

// const tokenDarksky = "af241aed5a90a7b06193b32224caa238";

const tokenWeatherStack="f90b882ad2894e1305087fcb64bc7f3f";

const getWeatherFor = (query, callback) => {
  // const options =`language=${option.langue}&units=${option.units}`;
  const url = `http://api.weatherstack.com/current?access_key=${tokenWeatherStack}&query=${query}&units=m`;
  
  request({ url, json: true }, (error, response, body) => {

    if (body.error) {
      callback(`Impossible de se connecter au service meteo : ${body.error.info}`, undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = getWeatherFor;

const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=eb0496c78984991524f2f2e0d244a77a&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = `${body.current.weather_descriptions[0]}. The temperature is ${body.current.temperature} °C outside and feels like ${body.current.feelslike} °C at ${body.current.observation_time} which was the observation time. Wind speed: ${body.current.wind_speed}, Humidity: ${body.current.humidity}. Visibility: ${body.current.visibility}.`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;

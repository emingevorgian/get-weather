const request = require("request");

const geocode = (address, callback) => {
  const url = `
    https://api.mapbox.com/geocoding/v5/mapbox.places/
    ${encodeURIComponent(address)}
    .json?access_token=pk.eyJ1IjoiZW1pbm5pbWUiLCJhIjoiY2wzMGEyaG0zMW5haDNrbXA0NndzOGdncyJ9.UIpzqQmogg_OsEQrXcDdeQ&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (body.features.length < 1) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;

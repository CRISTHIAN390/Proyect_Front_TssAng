const packageInfo = require('../../../package.json');

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiUrl: 'http://0.0.0.0:4500', // Cambia esta URL por la URL de tu API
  apiUrlMl: 'http://157.230.191.218:5000' // o actualízala también si es necesario
};

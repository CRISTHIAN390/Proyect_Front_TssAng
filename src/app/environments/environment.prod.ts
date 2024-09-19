
const packageInfo = require('../../package.json');
export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiUrl: 'http://127.0.0.1:4500'  // Cambia esta URL por la URL de tu API
};

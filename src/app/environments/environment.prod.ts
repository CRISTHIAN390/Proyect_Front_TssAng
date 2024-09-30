import packageInfo from '../../../package.json';
export const environment = {
  appVersion: packageInfo.version,
  production: false,
  //apiUrl: 'http://127.0.0.1:4500',// Cambia esta URL por la URL de tu API
  apiUrl:'https://proyecto-backend-tssfast.onrender.com',
  // apiUrlMl: 'http://157.230.191.218:5000'
};

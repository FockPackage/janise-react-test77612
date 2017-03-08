const path = require('path');

const rootPath = path.normalize(`${__dirname}/..`);
const env = process.env.NODE_ENV || 'development';

console.log(rootPath);

const config = {
  development: {
    root: rootPath,
    port: process.env.PORT || 3000,
    serverUrl: 'http://222.68.185.241:8900/ODSPhoneWeb',
  },
  production: {
    root: rootPath,
    port: process.env.PORT || 3000,
    serverUrl: 'http://222.68.185.241:8900/ODSPhoneWeb',
  },
};

module.exports = config[env];

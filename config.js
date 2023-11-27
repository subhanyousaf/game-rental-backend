const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const result = dotenv.config({ path: `.env.${env}` });

if (result.error) {
    throw result.error;
}

const { parsed: envs } = result;
module.exports = envs;
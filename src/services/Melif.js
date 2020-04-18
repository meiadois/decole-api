var M = require('melif')

// Fill in the required information
const Melif = new M({
    api_root_url: 'https://api.mercadolibre.com',
    auth_url: 'https://auth.mercadolibre.com/authorization',
    oauth_url: 'https://api.mercadolibre.com/oauth/token',
    client_id: process.env.ML_CLIENT_ID,
    client_secret: process.env.ML_CLIENT_SECRET,
});

module.exports = Melif;
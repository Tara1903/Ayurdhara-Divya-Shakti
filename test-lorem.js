const https = require('https');
const fs = require('fs');
https.get('https://loremflickr.com/600/600/herb,ayurveda', (res) => {
    console.log(res.statusCode, res.headers['location'] || res.url);
});

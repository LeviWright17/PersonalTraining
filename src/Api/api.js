const express = require('express')
const app = express()

const things = ['one', 'two', 'three', 'four', 'five', 'six']
const https = require('https');

const getRequest = function (callback) {
    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            // console.log(JSON.parse(data).explanation);
            callback('i am done');
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

app.get('/dothings', function (req, res) {
    console.log('\nstart');
    let x = getRequest(function (resp) {
        console.log('resp', resp);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ key: 'value' }));
    });

    console.log('end')
});

app.listen(3000)

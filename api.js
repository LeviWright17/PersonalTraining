const express = require('express');
const https = require('https'); 
const app = express(); 

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json'); 
    res.send(JSON.stringify({key: 'value'})); 
}); 

app.get('/contact', (req, res) => {
    res.setHeader('Content-Type', 'application/json'); 
    res.send(JSON.stringify({key: 'value'})); 
}); 

app.listen(3000); 



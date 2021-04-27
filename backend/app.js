const express = require('express');

const app = express();

app.listen(4007);

app.get('/', function(req, res){
    res.send("Ya funciona");
});
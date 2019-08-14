require('./config/config');

const express = require('express');
const app = express();
var bodyParser = require('body-parser') ;

const mongoose = require('mongoose');


//Son Midelware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Importamos las rutas desde el archivo index
app.use(require('./routes/index'));


app.get('/', function (req, res) {
    res.json('Home');
})


mongoose.connect(process.env.URLDB, 
    { useNewUrlParser: true, useCreateIndex: true},
    (err, res)=> {
    if (err ) throw err;

    console.log('Database online');
});
 
app.listen(process.env.PORT, () =>{
    console.log("Escuchando en el puerto", process.env.PORT);
})



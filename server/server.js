require('./config/config');

const express = require('express');
const app = express();
var bodyParser = require('body-parser') ;

//Son Midelware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/usuario', function (req, res) {
  res.json('Get Usuarios')
})

app.post('/usuario', function (req, res) {
    //Update
    let body = req.body;

    if (body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'Falta el nombre'
        })
    }else{
        res.json({
            body
        })
    }


    
})
  
app.put('/usuario/:id', function (req, res) {
    //Crear
    let id = req.params.id;
    
    res.json(
        {
           body
        }
    )
})

app.delete('/usuario', function (req, res) {
    res.json('delete Usuarios')
})

 
app.listen(process.env.PORT, () =>{
    console.log("Escuchando en el puerto", process.env.PORT);
})
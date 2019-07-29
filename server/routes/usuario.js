const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();


//Traer los usuarios
app.get('/usuario', function (req, res) {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true}, 'nombre email')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) =>{
                if (err){
                    res.status(400).json({
                        ok: false,
                        err
                    });
                }else{

                    Usuario.count({estado: true}, (err, cuantos) =>{
                        res.json({
                            ok: true,
                            usuarios,
                            registros: cuantos
                        })
                    })


                    
                }
            })

})


//Creación
app.post('/usuario', function (req, res) {
      let body = req.body;
  
        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        })

        usuario.save((err, usuarioDB) => {

            if (err){
                res.status(400).json({
                    ok: false,
                    err
                });
            }else{
                res.json({
                    ok: true,
                    usuario: usuarioDB
                })
            }

            

        } )

    
})
  
  
 //Actualizacion   
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    

    //Esta es una forma de no actualizar campos
    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, usuarioDb) => {

        if (err){
            res.status(400).json({
                ok: false,
                err
            });
        }else{
            res.json({
                ok: true,
                usuario: usuarioDb
            });
        } 
    })

  })
  

  app.delete('/usuario/:id', function (req, res) {
        let id = req.params.id;

        //Usuario.findByIdAndUpdate


        //Eliminar el registro
        Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
            if (err){
                res.status(400).json({
                    ok: false,
                    err
                });
            }else{
                res.json({
                    ok: true,
                    usuario: usuarioBorrado
                    }
                )
            }
        })

  })
  
  module.exports = app;
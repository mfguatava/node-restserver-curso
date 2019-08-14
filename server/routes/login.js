const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();


app.post('/login', (req, res) =>{
        let body = req.body;

        Usuario.findOne({email: body.email },  (err, usuariosDB) => {
            if (err){
                res.status(400).json({
                    ok: false,
                    err
                });
            }else{
                
                if (!usuariosDB)
                {
                    res.json({
                        ok: false,
                        message: '(Usuario) o Contraseña no valido'
                        }
                    )

                }else{
                   if (bcrypt.compareSync(body.password, usuariosDB.password)){
                        let token = jwt.sign({usuario: usuariosDB}, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})    
                    
                        res.json({
                            ok: true,
                            usuario: usuariosDB,
                            token
                        }
                        )
                   }else{
                        res.json({
                            ok: false,
                            message: 'Usuario o (Contraseña) no valido'
                            }
                        )
                   }     


                }

            
            }


        })


        

})



module.exports = app;
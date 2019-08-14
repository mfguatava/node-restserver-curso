const jwt = require('jsonwebtoken');

// =================================
//         Verificar el token
// =================================


let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) =>{

        if (err){
            return res.status(401).json({
                ok: false,
                err: {message: 'Token no valido'}
            })
        }

        req.usuario = decoded.usuario;
        next();

    })


};


// =================================
//         Verificar el RoleAdmin
// =================================

let verificarRolAdmin = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        return res.status(401).json({
            ok: false,
            err: {message: 'Rol no valido'}
        })
    }

} 

module.exports = {verificarToken, verificarRolAdmin}
    
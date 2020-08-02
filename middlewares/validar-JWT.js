const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer el TOKEN
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: 'No tiene el token'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT)

        req.uid = uid  //De esta manera agrego el uid al header de la peticion
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }

    next()
}

module.exports = {
    validarJWT
}
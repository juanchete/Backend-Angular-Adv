const{response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');
const usuario = require('../models/usuario');

const login = async ( req, res = response) => {

    const {email, password} = req.body;

    try {

        //Verificar Email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe el email en la BDD'
            })
        }

        //Verificar Contrasena
        const validPassword = bcrypt.compareSync( password, usuarioDB.password)

        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'La contrasena no es valida'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id)

        res.status(200).json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async (req, res = response) =>{

    const googleToken = req.body.token;

    try {

        const {name, email, picture} = await googleVerify( googleToken);

        const usuarioDB = await Usuario.findOne({email})

        let usuario;

        if(!usuarioDB){
             usuario = new Usuario({
                nombre: name,
                email,
                password: '00',
                img: picture,
                google: true
            })
        }else {
            usuario=usuarioDB
            usuario.google = true
        }

        await usuario.save()

         //Generar el JWT
         const token = await generarJWT(usuario.id)

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {

        console.log(error);

        res.status(401).json({
            ok:false,
            msg:'El Token no es valido'
        })
        
    }


}

module.exports = {
    login,
    googleSignIn
}
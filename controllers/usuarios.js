const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario')


const getUsuarios = async (req, res) =>{

    const usuarios = await Usuario.find({},'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}

const crearUsuarios = async (req, res = response) =>{

    const {email, password } = req.body;

    

    try {

        const existeEmail = await Usuario.findOne({ email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body);

        //Encriptar Contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save()

        //Crear Token
        const token = await generarJWT(usuario.id)

        res.json({
           ok: true,
           usuario,
           token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }

    
}

const actualizarUsuario = async (req, res = response) => {

    //Validar token y si usuario es correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe el usuario por ese id'
            })
        }

        //Actualizacones
        const {password, google,email,...campos} = req.body;

        if (usuarioDB.email !== email) {
            
            const existeEmail = await Usuario.findOne({ email})
            if ( existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true})

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, revisa los Logs'
        })
    }
}

const eliminarUsuario = async (req, res = response) =>{

    uid = req.params.id
    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe el usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid)

        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Ocurrio algo inesperado"
        })
    }

    
    
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    eliminarUsuario
}
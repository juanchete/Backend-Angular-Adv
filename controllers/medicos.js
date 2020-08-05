const {response} = require('express')

const Medico = require('../models/medico')

const getMedicos = async (req,res = response) =>{

    

    const medicos = await Medico.find()
                                      .populate('usuario','nombre')
                                      .populate('hospital','nombre')

    res.json({
        ok:true,
        medicos
    })
}

const crearMedico = async (req,res = response) =>{

    const uid = req.uid;
    const medico = new Medico( {
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save()

        res.json({
            ok:true,
            medico: medicoDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const actualizarMedico = async (req,res = response) =>{

    const id = req.params.id
    const uid = req.uid

    try {

        const medico = await Medico.findById(id)

        if (!medico) {
            return res.status(400).json({
                ok:true,
                msg:'Medico No Encontrado'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true})



        res.json({
            ok:true,
            medico: medicoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Admin',

        })
        
    }
}

const borrarMedico = async (req,res = response) =>{

    const id = req.params.id

    try {

        const medico = await Medico.findById(id)

        if (!medico) {
            return res.status(400).json({
                ok:true,
                msg:'Medico No Encontrado'
            })
        }


        await Medico.findByIdAndDelete(id)


        res.json({
            ok:true,
            msg: 'Medico Borrado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Admin',

        })
        
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
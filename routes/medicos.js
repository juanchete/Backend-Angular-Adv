/*
     ruta: '/api/medicos'
*/


const { Router } = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos');
const {getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico}= require('../controllers/medicos')
const {validarJWT} = require('../middlewares/validar-JWT');

const router= Router()

router.get('/',getMedicos )

router.post('/',[
    validarJWT,
    check('nombre','El Nombre del medico es obligatorio').not().isEmpty(),
    check('hospital','El Id del hospital es obligatorio').isMongoId(),
    validarCampos
] ,crearMedico )

router.put('/:id',[],actualizarMedico)

router.delete('/:id',borrarMedico)

module.exports = router;
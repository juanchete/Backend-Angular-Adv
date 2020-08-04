/*
   ruta: api/todo/:busqueda
*/


const { Router } = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos');
const {getTodo, getDocumentosColeccion}= require('../controllers/busquedas')
const {validarJWT} = require('../middlewares/validar-JWT');

const router= Router()

router.get('/:busqueda', validarJWT,getTodo )
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion )

// router.post('/',[
//     validarJWT,
//     check('nombre','El Nombre del hospital es obligatorio').not().isEmpty(),
//     validarCampos
// ] ,crearHospital )

// router.put('/:id',[],actualizarHospital)

// router.delete('/:id',borrarHospital)

module.exports = router;
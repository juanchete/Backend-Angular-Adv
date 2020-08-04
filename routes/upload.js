/*
   ruta: api/uploads/:busqueda
*/


const { Router } = require('express');
const {check} = require('express-validator')
const expressfileUpload = require('express-fileupload');

const {validarCampos} = require('../middlewares/validar-campos');
const {getTodo, getDocumentosColeccion}= require('../controllers/busquedas')
const {validarJWT} = require('../middlewares/validar-JWT');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router= Router()

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload )

router.get('/:tipo/:foto', retornaImagen )


module.exports = router;
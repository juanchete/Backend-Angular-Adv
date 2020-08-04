const fs = require('fs')

const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')

const borrarImagen = (path) =>{

    

           if( fs.existsSync(path)){
               //Borrar la imagen
               fs.unlinkSync(path);
           }

}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = ''
   
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)
            if (!medico) {
                console.log('No se encontro medico por id');
                return false
            }

             pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo)
           

           medico.img = nombreArchivo
           await medico.save();
           return true;

        break;
        
        case 'hospitales':

            const hospitales = await Hospital.findById(id)
            if (!hospitales) {
                console.log('No se encontro hospitales por id');
                return false
            }

             pathViejo = `./uploads/hospitales/${hospitales.img}`;
            borrarImagen(pathViejo)
           

           hospitales.img = nombreArchivo
           await hospitales.save();
           return true;
            
            break;

        case 'usuarios':

            const usuarios = await Usuario.findById(id)
            if (!usuarios) {
                console.log('No se encontro usuarios por id');
                return false
            }

             pathViejo = `./uploads/usuarios/${usuarios.img}`;
            borrarImagen(pathViejo)
           

           usuarios.img = nombreArchivo
           await usuarios.save();
           return true;
            
            
            
            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}
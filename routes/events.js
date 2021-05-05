/*
    Event Routes    /api/events
*/


const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { check } = require('express-validator');
const {Router} = require('express');
const {validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');
const router = Router();
//todas tienen que pasar la validacion del JWT 
router.use(validarJWT);


// Obtener eventos
router.get('/', getEventos);
// Crear evento
router.post(
    '/',
    [
        check('title', 'titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);
// Actualizar evento
router.put(
    '/:id', 
     [
        check('title', 'titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);
// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;


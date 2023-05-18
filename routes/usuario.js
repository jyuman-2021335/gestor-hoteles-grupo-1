//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUsuario, registerUsuarios, putUsuario, deleteUsuario, putUsuarioPerfil, deleteUsuarioPerfil } = require('../controllers/usuario');
const { emailExiste, esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', [
    validarJWT,
    esAdminRole
] , getUsuarios);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol', 'El rol es obligatorio para el post').not().isEmpty(),
    check('rol').custom( esRoleValido ),
    validarCampos,
    validarJWT,
    esAdminRole
] , postUsuario);

<<<<<<< Updated upstream
router.post('/registro', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'la password es obligatoria para el post').not().isEmpty(),
    check('password', 'La passward debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], registroUsuario);

=======
router.post('/register', registerUsuarios);
>>>>>>> Stashed changes

router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('rol').custom( esRoleValido ),
    validarJWT,
    esAdminRole
], putUsuario);


router.delete('/eliminar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarJWT,
    esAdminRole
] ,deleteUsuario);

router.put('/editarcuenta/:id',[
    validarJWT,
], putUsuarioPerfil);

router.delete('/eliminarcuenta/:id',[
    validarJWT,
], deleteUsuarioPerfil);

module.exports = router;
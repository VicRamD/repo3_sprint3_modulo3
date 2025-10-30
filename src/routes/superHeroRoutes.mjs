import express from 'express';
import {body, validationResult} from 'express-validator';

import {obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller,
    crearNuevoSuperHeroeController, actualizarSuperheroeController, eliminarSuperHeroePorIDController,
    eliminarSuperHeroePorNombreDeHeroeController
} from '../controllers/superheroesController.mjs';



const router = express.Router();

//Validaciones
const superHeroeValidator = [body('nombreSuperHeroe').notEmpty().isString().trim().isLength({min: 3, max: 60})
    .withMessage('El nombre/alias del superhéroe debe tener entre 3 y 60 carácteres').escape(),
    body('nombreReal').notEmpty().isString().trim().isLength({min: 3, max: 60})
    .withMessage('El nombre real del superhéroe debe tener entre 3 y 60 carácteres').escape(),
    body('edad').notEmpty().isNumeric().trim()
    .custom( value => {
        //console.log('en custom');
        //console.log(typeof value);
        return parseInt(value) >= 0;
    })
    .withMessage('La edad no puede ser negativa').escape(),
    body('poderes').exists({checkFalsy: true}).isArray({min: 1}) //verifica que sea un array de por lo menos un elemento
    .withMessage('Debe haber por lo menos un poder').escape(),
    //elementos del array poderes
    body('poderes.*').notEmpty().trim().isString().isLength({min: 3, max: 60})
    .withMessage('El poder debe tener entre 3 y 60 carácteres').escape()
]

const eliminarSuperHeroeValidator = body('nombreSuperHeroe').notEmpty().isString().trim().isLength({min: 3, max: 60})
    .withMessage('El nombre ingresado debe tener entre 3 y 60 carácteres').escape();

//get espera una ruta y un handler/manejador
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//crear un nuevo heroe
//si se recibe una petición post para la ruta heroes se ejecuta la siguiente línea
router.post('/heroes', superHeroeValidator, crearNuevoSuperHeroeController);

//Eliminar por nombre, manda por el body el nombreSuperHeroe
router.delete('/heroes', eliminarSuperHeroeValidator, eliminarSuperHeroePorNombreDeHeroeController);

//heroes/:id se dejó para el final para evitar que al escribir /mayores-30 lo interprete como un id
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.put('/heroes/:id', superHeroeValidator, actualizarSuperheroeController);
router.delete('/heroes/:id', eliminarSuperHeroePorIDController);
//http://localhost:3000/api/heroes/68f28aa5653a5ddc12de3b02



export default router;

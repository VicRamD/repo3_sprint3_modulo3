import express from 'express';

import {obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller,
    crearNuevoSuperHeroeController, actualizarSuperheroeController, eliminarSuperHeroePorIDController,
    eliminarSuperHeroePorNombreDeHeroeController
} from '../controllers/superheroesController.mjs';

import {superHeroeValidator, eliminarSuperHeroeValidator} from './validationRules.mjs';


const router = express.Router();

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

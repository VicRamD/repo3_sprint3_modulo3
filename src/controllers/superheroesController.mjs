import { validationResult } from 'express-validator';

import {obtenerSuperheroePorId, obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,
    crearNuevoSuperheroe, actualizarSuperheroe, 
    eliminarSuperHeroePorID, eliminarSuperHeroePorNombreDeHeroe} from '../services/superheroesService.mjs';

import {renderizarSuperheroe, renderizarListaSuperheroes} from '../views/responseView.mjs';

export const obtenerSuperheroePorIdController = async (req, res) => {
    try {
        const {id} = req.params;
        //console.log(id);
        const superheroe = await obtenerSuperheroePorId(id); 
        console.log(superheroe);
        if(!superheroe){
            return res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }    

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener supehéroe',
            error: error.message
        });
    }
}

export const obtenerTodosLosSuperheroesController = async (req, res) => {
    try {
        console.log("en obtenerTodosLosSuperheroesController");
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        //res.status(200).json(superheroesFormateados);

        res.render('dashboard', {superheroes: superheroesFormateados})
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los superhéroes',
            error: error.message
        });
    }
}

export const buscarSuperheroesPorAtributoController = async (req, res) => {
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);    
        
        if(superheroes.length === 0){
            return res.status(404).send(
                {mensaje:"No se encontraron superhéroes con ese atributo"}
            );
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
        
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al buscar los superhéroes',
            error: error.message
        });
    }
    
}

export const obtenerSuperheroesMayoresDe30Controller = async (req, res) => {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if(superheroes.length===0){
            res.status(404).send({
                mensaje: 'No se encontraron superhéroes mayores de 30 años'
            });
        }

        const superheroeFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroeFormateados);

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener superhéroes mayores de 30',
            error: error.message
        });
    }
}

export const renderizarFormCrearNuevoSuperHeroeController = (req, res) => {
    console.log("En renderizarFormCrearNuevoSuperHeroeController");
    res.render('addSuperhero');
}

export const crearNuevoSuperHeroeController = async (req, res) =>{
    try {
        console.log("en crearNuevoSuperHeroeController");
        //console.log("body", req.body);
        //console.log("poderes", req.body.poderes, typeof req.body.poderes);
        const errors = validationResult(req);
        //console.log('edad', typeof req.body.edad);
        console.log("errors", errors);
        if (!errors.isEmpty()) {
            //return res.send(`Hello, ${req.query.person}!`);
            return res.status(400).json({
                warning: 'Se detectaron errores en los valores ingresados',
                errors: errors.array().map(error => {
                    return {
                        field: error.path,
                        message: error.msg
                    }
                })
            });
        }

        console.log("body", req.body);
        const datos = req.body;
        console.log(datos);
        const datosSuperHeroe = {
            nombreSuperHeroe: datos.nombreSuperHeroe,
            nombreReal: datos.nombreReal,
            edad: datos.edad,
            planetaOrigen: datos.planetaOrigen,
            debilidad: datos.debilidad,
            poderes: datos.poderes,
            aliados: datos.aliados,
            enemigos: datos.enemigos,
            creador: datos.creador
        };
        console.log(datosSuperHeroe);
        const nuevoHeroe = await crearNuevoSuperheroe(datosSuperHeroe);

        const superheroeFormateado = renderizarSuperheroe(nuevoHeroe);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error en la creación de nuevo héroe',
            error: error.message
        });
    }
}

export const renderizarFormEditarSuperHeroeController = async (req, res) => {
    
    try {
        console.log("En renderizarFormEditarSuperHeroeController");
        const {id} = req.params;
        //console.log(id);
        const superheroe = await obtenerSuperheroePorId(id); 
        console.log(superheroe);
        if(!superheroe){
            return res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }    

        //const superheroeFormateado = renderizarSuperheroe(superheroe);
        //res.status(200).json(superheroeFormateado);

        res.render('editSuperhero', {superheroe});
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener supehéroe',
            error: error.message
        });
    }
}

export const actualizarSuperheroeController = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                warning: 'Se detectaron errores en los valores ingresados',
                errors: errors.array().map(error => {
                    return {
                        field: error.path,
                        message: error.msg
                    }
                })
            });
        }

        const {id} = req.params;

        console.log(req.body);
        const datosSuperHeroe = req.body;
        console.log(datosSuperHeroe);

        const heroeActualizado = await actualizarSuperheroe(id, datosSuperHeroe);
        console.log("Actualizar superheroe", heroeActualizado);

        if(!heroeActualizado){
            return res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }  

        
        const superheroeFormateado = renderizarSuperheroe(heroeActualizado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al actualizar un superhéroe',
            error: error.message
        });
    }
}

export const eliminarSuperHeroePorIDController = async (req, res) => {
    try {
        const {id} = req.params;

        const heroeEliminado = await eliminarSuperHeroePorID(id);
        console.log("Superheroe Eliminado", heroeEliminado);

        if(!heroeEliminado){
            return res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }  

        
        const superheroeFormateado = renderizarSuperheroe(heroeEliminado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar un superhéroe',
            error: error.message
        });
    }
}

export const eliminarSuperHeroePorNombreDeHeroeController = async (req, res) => {
    try {
        const errors = validationResult(req);
        //console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                warning: 'Se detectaron errores en el valor ingresado',
                errors: errors.array().map(error => {
                    return {
                        field: error.path,
                        message: error.msg
                    }
                })
            });
        }

        const {nombreSuperHeroe} = req.body;
        console.log(nombreSuperHeroe);

        const heroeEliminado = await eliminarSuperHeroePorNombreDeHeroe(nombreSuperHeroe);
        console.log("Superheroe Eliminado", heroeEliminado);

        if(!heroeEliminado){
            return res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }  

        
        const superheroeFormateado = renderizarSuperheroe(heroeEliminado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar un superhéroe',
            error: error.message
        });
    }
}
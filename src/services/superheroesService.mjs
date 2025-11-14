import SuperHeroRepository from '../repository/SuperHeroRepository.mjs';

export const obtenerSuperheroePorId = async (id) => {
    //console.log("En obtenerSuperheroePorId");
    return await SuperHeroRepository.obtenerPorId(id);
}

export const obtenerTodosLosSuperheroes = async () => { 
    //console.log("En obtenerTodosLosSuperheroes");
    return await SuperHeroRepository.obtenerTodos();
}

export const buscarSuperheroesPorAtributo = async (atributo, valor) => {
    //console.log("En buscarSuperheroesPorAtributo");
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export const obtenerSuperheroesMayoresDe30 = async () => {
    //console.log("En obtenerSuperheroesMayoresDe30");
    return await SuperHeroRepository.obtenerMayoresDe30();
}

export const crearNuevoSuperheroe = async (datosSuperHeroe) => {
    //console.log("En crearNuevoSuperheroe");
    console.log(datosSuperHeroe);
    return await SuperHeroRepository.crearNuevoSuperHeroe(datosSuperHeroe);
}

export const actualizarSuperheroe = async (id, datosSuperHeroe) => {
    //console.log("En actualizarSuperheroe");
    console.log(datosSuperHeroe);
    return await SuperHeroRepository.actualizarSuperHeroe(id, datosSuperHeroe);
}

export const eliminarSuperHeroePorID = async (id) => {
    //console.log("En eliminarSuperHeroePorID");
    return await SuperHeroRepository.eliminarSuperHeroePorID(id);
}

export const eliminarSuperHeroePorNombreDeHeroe = async (nombreSuperHeroe) => {
    //console.log("En eliminarSuperHeroePorNombreDeHeroe");
    return await SuperHeroRepository.eliminarSuperHeroePorNombreDeHeroe(nombreSuperHeroe);
}
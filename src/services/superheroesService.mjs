import SuperHeroRepository from '../repository/SuperHeroRepository.mjs';

export const obtenerSuperheroePorId = async (id) => {
    return await SuperHeroRepository.obtenerPorId(id);
}

export const obtenerTodosLosSuperheroes = async () => {   
    return await SuperHeroRepository.obtenerTodos();
}

export const buscarSuperheroesPorAtributo = async (atributo, valor) => {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export const obtenerSuperheroesMayoresDe30 = async () => {
    return await SuperHeroRepository.obtenerMayoresDe30();
}

export const crearNuevoSuperheroe = async (datosSuperHeroe) => {
    console.log(datosSuperHeroe);
    return await SuperHeroRepository.crearNuevoSuperHeroe(datosSuperHeroe);
}

export const actualizarSuperheroe = async (id, datosSuperHeroe) => {
    console.log(datosSuperHeroe);
    return await SuperHeroRepository.actualizarSuperHeroe(id, datosSuperHeroe);
}

export const eliminarSuperHeroePorID = async (id) => {
    return await SuperHeroRepository.eliminarSuperHeroePorID(id);
}

export const eliminarSuperHeroePorNombreDeHeroe = async (nombreSuperHeroe) => {
    return await SuperHeroRepository.eliminarSuperHeroePorNombreDeHeroe(nombreSuperHeroe);
}
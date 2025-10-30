class IRepository {
    obtenerPorId(id) {
        throw new Error("Método 'obtenerPorID()' no implementado");
    }
    obtenerTodos() {
        throw new Error("Método 'obtenerTodos()' no implementado");
    }
    buscarPorAtributo(atributo, valor) {
        throw new Error("Método 'buscarPorAtributo()' no implementado");
    }
    obtenerMayoresDe30() {
        throw new Error("Método 'obtenerMayoresDe30()' no implementado");
    }

    crearNuevoSuperHeroe(datosSuperHeroe){
        throw new Error("Método 'crearNuevoSuperHeroe()' no implementado");
    }

    actualizarSuperHeroe(id, datosSuperHeroe){
        throw new Error("Método 'actualizarSuperHeroe()' no implementado");
    }

    eliminarSuperHeroePorID(id){
        throw new Error("Método 'eliminarSuperHeroePorID()' no implementado");
    }

    eliminarSuperHeroePorNombreDeHeroe(nombreSuperHeroe){
        throw new Error("Método 'eliminarSuperHeroePorNombreDeHeroe()' no implementado");
    }
}

export default IRepository;


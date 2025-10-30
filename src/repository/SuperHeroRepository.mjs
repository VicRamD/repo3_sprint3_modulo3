//Importar el modelo de superheroes
import SuperHero from '../models/SuperHero.mjs'; 
//Importar abstracción de los metodos CRUD
import IRepository from './IRepository.mjs';

//Clase SuperHeroRepository que hereda de IRepository
class SuperHeroRepository extends IRepository {
    async obtenerPorId(id){
        //devuelve un superhéroe con el id enviado
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor){
        return await SuperHero.find({[atributo]: valor});
    }

    async obtenerMayoresDe30(){
        
        //Heroes mayores de 30 años de la Tierra
        return await SuperHero.find({
            //$gt: greater than/mayor que
            edad: {$gt: 30},
            planetaOrigen: "Tierra",
            $expr: { $gte: [{ $size: "$poderes" }, 2] }
            /**
             * $expr: permite usar expresiones de agregación
             * $size: cuenta la cantidad de elementos en poderes
             * $gte: greater than or equal, revisa que sea mayor o igual que 2
             */
        });
        //ejemplo en mongoDB compass {edad:{$gt: 25}, planetaOrigen: "Tierra"}

    }

    async crearNuevoSuperHeroe(datosSuperHeroe){
        console.log(datosSuperHeroe);

        const superHeroe = await SuperHero.create(
            {
                nombreSuperHeroe: datosSuperHeroe.nombreSuperHeroe,
                nombreReal: datosSuperHeroe.nombreReal,
                edad: datosSuperHeroe.edad,
                planetaOrigen: datosSuperHeroe.planetaOrigen,
                debilidad: datosSuperHeroe.debilidad,
                poderes: datosSuperHeroe.poderes,
                aliados: datosSuperHeroe.aliados,
                enemigos: datosSuperHeroe.enemigos,
                creador: datosSuperHeroe.creador,
            }
        )
        return superHeroe;
    }

    async actualizarSuperHeroe(id, datosSuperHeroe){
        console.log(datosSuperHeroe);

        //se guarda el resultado para saber si se actualizó algún super héroe
        const resultado = await SuperHero.updateOne({_id: id}, {
            $set: {
                nombreSuperHeroe: datosSuperHeroe.nombreSuperHeroe,
                nombreReal: datosSuperHeroe.nombreReal,
                edad: datosSuperHeroe.edad,
                planetaOrigen: datosSuperHeroe.planetaOrigen,
                debilidad: datosSuperHeroe.debilidad,
                poderes: datosSuperHeroe.poderes,
                aliados: datosSuperHeroe.aliados,
                enemigos: datosSuperHeroe.enemigos,
                creador: datosSuperHeroe.creador,
            }
        });

        if(resultado.matchedCount === 0) {
            console.log("No se encontró un superhéroe con el id enviado");
        } 
        //recupera el heroe actualizado
        return await SuperHero.findById(id);
        
    }

    async eliminarSuperHeroePorID(id){
        return await SuperHero.findByIdAndDelete(id);
    }

    async eliminarSuperHeroePorNombreDeHeroe(nombreSuperHeroe) {
        const superHeroeAEliminar = await SuperHero.findOne({
            nombreSuperHeroe: nombreSuperHeroe,
        });
 
        console.log("Héroe a eliminar", superHeroeAEliminar);
        //de acuerdo a documentación deleteOne elimina el primer registro que coincida con el criterio
        await SuperHero.deleteOne({nombreSuperHeroe: nombreSuperHeroe});

        return superHeroeAEliminar;
    }
}

export default new SuperHeroRepository();
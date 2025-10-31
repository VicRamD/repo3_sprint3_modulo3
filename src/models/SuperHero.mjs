import mongoose from "mongoose";

//Esquema superHero
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, required: true},
    nombreReal: {type: String, required: true},
    edad: {type: Number, required: true},
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    creador: String,
    createdAt: {type: Date, default: Date.now}
});

//Modelo superHero                Nombre        esquema        colección
const superHero = mongoose.model('SuperHero',superheroSchema, 'Grupo-20');
export default superHero;

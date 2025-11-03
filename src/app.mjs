import express from 'express';
import {connectDB} from './config/dbConfig.mjs';
import methodOverride from 'method-override';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

//para renderizar las vistas
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
//Middleware para trabajar con el enctype application/x-www-form-urlencoded por defecto del form
app.use(express.urlencoded({ extended: true }));

// Sobreescribir peticiones con ej: ?_method=DELETE
app.use(methodOverride('_method'));

//Conexión a MongoDB
connectDB();

//Configurarción del motor de vistas

//ruta absoluta del archivo app.mjs
const __filename = fileURLToPath(import.meta.url);
//console.log("filename: ", __filename)
//directorio en que se encuentra el archivo app.mjs
const __dirname = path.dirname(__filename);
//console.log("filename: ", __dirname);

//establece la ruta a carpeta views
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

//configuración de rutas
app.use('/api', superHeroRoutes);
//http://localhost:3000/api/heroes/

//Manejo de errores para rutas no encontradas
app.use((req, res)=>{
    res.status(404).send({
        mensaje: 'Ruta no encontrada'
    })
});

//Iniciar el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
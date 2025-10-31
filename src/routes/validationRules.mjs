import {body} from 'express-validator';

//Validaciones
export const superHeroeValidator = [body('nombreSuperHeroe').notEmpty().isString().trim().isLength({min: 3, max: 60})
    .withMessage('El nombre/alias del superhéroe debe tener entre 3 y 60 carácteres').escape(),
    body('nombreReal').notEmpty().isString().trim().isLength({min: 3, max: 60})
    .withMessage('El nombre real del superhéroe debe tener entre 3 y 60 carácteres').escape(),
    body('edad').notEmpty().isNumeric().trim()
    .custom( value => {
        //console.log('en custom');
        //console.log(typeof value);
        return parseInt(value) >= 0;
    })
    .withMessage('La edad debe ser un número no negativo').escape(),
    body('poderes').exists({checkFalsy: true}).isArray({min: 1}) //verifica que sea un array de por lo menos un elemento
    .withMessage('Debe haber por lo menos un poder').escape(),
    //elementos del array poderes
    body('poderes.*').notEmpty().trim().isString().isLength({min: 3, max: 60})
    .withMessage('El poder debe tener entre 3 y 60 carácteres').escape()
]

export const eliminarSuperHeroeValidator = body('nombreSuperHeroe').notEmpty().isString().trim().isLength({min: 3, max: 60})
    .withMessage('El nombre ingresado debe tener entre 3 y 60 carácteres').escape();
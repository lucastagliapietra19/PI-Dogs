const { Router } = require('express');
const getDogs = require("../controllers/getDogs")
const getDogsById = require("../controllers/getDogsById")
const getDogsByName = require("../controllers/getDogsByName")
const postDogs = require("../controllers/postDogs");
const getTemperaments = require("../controllers/getTemperaments")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get("/dogs", getDogs);
router.get("/dogs/name", getDogsByName);
router.get("/dogs/:idRaza", getDogsById);
router.post("/dogs", postDogs);
router.get("/temperaments", getTemperaments);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

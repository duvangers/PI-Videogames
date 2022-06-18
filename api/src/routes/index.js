const { Router } = require('express');
const games = require('./games');
const routerGenres = require('./genres')
const routerPlatforms = require('./platforms') 
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', games);
router.use('/genres', routerGenres);
router.use('/platforms', routerPlatforms)
module.exports = router;

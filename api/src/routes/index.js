const { Router } = require('express');
const games = require('./games');
const routerGenres = require('./genres')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', games);
router.use('/genres', routerGenres);
module.exports = router;

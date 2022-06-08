const { Router } = require('express');
const { Videogame, Genre} = require('../db');
const {allData, 
    getDbGames, 
    getVideogames} = require('./middleware/middleware')
const axios = require('axios');
const {API_KEY} = process.env;

// https://api.rawg.io/api/genres
const router = Router();
// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get("/", async (req, res)=> {
    try {
      const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  
      const x = genresApi.data.results.map(e=>{
          return {
              name: e.name
          }
      })
        
      x.forEach(e=>{
          Genre.findOrCreate({
              where:{ name: e.name }
          })
      })

      const allGenero = await Genre.findAll();
      res.json(allGenero)
       
    } catch (error) {
      console.log(error);
    }
  });



module.exports = router;
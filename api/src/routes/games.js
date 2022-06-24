const { Router } = require('express');
const { Videogame, Genre, Platforms} = require('../db');
const {allData, 
    getDbGames, 
    getVideogames} = require('./middleware/middleware')
const axios = require('axios');

const {API_KEY} = process.env;


const router = Router();



router.get('/', async(req, res)=>{
    const api = await allData();
    const {name}= req.query;
    try{
        if(name && name !== ""){
            const searchN =   await axios.get(`https://api.rawg.io/api/games?search=${name.toLowerCase()}&key=${API_KEY}`)
            
              const gameName = searchN.data.results.map(e=>{
                  return{
                      id: e.id,
                      name: e.name,
                      background_image: e.background_image,
                      rating: e.rating,
                      released: e.released,
                      platforms: e.platforms && e.platforms.map((e) =>e.platform.name).filter((e)=>e != null).join(', '),
                      genres:  e.genres.map(e => {
                        return {
                            name: e.name
                        }
                    }),
                  }
              })
              if(gameName.length > 0){
                return res.status(200).json(gameName);
              }else{
                res.json(['El juego no esta'])
              }
        }else{
              res.status(200).json(api)
          }
    }catch (err) {
       console.log(err)
    }
   
});
// https://api.rawg.io/api/games/13536?key=4a5741eed7504c6cabbb01d54a3d32ac
router.get('/:id' , async (req, res)=>{
    const { id } = req.params
    
    try {
        if (id.includes("-")) {
            
            // const arrDbInfo = await getDbGames()
            let infoDb = await Videogame.findOne({
                where:{id},
                include: [
                    {
                        model: Genre,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Platforms,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    }
                ]
            });
            let x = infoDb;
            const info = {
                    id: x.id,
                    name: x.name,
                    background_image: x.background_image,
                    description: x.description,
                    released: x.released,
                    createdDb: x.createdDb,
                    rating: x.rating,
                    genres: x.genres.map((e)=>e.name).join(', '),
                    platforms: x.platforms.map((e)=>e.name).join(', ')
            }
            return res.status(200).json(info)
        
    }else {
        
            const getId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            let x = getId.data;

            const apiData = {
                
                    id: x.id,
                    name: x.name,
                    background_image: x.background_image,
                    description: x.description,
                    released: x.released,
                    rating: x.rating,
                    platforms: x.platforms && x.platforms.map((e) =>e.platform.name).filter((e)=>e != null).join(', '),
                    genres: x.genres && x.genres.map((e)=>e.name).filter((e)=>e != null).join(', ')
                };
                return res.status(200).json(apiData);
            }
    } catch (error) {
            res.status(404).json('Id no encontrado')
        }
});
router.post('/', async (req, res)=>{
    const { name, description, released, rating,  background_image, createdDb, genres, platforms} = req.body
    
    
    if (name && description && platforms  ) {
        let newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            background_image,
            
        })
        let genreDb = await Genre.findAll({
            where: {
                name: genres
            }
        })

        let platformDb = await Platforms.findAll({
            where: {
                name: platforms
            }
        })
        await newGame.addGenre(genreDb)
        await newGame.addPlatforms(platformDb)

        return res.status(200).send("Videojuego creado correctamente")

    } else {
        return res.status(404).send("Completar formulario correctamente")
    }
});




module.exports = router;
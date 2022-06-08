const { Router } = require('express');
const { Videogame, Genre} = require('../db');
const {allData, 
    getDbGames, 
    getVideogames} = require('./middleware/middleware')
const axios = require('axios');
const {API_KEY} = process.env;


const router = Router();

// https://api.rawg.io/api/games?key=4a5741eed7504c6cabbb01d54a3d32ac
// https://api.rawg.io/api/games?search=portal&key=4a5741eed7504c6cabbb01d54a3d32ac
// https://api.rawg.io/api/games/12020?key=4a5741eed7504c6cabbb01d54a3d32ac
// https://api.rawg.io/api/games?search=portal&key=4a5741eed7504c6cabbb01d54a3d32ac
// 


router.get('/', async(req, res)=>{
    const api = await allData();
    const {name}= req.query;

    if(name){
      const searchN =   await axios.get(`https://api.rawg.io/api/games?search=${name.toLowerCase()}&key=${API_KEY}&page_size=15`)
      if(searchN){
        const gameName = searchN.data.results.map(e=>{
            return{
                id: e.id,
                name: e.name,
                image: e.background_image,
                rating: e.rating,
                releaseDate: e.released,
                platforms: e.parent_platforms.map(e => {
                    return  e.platform.name
                }),
            }
        })
            res.status(200).json(gameName)
      }else{
         res.status(404).send('El juego no esta =(') 
      }
    }else{
        
        res.status(200).json(api)
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
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            });
            let x = infoDb;
            const info = {
                    id: x.id,
                    name: x.name,
                    image: x.background_image,
                    description: x.description,
                    released: x.released,
                    rating: x.rating,
                    platforms: x.platforms.map(e =>e.platforms).join(', '),
                    genres: x.genres.map((e)=>e.name).join(', ')
            }
            return res.json(info)
        
    }else {
        
            const getId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            let x = getId.data;

            const apiData = {
                
                    id: x.id,
                    name: x.name,
                    image: x.background_image,
                    description: x.description,
                    released: x.released,
                    rating: x.rating,
                    platforms: x.platforms && x.platforms.map(e =>e.platforms).filter((e)=>e != null).join(', '),
                    genres: x.genres && x.genres.map((e)=>e.name).filter((e)=>e != null).join(', ')
                };
                return res.json(apiData);
            }
    } catch (error) {
            res.status(404).json('Id no encontrado')
        }
});



module.exports = router;
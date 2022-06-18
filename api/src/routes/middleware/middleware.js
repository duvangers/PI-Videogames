const axios = require('axios');
const {Videogame, Genre} = require('../../db')
const {API_KEY} = process.env;

// Me Traigo todos los 100 Videogames de la api, los mapeo y los retorno
const getVideogames = async () => { 
    let promises = []
    let allGames = []
    try {
        for (let i = 1; i <= 5; i++) {
            promises.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
                .then((response) => {
                    return response
                }))
        }
        await Promise.all(promises)
            .then((response) => {
                for (let i = 0; i < promises.length; i++) {
                    allGames = allGames.concat(response[i].data.results.map(e => {
                        return {
                            id: e.id,
                            name: e.name,
                            background_image: e.background_image,
                            platforms: e.platforms && e.platforms.map((e) =>e.platform.name).filter((e)=>e != null).join(', '),
                            genres: e.genres.map(e => {
                                return {
                                    name: e.name
                                }
                            }),
                            rating: e.rating
                        }
                    }))
                }
            })
        return allGames
    } catch (error) {
        console.log(error)
    }
};
// Me traigo Todo los Videogames Creados de db, los mapeo y los retorno
const getDbGames = async () => {
    let dbGamesData = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });

    let newDataGame = dbGamesData.map((e) => {
        return {
            id: e.id,
            name: e.name,
            rating: e.rating,
            background_image: e.background_image,
            genres: e.genres.map((e) => e.name),
            description: e.description,
            released: e.released,
            createdDb: e.createdDb,
            platforms: e.platforms,
        };
    });
    return newDataGame;
};
//    Junto al Info de la api y db
const allData = async function () {  
    const apiData = await getVideogames()
    const bdData = await getDbGames()
    const allData = apiData.concat(bdData)
    return allData
};

// Me traigo todos los Generos de la api, los mapeo, los guardo db y los retorno
const getGenres = async function (){
    try {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    
        const x = genresApi.data.results.map(e=>{
            return {
                name: e.name
            }
        })
          
        x.forEach(e=>{                       // Los guardo en db
            Genre.findOrCreate({
                where:{ name: e.name }
            })
        })
        const allGenero = await Genre.findAll();
        return allGenero;
      } catch (error) {
        console.log(error);
      }
 
}

module.exports = {
    allData, 
    getDbGames, 
    getVideogames,
    getGenres
}
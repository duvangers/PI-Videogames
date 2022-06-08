const axios = require('axios');
const {Videogame, Genre} = require('../../db')
const {API_KEY} = process.env;


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
                            genres: e.genres && e.genres.map((e)=>e.name).filter((e)=>e != null).join(', '),
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
            createdVideoGame: e.createdVideoGame,
            platforms: e.platforms,
        };
    });
    return newDataGame;
};

const allData = async function () {  //JUNTA LAS DOS INFO
    const apiData = await getVideogames()
    const bdData = await getDbGames()
    const allData = [...apiData, ...bdData]
    return allData
};


module.exports = {
    allData, 
    getDbGames, 
    getVideogames
}
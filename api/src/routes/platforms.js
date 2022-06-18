const { Router } = require('express');
const {Platforms} = require('../db')
const axios = require('axios');


const router = Router();

router.get("/", async (req, res)=> {

    
        let allPlatforms = []
        let promises = []
    
        try {
            for (let i = 1; i <= 5; i++) {
                promises.push(axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`)
                    .then(response => {
                        return response
                    }))
    
            }
            await Promise.all(promises)
                .then((response) => {
                    for (let i = 0; i < promises.length; i++) {
                        allPlatforms = allPlatforms.concat(response[i].data.results.map(e => {
                            return {
                                platforms: e.platforms.map(e => {
                                    return {
                                        name: e.platform.name
                                    }
                                }),
                            }
                        }))
                    }
                })
                const plat = allPlatforms;
                    const plat2 = plat.map(e => e.platforms).flat();
                    const plat3 = plat2.map(e => e.name);
                    const trim = plat3.map(e => e.trim());
                    const noRepeatedTemp = [...new Set(trim)];
                    const ojb = noRepeatedTemp.map(e=>{
                        return {
                            name:e
                        }
                    });
    
                    ojb.forEach(e=>{                      
                        Platforms.findOrCreate({
                            where:{ name: e.name }
                        })
                    })
                res.json(ojb);
        } catch (error) {
            console.log(error)
        }
   
  });



module.exports = router;
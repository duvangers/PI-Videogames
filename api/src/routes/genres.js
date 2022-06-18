const { Router } = require('express');
const {getGenres} = require('./middleware/middleware')



const router = Router();

router.get("/", async (req, res)=> {
    try {
     const genresDb = await getGenres()
     genresDb
     res.status(200).json(genresDb)
    } catch (error) {
      console.log(error);
    }
  });



module.exports = router;
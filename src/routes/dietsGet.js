const {Router} = require("express")
const { TypeDiet } = require('../db')
const router = Router();
const { diets } = require ("../controllers/diets.js");

//--------------------  /diets ------------------------------------------------------
router.get( "/", async( req, res )=>{
    try{
    diets.forEach( el => {
      TypeDiet.findOrCreate({
        where:{name:el.name}
      })
    })

    const allDiets = await TypeDiet.findAll();

    res.send(allDiets.map(el=>el.name));
    
  }
    catch(error){
      console.log("Sucedio un error en /diets: ",error);
    }
  })

  module.exports = router
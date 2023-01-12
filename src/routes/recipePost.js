const {Router} = require("express")
const router = Router()
const { Recipe, TypeDiet } = require("../db.js");


//--------------------  /post  ------------------------------------------------------
router.post( "/" , async (req, res)=>{
  const {title, summary, healthScore, analyzedInstructions, createdInDb, typeDiet } = req.body;
  
  if(!title || !summary){return res.status(400).send("Deberia ingresar un title y un summary.")}
    
  try{

    let createRecipe = await Recipe.create({title,summary,healthScore,analyzedInstructions,createdInDb})
    let TypeDietDb = await TypeDiet.findAll({
      where:{name:typeDiet}
    })
    await createRecipe.addTypeDiets(TypeDietDb)
    res.send("🍽️ Se creo exitosamente. 🍽️")
  }
  catch(error){console.log("error en post",error)}
})

module.exports = router;
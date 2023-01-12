const { Router } = require('express');
const router = Router();
const { getAllRecipes } = require("../controllers/recipesGet.js")

//------------------------- /RECIPES ------------------------------------------------
router.get("/", async (req, res) => {
  try{
    const {name} = req.query
    let recipesTotal = await getAllRecipes();
    if(name){
        let recipesTitle = await recipesTotal.filter((el)=>el.title.toLowerCase().includes(name.toLowerCase()));
        recipesTitle.length // --> existe recipes
        ?res.status(200).send(recipesTitle)
        :res.status(404).send(`🍽️ No se encontro La receta ${name}. 🍽️`)
    }else{
        res.status(200).send(recipesTotal);
    }
  }catch(error){error}

});
//--------------------  /RECIPES{idReceta}:  ------------------------------------------------------
router.get("/:id", async (req,res) =>{
    try{
        const id = req.params.id;
        const recipesTotal = await getAllRecipes();
        if(id){
            let recipeId = await recipesTotal.filter((el)=>el.id == id)
            recipeId.length
            ?res.status(200).json(recipeId)
            :res.status(404).send("🍽️ I did not find that recipe. 🍽️")
        }
    }catch(error){
        console.log("Sucedio un error en /recipes:id ", error);
    }
})

module.exports = router;
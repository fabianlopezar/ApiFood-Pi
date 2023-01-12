const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
//const API_KEY = "91eea5f84dac4e41b0697d6671ad384c";
//const API_KEY = "d0a7c1bfeae2404c9df2b6a16cf26fd7";
//const API_KEY = "477281183eac4b20995102b9b11b6249";
//const API_KEY = "4ba8365989ec41708ab41353cea84c0a"
//const API_KEY = "142d642dc90a45d3ab297b880482cd4a"
const recipes = require("./recipes.js")
const recipePost = require("./recipePost")
const dietsGet = require("./dietsGet.js")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes",recipes)
router.use("/recipe",recipePost)
router.use("/diets",dietsGet)

module.exports = router;
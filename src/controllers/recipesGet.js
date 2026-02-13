require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, TypeDiet } = require("../db.js");

//------------------- FUNCION OBTENER LA DATA API ---------------------------------------------------------------------
// Si API_KEY no está disponible o Spoonacular falla, retorna [] para no romper la app
const getApiInfo = async () => {
  if (!API_KEY || API_KEY.trim() === '') {
    console.log("API_KEY no disponible. Usando solo recetas de la base de datos.");
    return [];
  }
  try {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`, {
      timeout: 10000, // 10 segundos timeout
    });
    const apiInfo = apiUrl.data.results.map((el) => {
      return {
        id: el.id,
        title: el.title,
        img: el.image,
        TypeDiet: el.diets.map((index) => { return { name: index }; }),
        dishTypes: (el.dishTypes || []).map((index) => { return { name: index }; }),
        summary: el.summary,
        healthScore: el.healthScore,
        analyzedInstructions: el.analyzedInstructions,
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("Spoonacular API no disponible (API_KEY inválida o límite alcanzado). Usando solo recetas de la base de datos.", error.message);
    return [];
  }
};
//------------------- FUNCION OBTENER LA DATA BASE ---------------------------------------------------------------------
const getDbInfo = async () => {
  try {
    return await Recipe.findAll({
      include: {
        model: TypeDiet,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
  } catch (error) {
    console.log("Sucedio un error en getDbInfo:", error.message);
    return [];
  }
};

//------------------ FUNCION UNIR INFORMACION ----------------------------------------------------------------------
const getAllRecipes = async () => {
  try {
    const [apiInfo, dbInfo] = await Promise.all([getApiInfo(), getDbInfo()]);
    const allInfo = (apiInfo || []).concat(dbInfo || []);
    return allInfo;
  } catch (error) {
    console.log("Sucedio un error en getAllRecipes:", error.message);
    return [];
  }
};

  module.exports={
    getAllRecipes
}
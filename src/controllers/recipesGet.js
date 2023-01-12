require('dotenv').config();
const {API_KEY} = process.env;
const axios = require("axios");
const { Recipe, TypeDiet } = require("../db.js");
//const API_KEY="d0a7c1bfeae2404c9df2b6a16cf26fd7"

//------------------- FUNCION OBTENER LA DATA API ---------------------------------------------------------------------
const getApiInfo = async () => {
    try{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.results.map((el) => {
      return {
        id: el.id,
        title: el.title,
        img: el.image,
        TypeDiet: el.diets.map((index) => {return { name: index };}), //me retorna un array con los nombre
        dishTypes: el.dishTypes.map((index) => {return { name: index };}), //me retorna un array con los tipos de platos
        summary: el.summary,
        healthScore: el.healthScore,
        analyzedInstructions: el.analyzedInstructions, // me retorna el paso a paso
      };
    });
    return apiInfo;
    }catch(error){
      console.log("Sucedio un error en getApiInfo",error)
    }
  };
//------------------- FUNCION OBTENER LA DATA BASE ---------------------------------------------------------------------
  const getDbInfo = async () => {
    try{
      return await Recipe.findAll({
      include: {
        model: TypeDiet,
        attributes: ["name"], //traigo el nombre de los tipos de recetas
        through: {
          attributes: [], //tomo solo lo que me queda en el arreglo attributes
        },
      },
    });}catch(error){
      console.log("Sucedio un error en getDbInfo: ",error)
    }
  };
  //------------------ FUNCION UNIR INFORMACION ----------------------------------------------------------------------
  const getAllRecipes = async () => {
  try{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
    }catch(error){
        console.log("Sucedio un error en getAllRecipes: ",error)
    }
  };

  module.exports={
    getAllRecipes
}
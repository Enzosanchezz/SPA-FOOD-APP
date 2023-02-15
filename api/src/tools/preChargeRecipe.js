const recipes =  require("./recipes.json");
const {Recipe} = require("../db");

const getRecipes = async () => {
  try {
      recipes.forEach((el) => {
        Recipe.findOrCreate({
          where: { id: el.id },
          defaults: {
            id : el.id,
            name : el.name,
            summary : el.summary,
            healthScore : el.healthScore,
            // diets: el.diets,
            analyzedInstructions : el.analyzedInstructions,
            image: el.image,
            readyInMinutes : el.readyInMinutes
          },
        });
      });
      return getRecipes;
    }
    catch (error) {
    console.log(error)
  } 
  }
module.exports = {
    getRecipes,
}
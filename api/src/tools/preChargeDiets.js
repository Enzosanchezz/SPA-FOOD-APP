const diets =  require("./diets.json");
const {Diets} = require("../db");

const getDiets = async () => {
 
  try {
      diets.forEach((p) => {
        Diets.findOrCreate({
          where: { id: p.id },
          defaults: {
            id: p.id, 
            name: p.name,
          },
        });
      });
      return getDiets;
    }
    catch (error) {
  } 
    res.send(error)
  }

module.exports = {
    getDiets,
}
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ("axios");
const {Recipe, Diets} = require ("../db")
const {APIKEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const getApi = async () => {
//     try {
//         const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);
//         const apiInfo = await apiUrl.data.results.map((el) => {
    
//             return{ 
//                 id : el.id,
//                 name : el.title,
//                 summary : el.summary,
//                 healthScore : el.healthScore,
//                 analyzedInstructions : el.analyzedInstructions[0]?.steps.map(s => `${s.number} : ${s.step}`) ,
//                 diets: el.diets.map(e => e ),
//                 image: el.image,
//                 readyInMinutes : el.readyInMinutes
//             } 
//             });
//             return apiInfo;
//     } catch (error) {
//         console.log(error)
//     }
// }

// const getDb = async () => {
//     try {
//         return await Recipe.findAll({
//             include:{
//                 model: Diets,
//                 attributes : ['name'],
//                 through :{
//                     attributes : [],
//                 }
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }
    
// }

// const getAllRecipes = async () => {
//     const apiInfo = await getApi()
//     const dbInfo = await getDb();
//     const allInfo = apiInfo.concat(dbInfo);
//     return allInfo;

// } 

router.get('/recipes', async(req,res,next)=>{
    try {
        const { name } = (req.query)
    let totalRecipes = await Recipe.findAll()
    if(name){
        let nameRecipe = await totalRecipes.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
        nameRecipe.length? res.status(200).send(nameRecipe) : res.status(400).send('Ups! No se encontro la receta, vuelve a intentar 😊')
    } else{
        res.status(200).send(totalRecipes) 
    }
    } catch (error) {
        next(error)
    }
}) 

router.get('/diets', async(req, res)=>{
    const allDietas = await Diets.findAll();
    res.send(allDietas)
})

router.post('/recipes', async(req, res) =>{
    const {
        id,
        name, 
        summary,
        healthScore,
        analyzedInstructions,
        diets,
        image,
        readyInMinutes
        } = req.body
    let dietCreate = await Recipe.create ({id, name, summary, healthScore, analyzedInstructions,readyInMinutes, image})
    let dietDb = await Diets.findAll({
        where: {name : diets}
    })
    dietCreate.addDiets(dietDb)

     res.send(`Receta ${req.body.name} creada con exito 👍`)
})  

router.get('/recipes/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        const recipeAll = await Recipe.findAll();
        if (id){
            const recipesId = recipeAll.filter((r) => r.id == id)
            recipesId.length? res.status(200).send(recipesId) : res.status(404).send('Ups! receta no encontrada 👎')
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;

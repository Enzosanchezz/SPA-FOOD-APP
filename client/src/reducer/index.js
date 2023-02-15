const initalState ={
    recipes : [],
    allRecipes: [],
    diet : [],
    detail :[],
}


function rootReducer(state = initalState, action){

switch (action.type) {

    case 'GET_RECIPES':
        return{ ...state, recipes: action.payload, allRecipes:action.payload, detail : [] }
    
    case 'GET_NAME_RECIPE':{return{...state, recipes: action.payload}}
    
    case 'GET_DIET':return{...state, diet : action.payload}

    case 'GET_DETAIL': return{...state, detail : action.payload}

    case 'POST_RECIPE':return[...state]

    case 'FILTER_TYPE_DIET': 
        const recipes = state.recipes;
        const arrayDb = [];
        const filterDietDb = recipes.filter((r) => r.diets.includes(action.payload)).push("si soy")
        arrayDb.push(filterDietDb)
        const filterDietApi = recipes.filter((r) => r.diets.includes(action.payload))
        const filterAllDiets = arrayDb.includes("si soy")? arrayDb : filterDietApi
        return{...state, recipes: filterAllDiets}

    case 'SCORE_ORDER':
        let arreglo = action.payload === 'scoremin'? 
        state.recipes.sort(function(a,b){
            if(a.healthScore > b.healthScore){
                return 1
            }else if(a.healthScore < b.healthScore){
                return -1
            } return 0
        }): state.recipes.sort(function(a,b){
            return b.healthScore - a.healthScore
        })
        return{
            ...state,
            recipes: arreglo
        }

    case 'FILTER_CREATED':{
        const createdFilter = action.payload === 'created' ? state.allRecipes.filter(e => e.createdInDb) : state.allRecipes.filter(e => !e.createdInDb)
        return{...state, recipes : action.payload === 'all' ? state.allRecipes : createdFilter}}
   
    case 'FILTER_ORDER':
        let array = action.payload === 'asc'?
        state.recipes.sort(function(a , b) {
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            } 
            return 0
        
        }): state.recipes.sort(function(a , b){
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return 1
            } 
            return 0
        })
        return {
            ...state, 
            recipes : array
        }

        default: return state
}
}


export default rootReducer
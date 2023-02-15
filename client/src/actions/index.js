import axios from "axios";
const {REACT_APP_SERVER} = process.env;

export function getRecipes(){
    return async function(dispatch){
        let result = await axios.get(`${REACT_APP_SERVER}/recipes`)
        return dispatch({type: 'GET_RECIPES', payload: result.data})
    }
}

export function getNameRecipe(name){
        return async function(dispatch){
            try {
                let result = await axios.get(`${REACT_APP_SERVER}/recipes?name=${name}`)
            return dispatch({type: 'GET_NAME_RECIPE', payload: result.data})
            } catch (error) {
                alert("No existe esa receta")
            }
    }
}

export function filterOrder(payload){
    return {
        type: 'FILTER_ORDER',
        payload: payload
    }
}

export function scoreOrder(payload){
    return{
        type: 'SCORE_ORDER',
        payload
    }
}

export function filterTypeDiet(payload){
    return{
            type: 'FILTER_TYPE_DIET',
            payload : payload
        }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload,
    }
}

export function getDetail(id){
    return async function(dispatch){
        let json = await axios.get(`${REACT_APP_SERVER}/recipes/${id}`)
        return dispatch({type : 'GET_DETAIL', payload :json.data})
    }
}

export function getDiet(){
    return async function(dispatch){
        let json = await axios.get(`${REACT_APP_SERVER}/diets`)
        return dispatch({
            type: 'GET_DIET',
            payload : json.data
        })
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        let json = await axios.post(`${REACT_APP_SERVER}/recipes`, payload)
        return json
    }
}
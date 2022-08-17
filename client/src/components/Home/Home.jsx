import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {getRecipes, filterCreated, scoreOrder, filterTypeDiet, getDiet, filterOrder} from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import style from "./style.module.css";


export default function Home(){
    const dispatch = useDispatch()
    const [ setOrder] = useState('');
    const allRecipes = useSelector((state) => state.recipes)
    const allDiet = useSelector((state)=> state.diet)
    //paginado
    const[page, setPage] = useState(1);
    const [recipePage, setRecipePage] = useState(9);
    const  lastRecipe = page * recipePage;
    const firtsRecipe = lastRecipe - recipePage;
    const currentRecipe = allRecipes.slice(firtsRecipe, lastRecipe);

    const paginado = (n)=>{
        setPage(n)
    }

    useEffect(() =>{
        dispatch(getRecipes());
        dispatch(getDiet());
    },[dispatch]);


    function handleTypeDiet(e){
        e.preventDefault();
        dispatch(filterTypeDiet(e.target.value))
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    }; 

    function handleOrder(e){
        e.preventDefault();
        dispatch(filterOrder(e.target.value))
        setPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }

    function handleCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    function handleScore(e){
        e.preventDefault()
        dispatch(scoreOrder(e.target.value))
        setPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }
    
    return(
        <div>
                <span className={style.span} >
                <div className={style.divHome} >
                    <h2>Mi cocina 👨🏻‍🍳</h2>
                </div>
                    <button className={style.botonVolverCargar}  onClick={e => {handleClick(e)}}>Volver a Cargar🔁</button>
                    <Link to='/recipes' className={style.creaReceta} >
                        <button className={style.boton} >Crear una Receta 🥣</button>
                    </Link>
                    <SearchBar />
                </span>

            <div>
                <select value="ordenalfabetico" className={style.select} onChange={e => {handleOrder(e)}} >
                    <option value= "ordenalfabetico">Alphabetical Order</option>
                    <option value= "asc">Ascendente A-Z</option>
                    <option value= "desc">Descendente Z-A</option>
                </select>
                <select  value="todas" className={style.select} onChange={e => {handleTypeDiet(e)}}>
                <option value= "todas">Diets</option>
                    {
                    allDiet?.map((d, i)=> (
                        <option key={i} value={d.name}>{d.name}</option>
                    ))}
                   
                </select>
                <select value="score" className={style.select} onChange={e => {handleScore(e)}}>
                    <option value= "score">Score Order</option>
                    <option value= "scoremin">healt score minimo</option>
                    <option value= "scoremax">healt score maximo</option>
                </select>
                <select value="all" className={style.select} onChange={e => {handleCreated(e)}} >
                    <option value= "all">All</option>
                    <option value= "created">Creados</option>
                    <option value= "api">Existentes</option>
                </select>

        <Paginado
            recipePage={recipePage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            />
            
        {
          currentRecipe && currentRecipe.map((r, i) => {
            // console.log('currentRecipe :>> ', currentRecipe);
            return(
                <div key={i} >
                    <Link to={"/home/" + r.id} className={style.link} >
                    <Card  className={style.cards}
                    // key = {i}
                    name = {r.name}
                    readyInMinutes = {r.readyInMinutes}
                    healthScore = {r.healthScore}
                    image = {r.image}
                    diets = {r.createdInDb? r.diets.map((d) => d.name + ", ") : r.diets.map(e => e + ", ")}
                    />
                    </Link>
                </div>
            )
})
//  <img src={gif} className={style.gif} alt="Loading"/>
        }
            </div>
        </div>
    )

}
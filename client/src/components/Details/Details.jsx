import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { getDetail } from "../../actions";
import style from "./style.module.css";
import gif from "./gif/YCZH.gif";

export default function Details(props){
console.log (props)

  
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myRecipe = useSelector((state) => state.detail)

    return(
        <div>
            <span className={style.span} >
                <Link to="/home" className={style.link} >
                    <h2>Mi cocina 👨🏻‍🍳</h2>
                    </Link>
            </span>
            {
                myRecipe.length > 0 ?
                    <div className={style.div}>
    
                        <h1>{myRecipe[0].name}</h1>
                        <div className={style.details}>
                        <h5>Tiempo de Preparacion 🕒: {myRecipe[0].readyInMinutes} min.</h5>
                        <h5>Dietas:  {myRecipe[0].createdInDb? myRecipe[0].diets.map((d) => d.name + ', ') :  myRecipe[0].diets.map(e => e + ", ") }</h5>
                        <h5>Nivel de Saludable: {myRecipe[0].healthScore}</h5>
                        <img src={myRecipe[0].image} alt={myRecipe[0].name} />

                        </div>
                        <h5>Resumen del plato: {myRecipe[0].summary}</h5>
                        <h5>Paso a Paso: {myRecipe[0].analyzedInstructions}</h5>
             
                    </div> : <img src={gif} className={style.gif} alt="Loading"/>

            }   
        </div> 
    )
}
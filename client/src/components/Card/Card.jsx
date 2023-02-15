import React from "react";
import style from "./style.module.css";


export default function Card({name, image, diets, healthScore, readyInMinutes}){
    return(
        <div className={style.card}>
            <h2>{name}</h2>
            <h5>Tiempo de preparacion 🕒: {readyInMinutes} min.</h5>
            <h4 >Dietas: {diets}</h4>
            <h4>Nivel Saludable: {healthScore}</h4>
            {image? <img src={image} alt={name} />
            : <img src="https://static.vecteezy.com/system/resources/previews/004/528/348/non_2x/empty-plate-with-spoon-fork-on-food-table-wooden-background-empty-dinner-plate-dish-top-view-photo.JPG" alt={name} /> }
        </div>
    )
}
import React from "react";
import {Link} from "react-router-dom";
import style from "./style.module.css";

export default function LandingPage(){
    return(
        <div>
            <span className={style.landing}>
                <h1>Bienvendidos! 😊</h1>
                <h3>Hola mi nombre es Enzo 👋🏻, antes de clickear el enlace "Comenzar" déjame contarte un poco de lo que se trata este proyecto.</h3>
                <h4>Es una app sobre recetas de comidas traidas desde una api externa y almacenadas en una base de datos.
                    El objetivo era armar el back-end y el front-end, conectarlos y darle un poco de estilo con css.
                    Ahora que ya sabes mas o menos de que se trata, cliclea 👉🏻 <Link className={style.link} to="/home">
                    Comenzar
                </Link> y disfruta la app!! 
                </h4>
                
            </span>
            
        </div>
    )
}

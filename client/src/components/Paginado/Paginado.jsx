import React from "react";
import style from "./style.module.css";



export default function Paginado ({recipePage, allRecipes, paginado}){
    let numeroPagina = [];

    for (let i = 1; i <= Math.ceil( allRecipes/recipePage); i++) {
        numeroPagina.push(i)
    }

    return(
        <nav >
            
         <ul>
                {
                    numeroPagina && 
                    numeroPagina.map(n =>(
                        <button key={n} className={style.btn}  >
                            <a onClick={() => paginado(n)}  >{n}</a>
                        </button>
                    ))
                }
            </ul> 


        </nav>
    )




}


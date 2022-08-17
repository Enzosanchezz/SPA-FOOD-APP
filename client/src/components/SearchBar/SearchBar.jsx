import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../../actions";
import style from "./style.module.css";


export default function SearchBar(){
    const dispatch = useDispatch();
    const[name, setName] = useState("");

    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipe(name))
        setName("")
    }

    return(
        <div className={style.searchBar} >
            <input value={name} className={style.input} type="text" placeholder="Busca tu receta..." onChange={e => handleInput(e)}/>
            <button className={style.button} type="submit" onClick={e => {handleSubmit(e)}} >Buscar</button>
        </div>
    )
}
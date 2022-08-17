import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDiet, postRecipe } from "../../actions";
import style from "./style.module.css";

export default function CreateRecipe(){

    const dispatch = useDispatch();
    const history = useHistory();
    const dieta = useSelector((state) => state.diet);
    const [errors, setErrors] = useState({});
    // console.log('DIETA', dieta)
    const [input, setInput] = useState({
        name:"",
        summary:"",
        healthScore:"",
        image:"",
        analyzedInstructions:"",
        diets:[],
        readyInMinutes:"",
    })
    function handleDelete(i){
        setInput({
            ...input,
            diets : input.diets.filter((e) => e !== i)
        })
    }
    function validate(input){
        let errors = {};
        if(!input.name){
            errors.name = "Escribe un nombre por favor"
        }else if (!input.summary){
            errors.summary = "Escribe un resumen por favor"
        }
        return errors;
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input, 
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input, diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length){
            alert("Completa los campos obligatorios para poder crear una Receta")
        }else{dispatch(postRecipe(input))
            alert("Receta creada!")
            setInput({
            name:"",
            summary:"",
            healthScore:"",
            image:"",
            analyzedInstructions:"",
            diets: [],
            readyInMinutes:"",
            })
            history.push('/home')} 
    }


    useEffect(()=>{
        dispatch(getDiet())
    },[])
    useEffect(() => {
        setErrors(
          validate({
            ...input,
          })
        );
      }, [input, dispatch]);
    
    
    return(
        <div>
            <span className={style.divHome} >

            <Link to="/home" className={style.link}  ><button className={style.boton} >Volver a Home</button></Link>
            <h1>Crea tu receta!👇🏻</h1>
            <h2>Mi cocina 👨🏻‍🍳</h2>
            </span>
            <form onSubmit={e => handleSubmit(e)} className={style.form} >
                <div>
                    <label>Nombre*:</label>
                    <input  className={style.input} type="text" value={input.name} name="name" onChange={e =>  handleChange(e)}/>
                    {errors.name &&(<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Nivel de saludable:</label>
                    <input className={style.input} type="number" value={input.healthScore} name="healthScore" onChange={e =>  handleChange(e)}/>
                </div>
                <div>
                    <label>Imagen: </label>
                    <input className={style.input} type="text" value={input.image} name="image" onChange={e =>  handleChange(e)}/>
                </div>
                <div>
                <label>Paso a Paso: </label>
                    <input className={style.input} type="text" value={input.analyzedInstructions} name="analyzedInstructions" onChange={e =>  handleChange(e)}/>
                </div>
                <div>
                    <label>Resumen del plato*:</label>
                    <input className={style.input} type="text" value={input.summary} name="summary" onChange={e =>  handleChange(e)}/>
                    {errors.summary &&(<p>{errors.summary}</p>)}
                </div>
                <div>
                <label>Tiempo de Preparacion:</label>
                    <input className={style.input} type="number" value={input.readyInMinutes} name="readyInMinutes" onChange={e =>  handleChange(e)}/>
                </div>

                <select onChange={e => handleSelect(e)}>
                    {
                    dieta.map((d)=> (
                        <option key={d.id + d.name} value={d.name} >{d.name}</option>
                    ))}
                </select>
                <div >
                <ul>
                    <li className={style.li} >{input.diets.map(e => e + ", ")}</li>
                </ul>
                </div>
                <button className={style.button} type="submit">Crear tu receta</button>
            </form>
            {
                input.diets?.map((e,i) =>
                    <div key={i}>
                        <p>{e}</p>
                        <button onClick={() => {handleDelete(e)}} >❌</button>
                    </div>
                    )
            }
        </div>
    )





}
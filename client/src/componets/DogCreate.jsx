import React from "react";
import { postDogInfo, getTemperaments } from '../actions/index';
import {useDispatch, useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import { Link, useHistory  } from "react-router-dom";

function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = 'El nombre es necesario'
    }else if (!input.height){
        errors.height = 'La altura es necesaria'
    }else if (!input.weight){
        errors.weight = 'El peso es necesario'
    }else if (!input.life_span){
        errors.life_span = 'La esperanza de vida es necesaria'
    }
    else if (!input.image){
        errors.image = 'La imagen es necesaria'
    }
    else if(input.temperament.length<1){
        errors.temperament='Debes seleccionar al menos un temperamento'
    }

    return errors
}

export default function DogCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state)=>state.temperaments)
    const [input, setInput]= useState({
        name:"", 
        height:"", 
        weight:"", 
        life_span:"",
        image:"", 
        temperament:[]
    })
    const [errors, setErrors]= useState({})

    useEffect(()=>{
        dispatch(getTemperaments())
    }, []);

    function hadleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function hadleSelect(e){
        setInput({
            ...input,
            temperament:[...input.temperament,e.target.value]
        })
    }

    function handleSubmmit(e){
        e.preventDefault();
        dispatch(postDogInfo(input))
        alert('Peludo creado!!')
        setInput({
            name:"", 
            height:"", 
            weight:"", 
            life_span:"",
            image:"", 
            temperament:[]
        })
        history.push('/home')
    }
    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }


    return(
        <div>
            <Link to='/home'><button>Back Home</button></Link>
        <div>
            <h1>Crea un nuevo peludo</h1>
            <form onSubmit={(e)=>handleSubmmit(e)}>
                <div>
                <label>Nombre de Raza</label>
                <input
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={(e)=> hadleChange(e)}
                />
                {
                    errors.name && (
                    <p>{errors.name}</p>
                    )
                }
                </div>
                <div>
                <label>Rango de Altura</label>
                <input
                    type='text'
                    value={input.height}
                    name='height'
                    onChange={hadleChange}
                />
               {
                    errors.height && (
                    <p>{errors.height}</p>
                    )
                }
                </div>
                <div>
                <label>Rango de peso</label>
                <input
                    type='text'
                    value={input.weight}
                    name='weight'
                    onChange={hadleChange}
                />
                {
                    errors.weight && (
                    <p>{errors.weight}</p>
                    )
                }
                </div>
                <div>
                <label>Esperanza de vida</label>
                <input
                    type='text'
                    value={input.life_span}
                    name='life_span'
                    onChange={hadleChange}
                />
                {
                    errors.life_span && (
                    <p>{errors.life_span}</p>
                    )
                }
                </div>
                <div>
                <label>Imagen</label>
                <input
                    type='text'
                    value={input.image}
                    name='image'
                    onChange={hadleChange}
                /> 
                {
                    errors.image && (
                    <p>{errors.image}</p>
                    )
                }
                </div>
                <select onChange={(e)=>hadleSelect(e)}>
                    {
                        temperaments.map((temp)=>(
                        <option value={temp.name}>{temp.name}</option>
                        ))
                    }
                </select>
               {
                    errors.temperament && (
                    <p>{errors.temperament}</p>
                    )
                }
                
                <button type='submit'>Crear nuevo perro!</button>
            </form>
            {
                input.temperament.map(el=>
                    <div>
                        <p>{el}</p>
                        <button onClick={()=>handleDelete(el)}>X</button>
                    </div>
                        )
            }
        </div>
        </div>
    )


}
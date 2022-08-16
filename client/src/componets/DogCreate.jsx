import React from "react";
import { postDogInfo, getTemperaments } from '../actions/index';
import {useDispatch, useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import { Link, useHistory  } from "react-router-dom";

function validate(input){
    let errors = {}
    if(!input.name){
        input.name = 'El nombre es necesario'
    }else if (!input.height){
        input.height = 'La altura es necesaria'
    }else if (!input.weight){
        input.weight = 'El peso es necesario'
    }else if (!input.life_span){
        input.life_span = 'La esperanza de vida es necesaria'
    }
    else if (!input.life_span){
        input.life_span = 'La esperanza de vida es necesaria'
    }
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

    useEffect(()=>{
        dispatch(getTemperaments())
    }, []);

    function hadleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
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


    return(
        <div>
            <Link to='/home'><button>Back Home</button></Link>
        <div>
            <h1>Crea un nuevo peludo</h1>
            <form onSubmit={(e)=>handleSubmmit(e)}>
                <div>
                <label>Name</label>
                <input
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={hadleChange}
                />
                </div>
                <div>
                <label>Height</label>
                <input
                    type='text'
                    value={input.height}
                    name='height'
                    onChange={hadleChange}
                />
                </div>
                <div>
                <label>Weight</label>
                <input
                    type='text'
                    value={input.weight}
                    name='weight'
                    onChange={hadleChange}
                />
                </div>
                <div>
                <label>Life span</label>
                <input
                    type='text'
                    value={input.life_span}
                    name='life_span'
                    onChange={hadleChange}
                />
                </div>
                <div>
                <label>Image</label>
                <input
                    type='text'
                    value={input.image}
                    name='image'
                    onChange={hadleChange}
                />
                </div>
                <select onChange={(e)=>hadleSelect(e)}>
                    {
                        temperaments.map((temp)=>(
                        <option value={temp.name}>{temp.name}</option>
                        ))
                    }
                </select>
                <ul><li>{input.temperament.map(el => el + " , ")}</li></ul>
                <button type='submit'>Crear!</button>
            </form>
        </div>
        </div>
    )


}
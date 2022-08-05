import React from "react";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getDogs from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card"; 

export default function Home (){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs) 

    useEffect (()=>{
        dispatch(getDogs())
    }, [dispatch])

    function handelClick(e){
        e.preventDefault();
        dispatch(getDogs())
    }
    return (
        <div>
            <Link to='/Dog'>Crear nueva raza</Link>
            <h1>PELUDOS</h1>
            <button onClick={e=> {handelClick(e)}}>Recargar todas las razas</button>
            <div>
                <select>
                    <option value={'Asc'}>Ascendente</option>
                    <option value= {'Desc'}>Descendente</option>
                </select>
                <select>
                    <option value={'OrdA'}>Orden Alfabetico</option>
                    <option value= {'Pse'}>Peso</option>
                </select>
                <select>
                    <option value={'Rexi'}>Raza Existentes</option>
                    <option value={'Rcre'}>Raza Creadas</option>
                </select>
            </div>
            <div>
                {
                    allDogs && allDogs.map(el => {
                        return(
                            <Card image={el.image} name={el.name} temperament={el.temperament} weight={el.weight}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

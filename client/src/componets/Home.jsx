import React from "react";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDogs,filterDb} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card"; 
import { Fragment } from "react";
import Paginado from "./Paginado";

export default function Home (){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs) 
    const [currentPage, setCurrentPage]= useState(1)
    const [dogsForPage,setDogsForPage]= useState(8)
    const countOfLastDog = currentPage * dogsForPage
    const countOfFirstDog= countOfLastDog - dogsForPage
    const currentDogs = allDogs.slice(countOfFirstDog,countOfLastDog)
    
    const paginado = (pageNum)=>{
        setCurrentPage(pageNum)
    }

    useEffect (()=>{
        dispatch(getDogs())
    }, [dispatch])

    function handelClick(e){
        e.preventDefault();
        dispatch(getDogs())
    }

    function handelFilterDb(e){
        dispatch(filterDb(e.target.value))
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
                <select onChange={e => handelFilterDb(e)}>
                    <option value={'api'}>Raza Existentes</option>
                    <option value={'created'}>Raza Creadas</option>
                    <option value={'All'}>Todos</option>
                </select>
                <Paginado
                dogsForPage ={dogsForPage}
                allDogs = {allDogs.length}
                paginado = {paginado}
                />
            <div>
            {currentDogs?.map((el) => {
                        return(
                            <Fragment key={el.id}>
                                <Link to={'/home/' + el.id}>
                                <Card image={el.image} name={el.name} temperament={el.temperament} weight={el.weight}/> 
                                </Link>
                            </Fragment>
                        )
                    })}
            </div>
            </div>
        </div>
    )
}

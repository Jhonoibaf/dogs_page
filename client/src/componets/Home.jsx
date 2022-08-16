import React from "react";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getDogs,filterDb,orderByName, orderByWeight} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card"; 
import { Fragment } from "react";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home (){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs) 
    const [order, serOrder] = useState('')
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

    function handelOrderName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value)) 
        setCurrentPage(1) 
        serOrder(`Ordenado ${e.target.value}`) 
    }

    function handelOrderWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value)) 
        setCurrentPage(1) 
        serOrder(`Ordenado ${e.target.value}`) 
    }

    return (
        <div>
            <Link to='/newdog'>Crear nueva raza</Link>
            <h1>PELUDOS</h1>
            <button onClick={e=> {handelClick(e)}}>Recargar todas las razas</button>
            <div>
                <select onClick={e=> {handelOrderWeight(e)}}>Weight
                    <option value={'Asc'}>Ascendente</option>
                    <option value= {'Desc'}>Descendente</option>
                </select>
                <select onChange={e => handelOrderName(e)}>Alphabetical
                    <option value={'OrdA'}>A-Z</option>
                    <option value= {'Pse'}>Z-A</option>
                </select>
                <select onChange={e => handelFilterDb(e)}>
                    <option value={'All'}>All</option>
                    <option value={'api'}>Existing</option>
                    <option value={'created'}>Created</option>
                </select>
                <SearchBar/>
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

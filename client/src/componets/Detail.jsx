import React, {useState, useEffect} from 'react';
import { Link , useParams} from "react-router-dom";
import {detailDog} from "../actions";
import { useDispatch} from 'react-redux';
import axios from 'axios';

export default function Detail(props){

    const [dog, setDog] = useState(null)

    const {id}= useParams() 
    function getDetail(){
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then((res)=>{
                setDog(res.data)
            })
            .catch()
    }

    useEffect(() => {
        getDetail()
    }, [])
    
    return dog ? (
        <div>
            <div>
                <h1>{dog.name}</h1>
                <img src={dog.image} alt='imgage not found' width='200px' height='250px'/>
                <h3>Peso: {dog.weight}</h3>
                <h3>Altura: {dog.height}</h3>
                <h3>Esperanza de vida: {dog.life_span}</h3>
                <h4>temperamento:{dog.temperament}</h4>
            </div>
        <Link to='/home'>
            <button>Home</button>
        </Link>
        </div>
    ) : <div> <span>Cargando ...</span></div>

}


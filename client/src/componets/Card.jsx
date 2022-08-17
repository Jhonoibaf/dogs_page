import React from "react";
import "./Card.css"


export default function Card ( {name,image, temperament, weight}){
    return <div className='card'>
        <h3>{name}</h3>
        <img src={image} alt='imgage not found' width='200px' height='250px'/>
        <h4>Weight: {weight}</h4>
        <h4>Temperament: {temperament}</h4>
    </div>
}
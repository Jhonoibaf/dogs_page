import React from "react";

export default function Card ( {name,image, temperament, weight}){
    return <div>
        <h3>{name}</h3>
        <img src={image} alt='imgage not found' width='200px' height='250px'/>
        <h4>Imperial weight: {weight.imperial}</h4>
        <h4>Metric weight: {weight.metric}</h4>
        <h4>Temperament: {temperament}</h4>
    </div>
}
import React from "react";

export default function Card ( {image, name, temperament, weight}){
    <div>
        <h3>{name}</h3>
        <img src= {image} alt= "img not fount" width="200px" height = "250px" />
        <h4>{temperament}</h4>
        <h4>{weight}</h4>
    </div>
}
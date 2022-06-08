import React from "react";

export default function Card ({name, genres, background_image}){
    return (
        <div>
            <h3>Name: {name}</h3>
            <h3>Genero: {genres}</h3>
            <img src ={background_image} alt='imagen' width='300px' height='300px'/>
        </div>
    )
}
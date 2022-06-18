import React from "react";


export default function Card ({name, genres, background_image, rating}){
    return (
        <div>
            <h3>{name}</h3>
            <p>{genres.map(e => e.name + " / ")}</p>
            <img src ={background_image} alt='imagen' width='200px' height='300px'/>
            <p>{rating}</p>
        </div>
    )
}
import React from "react";
import style from "./Card.module.css"

export default function Card ({name, genres, background_image, rating}){
    let s ={
    // color: 'black',
    display: "inline-flex",
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '350px',
    height:'250px',
    minHeight: '140px',
    borderRadius: '0.6rem',
    margin: '8px',
    // backgroundColor: '#e9eef3ef',
    boxShadow: '0.1rem 0.1rem 0.1rem #737a83ef',
    backgroundImage: 'url('+background_image +')',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }    
    
    return (
        <div className={style.card} style={s}>
            <h3 className={style.title}>{name}</h3>
            <p>{genres.map(e => e.name + " / ")}</p>
            {/* <img src ={background_image} alt='imagen' width='200px' height='300px'
            className ={style.img}/> */}
            <p>{rating}</p>
        </div>
    )
}
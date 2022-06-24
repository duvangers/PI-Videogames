import React from "react";
import style from "./Card.module.css"

export default function Card ({name, genres, background_image, rating }){
    
    let s ={
    color: 'white',
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
            
            <div className={style.space}>
                <div className={style.title}>{name}</div>
                <span className={style.rating}>{rating}</span>
                
          

            </div>
            
            <h4 className={style.genres}>{genres.map(e => e.name + " / ")}</h4>
        </div>

    )
}
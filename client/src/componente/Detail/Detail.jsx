import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { getIdGames } from "../../actions" 
import style from "./Detail.module.css";

export default function Detail (){
    const dispatch= useDispatch()
    const detalle = useSelector(state=>state.detail)
    const {id} = useParams()

    
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        dispatch(getIdGames(id))
         .then((response) => {
            setLoading(false);
            
         })
        
    },[dispatch, id])
console.log(detalle.createdDb)

 


   

        
    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
              
            </div>
        )
    }

    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(detalle.description, 'text/html')
    const description = htmlDoc.body.innerText

  
    return (
        
       <div >
            <h1 className={style.title}>{detalle.name}</h1>
        <div className={style.cointainer}>
            
            <div className={style.right}>
                <div className={style.border}>
                    <img className={style.img} src={detalle.background_image} alt='imagen' width='100%' height='520px'/> 

                    <div className={style.caja1}>
                        <div className={style.caja2}>
                            <h3 className={style.subtitles}>Platforms: </h3>
                            <p className={style.text}>{detalle.platforms}</p>
                        </div>
                        <div className={style.caja2}>
                        <h3 className={style.subtitles}>Generes:  </h3>
                        <p className={style.text}>{detalle.genres}</p>
                        </div>

                       
                    </div> 
                    
                </div>
            </div>
            
            <div className={style.left}>
                <h3 className={style.subtitles}>Description:</h3>
                <p className={style.text}>{description}</p>
                <h3 className={style.subtitles}>Rating: </h3>
                <h3 className={style.text}>{detalle.rating}</h3>
                <h3 className={style.subtitles}>Release Date: </h3>
                <h3 className={style.text}>{detalle.released}</h3>
            </div>
        </div>
          <div>
           <Link to={'/home'} >
             <button className={style.btn}>volver</button>
           </Link>  
           
          </div>
           
           
       </div>
    )
}
// onClick={((e) => handleSet(e))}
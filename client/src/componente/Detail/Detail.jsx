import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { getIdGames } from "../../actions" 

// ,setiar

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
console.log(detalle)
   

        
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
       <div>
           <h1>esto es detalle</h1>
           
        <div>
            <h1>{detalle.name}</h1>
            <img src={detalle.background_image} alt='imagen' width='400' height='250'/>
            <h3>Release Date:</h3>
            <h3>{detalle.released}</h3>
            <h3>Rating:</h3>
            <h3>{detalle.rating}</h3>
            <p>{description}</p>
            <h3>Platforms:</h3>
            <h3>{detalle.platforms}</h3>
            <h3>Generes:</h3>
            <h3>{detalle.genres}</h3>
        </div>
          <div>
        <Link to={'/home'} >
           <button >volver</button>
           </Link>  
          </div>
           
           
       </div>
    )
}
// onClick={((e) => handleSet(e))}
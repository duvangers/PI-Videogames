import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGames } from "../../actions";
import { Link } from "react-router-dom";
import  Card  from '../Card/Card';
import Paginado from '../Paginado/Paginado';
// import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css"

export default function Home (){
    const dispatch = useDispatch();
    const allGames = useSelector((state)=>state.games)
   
    const [currentPage, setCurrentPage] = useState(1)
    const[videogamePage, setVideogamePage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamePage // 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamePage // 0

    const currentVideogames =  allGames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    function paginado(pageNum){
        setCurrentPage(pageNum)
    }

    useEffect(()=>{
        dispatch(getAllGames()) 
       
    },[dispatch])
    const hadleReset= function(e){
        e.preventDefault()
        dispatch(getAllGames())
        setCurrentPage(1)
    }
 
 
    return (
        <div>
        
                
            
           
            <h1>VIDEOGAMES</h1>
               {
                currentVideogames[0] === "El juego no esta" ? null  
                : (
                    <div>
                      <Paginado 
                        videogamePage={videogamePage} 
                        allGames={allGames.length}
                        paginado={paginado}              
                        />          
                     <button onClick={hadleReset}>Refresh</button>   
                    </div>
                   
                  )
               } 
                  
              
                
            {
                currentVideogames[0] === "El juego no esta" ?  
                <div>
                    <h1> No esta</h1>
                    <button onClick={hadleReset} >Volver</button>
                </div> 
                :

                currentVideogames[0] ?
                 (
                    
                    currentVideogames.map((e)=>{
                        return(
                            
                            <Link to={'/detail/' + e.id} style={{ textDecoration: 'none' }}>
                            <Card 
                            key={e.id}
                            name = {e.name}
                            background_image={e.background_image}
                            genres={e.genres}
                            rating={e.rating}
                            /></Link>  
                            
                        )
                    })
                ) : <div className={style.cargando}>Cargando ...</div>
                }
        </div>
    )
 }
            
  
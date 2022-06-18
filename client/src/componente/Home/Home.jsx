import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGames } from "../../actions";
import { Link } from "react-router-dom";
import  Card  from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from "../SearchBar/SearchBar";


export default function Home (){
    const dispatch = useDispatch();
    const allGames = useSelector((state)=>state.games)
    // const [message , setmessage]= useState('Loading...')
   
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
    }
 
   console.log(currentVideogames)
    return (
        <div>
           <button type='button' onClick={hadleReset}>Reset</button>
            <h1>VIDEOGAMES</h1>
             <Paginado 
              videogamePage={videogamePage} 
              allGames={allGames.length}
              paginado={paginado}
              />
              
                <SearchBar />
            {
                currentVideogames[0] === "El juego no esta" ?   <h1> No esta</h1>
                :

                currentVideogames[0] ?
                 (
                    currentVideogames.map((e)=>{
                        return(<Link to={'/detail/' + e.id}>
                        <Card 
                        key={e.id}
                        name = {e.name}
                        background_image={e.background_image}
                        genres={e.genres }
                        rating={e.rating}
                        /></Link>)
                    })
                ) : <div>Cagando...</div>
                /* <div>
               {
                    currentVideogames[0] === ["El juego no esta"]?
                   <div>
                   {
                       console.log(currentVideogames)
                   } 
                       <h1>Game not fount</h1></div>
                 
                   :   
                currentVideogames?.map(e=>(
                      <div>
                        <Link to={'/detail/' + e.id}>
                        <Card 
                        key={e.id}
                        name = {e.name}
                        image={e.background_image}
                        genres={e.genres}
                        rating={e.rating}
                        /></Link>
                      </div>
                ))
               }
            </div>  */}
        </div>
    )
 }
            
    // return (
    //     <div>
    //         <h1> Estoy En Home</h1>
    //         {allGames.map(e=>{
    //                  return <Card 
    //                             key={e.id}
    //                             name={e.name}
    //                             background_image={e.background_image}
    //                             genres={e.genres}
    //                         />
    //              })   
    //         }
    //     </div>
    // )

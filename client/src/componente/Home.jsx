import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllGames } from "../redux/action";
import  Card  from '../componente/Card';

export default function Home (){
    const dispatch = useDispatch();
    const games = useSelector(state=>state.juegos)

    useEffect(()=>{
        dispatch(getAllGames()) 
    })
    console.log(games)
    return (
        <div>

            <h1>
                Estoy En Home
            </h1>

            {
                 games.map(e=>{
                     return <Card 
                                key={e.id}
                                name={e.name}
                                background_image={e.background_image}
                                genres={e.genres}
                            />
                 })   
            }

        </div>
    )
}
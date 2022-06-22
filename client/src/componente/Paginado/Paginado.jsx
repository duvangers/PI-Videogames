import React from 'react'
import style from './Paginado.module.css'
export default function Paginado ({videogamePage, allGames, paginado}){
    const pageNums =[]

    for(let i =1; i<=Math.ceil(allGames/videogamePage); i++){
        pageNums.push(i)
    }
    return(
       
    <nav className={style.nav}>
        <ul className={style.paginado}>
            {pageNums && pageNums.map(num =>(
                <li className={style.number}>
                    <a className={style.img} href="#top" onClick={() => paginado(num)} style={{ textDecoration: 'none' }}>{num} </a> 
                </li>
             
            ))
            }
        </ul>           
    </nav> 
    )
}
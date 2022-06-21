import React from 'react'
import style from './Paginado.module.css'
export default function Paginado ({videogamePage, allGames, paginado}){
    const pageNums =[]

    for(let i =1; i<=Math.ceil(allGames/videogamePage); i++){
        pageNums.push(i)
    }
    return(
        // <div>
        //     <ul className='paginado'>
        //         {
        //           pageNums &&  pageNums.map(e=>(
        //               <div key={e} className='num' onClick={()=> paginado(e)}>{e}  </div>
        //           )) 
        //         }
        //     </ul>
        // </div>
    <nav className={style.nav}>
        <ul className={style.paginado}>
            {pageNums && pageNums.map(num =>(
                <li className={style.number}>
                    <a className={style.img} href="#top" onClick={() => paginado(num)}>{num} </a> 
                </li>
             
            ))
            }
        </ul>           
    </nav> 
    )
}
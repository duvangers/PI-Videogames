import React from 'react'

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
    <nav>
        <ul className='paginado'>
            {pageNums && pageNums.map(num =>(
             <a href="#top" onClick={() => paginado(num)}>{num}-- </a> 
            ))
            }
        </ul>           
    </nav> 
    )
}
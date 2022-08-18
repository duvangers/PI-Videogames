import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterGenre, getGenres, filterOrder } from "../../actions";
import style from './Filter.module.css'
// import {setCurrentPage } from '../Home/Home'


export default function FilterByGenre ({setCurrentPage}) {
    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])

    const hadleFilterByGenre= function(e){

        dispatch(filterGenre(e.target.value))
        setCurrentPage(1)
    }
    const hadleFilterNameOrder= function(e){
        dispatch(filterOrder(e.target.value))
    }
console.log(genres)
    return (
        <div className={style.genres}>
        <section>
            <select  className={style.selc} name='alph' onChange={hadleFilterNameOrder}>
                <option  disabled value='none' >Select</option>
                <option  value='asc' >A - Z</option>
                <option  value='desc' >Z - A</option>
       </select>

     </section>
            <select className={style.selc} onChange={hadleFilterByGenre}>
                <option value='all'>All Genres</option>
                {
                    genres && genres.map(e =>(
                        <option key={e.name} value={e.name} >{e.name}</option>
                    ))
                }
            </select>
        </div>
    )
};
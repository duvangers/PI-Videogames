import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterGenre, getGenres, filterOrder } from "../../actions";


export default function FilterByGenre () {
    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])

    const hadleFilterByGenre= function(e){
        dispatch(filterGenre(e.target.value))
    }
    const hadleFilterNameOrder= function(e){
        dispatch(filterOrder(e.target.value))
    }
console.log(genres)
    return (
        <div>
        <section>
            <select name='alph' onChange={hadleFilterNameOrder}>
                <option  disabled value='none' >Select</option>
                <option  value='asc' >A - Z</option>
                <option  value='desc' >Z - A</option>
       </select>

     </section>
            <select onChange={hadleFilterByGenre}>
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
import React from 'react'
import { useDispatch } from 'react-redux'
import { filterRating} from '../../actions'
import { Link } from 'react-router-dom'
import style from './Filter.module.css'

export default function RatingFilter() {

    const dispatch = useDispatch()

    function handleFilterRating(e) {
        e.preventDefault()
        dispatch(filterRating(e.target.value))
    }

    return (
        <div className={style.rating}>
            <div>
                <Link to="/create">
                    <button>CREATE GAME</button>
                </Link>
            </div>
            <div>
                <select onChange={(e) => handleFilterRating(e)} >
                    <option value="best">Best rating</option>
                    <option value="worst">Worst rating</option>
                </select>
            </div>
            
        </div>
    )

}
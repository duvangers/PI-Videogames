import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, postVideogame, getPlatforms} from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import style from './Create.module.css'


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name required"
    }
    if (!input.description) {
        errors.description = "Complete description"
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating valid 0 - 5"
    }
    if (!input.released) {
        errors.released = "Complete date"
    } else if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(input.released)) { //eslint-disable-line
        errors.released = "Format error (dd//mm/yy)"
    } else {
        errors.released = ""
    }
    if (input.platforms.length < 1) {
        errors.platforms = "Enter platforms"
    } else {
        errors.platforms = ""
    }
    if (input.genres < 2) {
        errors.genres = "Enter genres"
    } else {
        errors.platforms = ""
    }
    return errors
}


export default function CharacterForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)


    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        genres: [],
        platforms: []
    })



    //----------Inputs---------
    function handleInputChange(e) {
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    //-----Select genres----
    function handleGenreSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.genres]: e.target.value
        }))
    }
    // -----Select platfroms----
    function handlePlatformsSelect(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.platforms]: e.target.value
        }))
    }

    //---------Send form--------
    function handleSubmit(e) {
        if (input.name === "") {
            e.preventDefault()
            alert("Completar correctamente el formulario")
        } else {
            e.preventDefault();
            dispatch(postVideogame(input))
            alert("Videojuego Creado!!")
            setInput({
                name: "",
                description: "",
                platforms: "",
                released: "",
                rating: "",
                background_image: "",
                genres: [],
                platforms: [] //eslint-disable-line
            })
            history.push('/home')
        }
    }

    //---------Delete genres---------
    function handleGenreDelete(el) {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el)
        })
    }

    //---------Delete platforms--------
    function handlePlatformDelete(el) {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== el)
        })
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms())

    }, [dispatch]);




    return (
        <div className={style.fondo}>
            <div className={style.title2}>
              <h1>Create a New Game</h1>  
            </div>
            
            <Link to="/home">
                <button className={style.btn} >Home</button>
               </Link> 
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={style.labels}>Name</label>
                    <input
                        className={style.input}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p className={style.error}> {errors.name} </p>
                        )
                    }
                </div>

                <div>
                    <label className={style.labels} >Rating</label>
                    <input
                        className={style.input}
                        type="number"
                        name="rating"
                        value={input.rating}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.rating && (
                            <div className={style.error}> {errors.rating} </div>
                        )
                    }
                </div>

                <div>
                    <label className={style.labels}>Release Date</label>
                    <input
                        className={style.input}
                        type="text"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.released && (
                            <div className={style.error}> {errors.released} </div>
                        )
                    }
                </div>

                <div >
                    <label className={style.labels}>Image:</label>
                    <input
                        className={style.input}
                        type="url"
                        name="background_image"
                        value={input.background_image}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div>
                    <label className={style.labels}>Description</label>
                    <textarea
                     className={style.description}
                        type="text"
                        value={input.inputDescription}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                        rows="5" cols="45"
                    />
                    {
                        errors.description && (
                            <p className={style.error} > {errors.description} </p>
                        )
                    }
                </div>

                <div>
                    <label className={style.labels}>Platforms</label>
                    <select className={style.input} onChange={(e) => handlePlatformsSelect(e)}>
                        {
                            platforms.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select >
                    {input.platforms.map(e => (
                        <div>
                            <li >{e}<button
                                type="button"
                                onClick={() => handlePlatformDelete(e)}
                            >X</button>
                            </li>
                        </div>
                    ))}
                    {
                        errors.platforms && (
                            <p className={style.error}> {errors.platforms} </p>
                        )
                    }
                </div >

                <div>
                    <label className={style.labels}>Genres</label>
                    <select  className={style.input}onChange={(e) => handleGenreSelect(e)}>
                        {
                            genres.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    <ul >
                        {input.genres.map(e => (
                            <div>
                                <li>{e}<button
                                    type="button"
                                    onClick={() => handleGenreDelete(e)}
                                >X</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                    {
                        errors.genres && (
                            <p className={style.error}> {errors.genres} </p>
                        )
                    }
                </div>
                {
                    errors && (errors.name || errors.rating || errors.description || errors.genres) ?
                        <p className={style.error} >Complete Form</p>
                        :
                        <button
                            type="submit"
                        >ADD VIDEOGAME
                        </button>
                }
               
            </form>
            
        </div>
    )
}
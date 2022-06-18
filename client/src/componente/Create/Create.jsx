import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, postVideogame, getPlatforms} from '../../actions'
import { useDispatch, useSelector } from 'react-redux';

// function validate(input) {
//     let errors = {};
//     if (!input.name) {
//       errors.name = 'Name is required';
//     }
//     if (!input.rating) {
//       errors.rating = 'Rating is required';
  
//     } else if (Number(input.rating)>5|| Number(input.rating)< 1 || isNaN(Number(input.rating))) {
//       errors.rating = 'Rating is invalid';
  
//     }
//     if (!input.released) {
//       errors.released = 'Released is required';
//     }
//     if (!input.released) {
//       errors.released = 'Released is required';
//     }
//     if (!input.description) {
//       errors.description = 'description is required';
//     }
//     if(input.genres.length< 1){
//       errors.genres= 'At least one gender'
//     }
//     if(input.platforms.length< 1){
//       errors.platforms= 'At least one platform'
//     }
  
//     return errors;
//   }
  
  
  
//   export default function AddVideogame() {
  
//     const [errors, seterrors] = useState({
//       name: "",
//       released: "",
//       rating: "",
//       description: "",
//       genres:"",
//       platforms:''
//     });
//     const [input, setInput] = useState({
//       name: "",
//       released: "",
//       rating: "",
//       description: "",
//       genre:'select',
//       platform:'select'
  
//     });
//     const [genres , setgenres]= useState([])
//     const [ platforms, setplatforms]= useState([])
  
//     const allGenres = useSelector((state)=>state.genres)
//     const allPlatforms = useSelector((state)=>state.platforms)
  
//     let dispatch = useDispatch()
  
//     function useFetchingWhenMount(actionCreator) {
//        useEffect(()=>{
//           dispatch(actionCreator())
//        }, [actionCreator])
//     }
//     useFetchingWhenMount(getGenres)
//     useFetchingWhenMount(getPlatforms)
  
//    const handleInputChange = function (e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//     seterrors(
//       validate({
//         ...input,
//         genres,
//         platforms,
//         [e.target.name]: e.target.value,
//       })
//     );
//     console.log(input);
//   };
  
//    function handleSubmit(e) {
//      e.preventDefault();
//      if(Object.keys(errors).length==0){
//        setInput({
//          name: "",
//          released: "",
//          rating: "",
//          description: '',
//          background_image:''
  
//        });
//        setgenres([])
//        setplatforms([])
//        dispatch(postVideogame({status:'added', genres, platforms, ...input}))
//        alert(" Game added")
//      }
//      return 0
  
//    }
//     function addGenre(e) {
//       setgenres(Array.from(new Set([...genres, e.target.value])))
//       seterrors(
//         validate({
//           ...input,
//           genres,
//           platforms,
//           [e.target.name]: e.target.value,
//         })
//       );
//     }
//     function addPlatform(e) {
//       setplatforms(Array.from(new Set([...platforms, e.target.value])))
//       seterrors(
//         validate({
//           ...input,
//           genres,
//           platforms,
//           [e.target.name]: e.target.value,
//         })
//       );
//     }
//    return (
//        <div>
//        <h1>Add VideoGame</h1>
  
  
//        <form
  
        
  
//          onSubmit={handleSubmit}
//        >
//        <div >
  
//          <div>
//            <label>Name </label>
//            <input
  
//              type="text"
//              onChange={handleInputChange}
//              name="name"
//              value={input.name}
//            />
//          </div>
//          {errors.name && (<p> {errors.name} </p>)}
  
//          <div>
//            <label>Released </label>
//            <input
//            placeholder={`example: 2013-12-18` }
//              type="text"
//              onChange={handleInputChange}
//              name="released"
//              value={input.released}
//            />
//          {errors.released && (<p> {errors.released} </p>)}
  
//          </div>
  
  
  
//          <div>
//            <label>Rating </label>
//              <input
//              placeholder={`1 to 5 example: 3.1`}
//                type="text"
//                onChange={handleInputChange}
//                name="rating"
//                value={input.rating}
//              />
//            {errors.rating && (<p > {errors.rating} </p>)}
  
//          </div>
//          <div>
//            <div>
//              <label>Description: </label>
//            </div>
//            <textarea
//              name="description"
//              value={input.description}
//              onChange={handleInputChange}
//              rows="6"
//              cols="40">
//            </textarea>
//            {errors.description && (<p > {errors.description} </p>)}
  
//          </div>
//          <div>
//            <label>Background Image link</label>
//              <input
//                type="text"
//                onChange={handleInputChange}
//                name="background_image"
//                value={input.background_image}
//              />
//          </div>
//          <div>
//            <label>Genres </label>
//            <select
//              name="genres"
//              value= {input.genre}
//              onChange={addGenre}
//            >
//              <option default value="select">select</option>
//              {allGenres?.map((g,i)=>{
//                return (
//                  <option key={i} value={g.name}>{g.name}</option>
//                )
//              })}
//            </select>
//            <br/>
  
  
//            {genres?.map((g,i)=>{
//              return <span key={i}>{`"`}{g}{`" `}</span>
//            })}
//            {errors.genres && (<p> {errors.genres} </p>)}
  
  
//          </div>
//          <div>
//            <label>Platforms </label>
//            <select
//              name="platforms"
//             value= {input.platform}
//              onChange={addPlatform}
//            >
//              <option default value="select">select</option>
//              {
//                allPlatforms?.map((p,i)=>{
//                  return (
//                    <option key={i} value={p.name}>{p.name}</option>
//                  )
//                })
//              }
//            </select>
//            <br/>
//            {platforms?.map((p,i)=>{
//              return <span key={i}>{`"`}{p}{`" `}</span>
//            })}
//            {errors.platforms && (<p> {errors.platforms} </p>)}
  
//          </div>
//          <button 
//            type="submit"
//            onClick={handleSubmit}
//            name="button">
//              Submit
//            </button>
//            </div>
  
//        </form>
//        <Link to='/home'>
//          <button 
//            >
//              Go to home
//            </button>
//        </Link>
//        </div>
//    );
//   }
  

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
    if (input.genres < 1) {
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
        <div>
            <h1>CREATE GAME</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input

                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p > {errors.name} </p>
                        )
                    }
                </div>

                <div>
                    <label >Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={input.rating}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.rating && (
                            <div> {errors.rating} </div>
                        )
                    }
                </div>

                <div>
                    <label>Release Date</label>
                    <input
                        type="text"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.released && (
                            <div > {errors.released} </div>
                        )
                    }
                </div>

                <div >
                    <label>Image:</label>
                    <input
                        type="url"
                        name="background_image"
                        value={input.background_image}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        type="text"
                        value={input.inputDescription}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                        rows="5" cols="45"
                    />
                    {
                        errors.description && (
                            <p > {errors.description} </p>
                        )
                    }
                </div>

                <div>
                    <label>Platforms</label>
                    <select onChange={(e) => handlePlatformsSelect(e)}>
                        {
                            platforms.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    {input.platforms.map(e => (
                        <div>
                            <li>{e}<button
                                type="button"
                                onClick={() => handlePlatformDelete(e)}
                            >X</button>
                            </li>
                        </div>
                    ))}
                    {
                        errors.platforms && (
                            <p> {errors.platforms} </p>
                        )
                    }
                </div >

                <div>
                    <label>Genres</label>
                    <select onChange={(e) => handleGenreSelect(e)}>
                        {
                            genres.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    <ul>
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
                            <p > {errors.genres} </p>
                        )
                    }
                </div>
                {
                    errors && (errors.name || errors.rating || errors.description || errors.genres) ?
                        <p  >Complete Form</p>
                        :
                        <button
                            type="submit"
                        >ADD VIDEOGAME
                        </button>
                }
            </form>
            <Link to="/home">
                <button >Home</button>
            </Link>
        </div>
    )
}
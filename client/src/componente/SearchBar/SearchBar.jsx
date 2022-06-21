import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGame } from "../../actions"
import styleSerch from "./SearchBar.module.css"


export default function SearchBar() {
   
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleInputChange(e) {
        e.preventDefault()
        setError(false)
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true) 
        setName('')
        dispatch(searchGame(name))
            .then(response => {
                !response ? setError(true) : setError(false)
                setLoading(false)
               
            })
            .catch(error => console.log(error))
           
    }
    
    return (
        <div>
            <p >
                {
                    error && (
                        <div >Game not found</div>
                    )
                }
                {
                    loading && loading ? <div>Searching...</div> : null
                }
            </p>
            <div>
                <input  onChange={((e) => handleInputChange(e))} placeholder="Name..." type="text" />
                <button className={styleSerch.bton} onClick={((e) => handleSubmit(e))} type="submit">Search</button>
            </div>
        </div>
    )
}
   
  

        
  
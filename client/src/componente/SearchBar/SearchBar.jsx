import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGame } from "../../actions"
import styleSerch from "./SearchBar.module.css"


export default function SearchBar() {
   
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault() 
        dispatch(searchGame(name))
       
    }
    
    return (
        <div>
        
            <div className={styleSerch.container}>
                <input  className={styleSerch.input}onChange={((e) => handleInputChange(e))} placeholder="Name..." type="text" />
                <button className={styleSerch.bton} onClick={((e) => handleSubmit(e))} type="submit">Search</button>
            </div>
        </div>
    )
}
   
  

        
  
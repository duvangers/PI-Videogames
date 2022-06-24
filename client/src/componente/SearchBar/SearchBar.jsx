import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGame } from "../../actions"
import styleSerch from "./SearchBar.module.css"


export default function SearchBar() {
   
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault() 
        dispatch(searchGame(name))
        setName('')
    }
    function handleOnKeyPress(e){
        if(e.key === 'Enter'){
            handleSubmit(e)
        }
    }

    
    return (
        <div>
        
            <div className={styleSerch.container}>
                <input  className={styleSerch.input} onChange={((e) => handleInputChange(e))} onKeyPress={ e=>handleOnKeyPress(e)} value={name} placeholder="Name..." type="text" />
                <button className={styleSerch.bton} onClick={((e) => handleSubmit(e))} type="submit">Search</button>
            </div>
        </div>
    )
}
   
  

        
  
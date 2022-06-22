import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"


export default function Landing (){
    return (
        <div className={style.body}>
            <div>
                <div  className={style.text}>
                    <Link to= {'/home'} >
                        <button className={style.title}>PLAY</button>
                    </Link>
                    {/* <img src="https://i.pinimg.com/originals/39/63/56/39635620bc39fd89280af66645b69d80.gif" alt="gif" /> */}
                </div>
           
            </div>
       
        </div>
    )
}
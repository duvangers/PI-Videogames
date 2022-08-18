import React from "react";
// import GenreByFilter from './Filter/Genre';
import DbFilter from './Filter/DB';
import Home from "./Home/Home";
import SearchBar from "./Filter/SearchBar";
import RatingFilter from "./Filter/Rating";
import style from "./AddFilers.module.css";

export default function AddFilters() {
    return(
        <div>
            <div className={style.filters}>
                <div>
                <DbFilter />  
                </div>
                <div>
                <RatingFilter />  
                </div>
                {/* <div>
                <GenreByFilter />  
                </div> */}
                <div>
                <SearchBar />
                </div>
            </div>

            <div>
            <Home />  
            </div>  
        </div>
    )
}
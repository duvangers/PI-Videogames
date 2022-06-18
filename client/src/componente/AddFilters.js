import React from "react";
import GenreByFilter from './Filter/Genre';
import DbFilter from './Filter/DB';
import Home from "./Home/Home";
// import SearchBar from "./SearchBar/SearchBar";
import RatingFilter from "./Filter/Rating"
export default function AddFilters() {
    return(
        <div>
            {/* <div>
             <SearchBar />  
            </div> */}
            <div>
             <DbFilter />  
            </div>
            <div>
             <RatingFilter />  
            </div>
            <div>
             <GenreByFilter />  
            </div>
            <div>
             <Home />  
            </div>
        </div>
    )
}
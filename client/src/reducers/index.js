const initialState = {
    games: [],
    genres: [],
    backUpVideogames: [],
    detail: [],
    platforms:[]
}

const rootReducer = (state=initialState, action)=> {
    
    switch(action.type){
        case "ALL_GAMES":{
            return {
                ...state,
                games: action.payload,
                backUpVideogames: action.payload
            }
            
        }
        case "ID_GAMES":{
            return {
                ...state,
                detail: action.payload
            }
        }
     
        case "GET_GENRES":{
            return {
                ...state,
                genres: action.payload
            }
        }
        case "GET_PLATFORMS":
            return{
                ...state,
                platforms:action.payload
            }
        case "SEARCH_GAME":{
            return {
                ...state,
                games: action.payload
            }
        }
        case "FILTER_GENRE":{
            
            const genreFilter = action.payload === "all" ? state.backUpVideogames :
            state.backUpVideogames.filter(e => {
                for (let i = 0; i < e.genres.length; i++) {
                    if (e.genres[i].name === action.payload) {
                        return true
                    }
                }
                return undefined
            })
              return {
                 ...state,
                 games: genreFilter
                }
        }
         case "FILTER_NAME_ORDER":{
            let sortedGames = action.payload === 'asc' ?
                    [...state.games].sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    }) :
                    [...state.games].sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    })
                return {
                    ...state,
                    games: sortedGames
                }
         }
         case "FILTER_BD":{
            console.log(action.payload)
            const bdFilter = action.payload === "true" ? state.backUpVideogames.filter(e => e.createdDb) : state.backUpVideogames
            return {
                ...state,
                games: bdFilter
            }
         }
         case "FILTER_RATING":{
           const ratingFilter =
                action.payload === 'best' ?
                    [...state.games].sort((b, a) => a.rating - b.rating)
                    :
                    [...state.games].sort((b, a) => b.rating - a.rating)
            return {
                ...state,
                games: ratingFilter
            }  
         }
         case 'SETIAR':{
             return{
                detail : ''
             }
         }
         case "POST_VIDEOGAMES": 
         return {
             ...state,
         }
        default:{
            return state
        }
    }
}

export default rootReducer; 
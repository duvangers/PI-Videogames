import axios from 'axios';


export function getAllGames (){
    return(dispatch)=>{
        const info = axios.get('http://localhost:3001/videogames')
        info.then((res)=>{
            dispatch({
                type: "ALL_GAMES",
                payload: res.data
            })
        })
    }
};

export function getIdGames (id){
    return async (dispatch)=>{
        const res = await axios.get(`http://localhost:3001/videogames/${id}`)
        dispatch({
            type: "ID_GAMES",
            payload: res.data
        })
    }
}

export function getGenres() {
    return(dispatch)=>{
        const genres = axios.get("http://localhost:3001/genres")
        genres.then((res)=>{
            dispatch({
                type: "GET_GENRES",
                payload: res.data
            })
        })
    }
};
export function getPlatforms() {
    return async function (dispatch) {
        try {
            const platforms = await axios.get("http://localhost:3001/platforms")
            return dispatch({
                type: "GET_PLATFORMS",
                payload: platforms.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function filterGenre(payload) {
    return {
        type: "FILTER_GENRE",
        payload,
    }
};

export function filterBd(payload) {
    return {
        type: "FILTER_BD",
        payload
    }
}

export function filterRating(payload) {
    return {
        type: "FILTER_RATING",
        payload
    }
}
export function filterOrder(payload) {
    return {
        type: "FILTER_NAME_ORDER",
        payload
    }
}

export function searchGame(payload) {
    return async function (dispatch) {
        try {
            const videogame = await axios.get("http://localhost:3001/videogames?name=" + payload)
            return dispatch({
                type: "SEARCH_GAME",
                payload: videogame.data
            })
        } catch (error) {
            console.log(error)
        }
    }
      
    
}

export function setiar(){
    return{
        type: 'SETIAR'
    }
}
export function postVideogame(payload) { //TRAIGO LA INFO NECESARIA PARA EL FORMULARIO DESDE EL POST DEL BACK
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/videogames", payload)
        return response;
    }
}
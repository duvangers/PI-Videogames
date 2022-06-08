import axios from 'axios';
export const ALL_GAMES = 'ALL_GAMES';




export function getAllGames (){
    return(dispatch)=>{
        const info = axios.get('http://localhost:3001/videogames')
        info.then((res)=>{
            dispatch({
                type: ALL_GAMES,
                payload: res.data
            })
        })
    }
}
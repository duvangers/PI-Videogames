import { ALL_GAMES } from "./action";

const initialState = {
    juegos: []
}

const rootReducer = (state=initialState, action)=> {
    
    switch(action.type){

        case ALL_GAMES:{

            return {
                ...state,
                juegos: action.payload,
            }
        }default:{
            return state
        }
    }
}

export default rootReducer; 
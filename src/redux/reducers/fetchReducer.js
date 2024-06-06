import { FETCH_LOADING, FETCH_SUCCESS, FETCH_FAILURE } from "../actions/fetchAction"

const INITIAL_STATE = { isLoading : false, data : [], error : null };


export const fetchReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_LOADING:
            return {
                ...state,
                isLoading : false
            }
        case FETCH_SUCCESS:
            console.log("Reducer: Handling FETCH_SUCCESS with payload:", action.payload);
            return{
                ...state,
                data : action.payload,
                isLoading : true
            }
        case FETCH_FAILURE:
            console.log("Reducer: Handling FETCH_FAILURE with payload:", action.payload);
            return{
                ...state,
                error:action.payload,
                isLoading : false
            }

        default :
        return{
            state
        }
    }
}

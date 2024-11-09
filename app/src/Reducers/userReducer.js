const userInitialState={
    data:[],
    serverErrors:[]
  }
export default function UserReducer(state=userInitialState,action){
    switch(action.type){
        case 'ADD_USER': {
            return { 
                ...state, 
                data: Array.isArray(state.data) ? [...state.data, action.payload] : [action.payload]
            };
        }
        case 'SET_SERVER_ERRORS':{
            return {...state,serverErrors:action.payload}
        }
        default:{
            return state
        }
    }
}
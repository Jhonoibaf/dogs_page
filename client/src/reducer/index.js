
const initialState = {
    dogs: [],
    allDBDogs: [],
}

export default function rootReducer (state = initialState, action){
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state, 
                dogs: action.payload,
                allDBDogs: action.payload
            }; 
       case 'FILTER_CREATEDDB':
           const dogsApiDb = state.allDBDogs
           const filterCreated = action.payload === 'created'? dogsApiDb.filter(el => el.createInDb) : dogsApiDb.filter(el => !el.createInDb)
            return {
                ...state,
                dogs: action.payload === 'All'? state.allDBDogs: filterCreated,
       };
        default:
            return state;
    }
};


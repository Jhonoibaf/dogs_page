
const initialState = {
    dogs: [],
    allDBDogs: [],
}

function getMaxWeight (objeto){
  const weight = objeto.weight.metric
  const maxWeight = weight?.split(' - ')[1]
  if(maxWeight){
    return parseInt(maxWeight)}
  return 0
};

function getMinWeight (objeto){
  const weight = objeto.weight.metric
  const minWeight = weight?.split(' - ')[0]
  if(minWeight){
    return parseInt(minWeight)}
  return 1
};

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
        case 'GET_NAME_INFO':
              return{
                ...state,
                dogs: action.payload
              }
        case 'POST_DOG_INFO':
              return{
                ...state,
              }
        case 'ORDER_BY_NAME':
            const orderDogs = action.payload === 'OrdA'?
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              }):
              state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              })
              return{
                  ...state,
                  dogs: orderDogs
              }
        case 'ORDER_BY_WEIGHT':
          const orderbyWeight = action.payload === 'Asc'?
          state.dogs.sort(function (a, b){
              return(getMinWeight(a) - getMinWeight(b)) 
             ;
            }):
          state.dogs.sort(function (a, b) {
              return (getMaxWeight(b) - getMaxWeight(a)) 
              }
              )
            return{
                ...state,
                dogs: orderbyWeight
            }
        default:
            return state;
    }
};


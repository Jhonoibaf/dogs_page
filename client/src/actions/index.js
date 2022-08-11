import axios from 'axios';

export function getDogs () {
    return async function(dispatch){
       try{
        var json = await axios.get('http://localhost:3001/dogs');
        return dispatch ({
                type: 'GET_DOGS',
                payload: json.data
            })
        } catch (error){
            console.log(error);
        }      
    } 
};

export function filterDb (payload) {
       return{
        type:'FILTER_CREATEDDB',
        payload
    }
}

export function orderByName (payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight (payload){
    return{
        type:'ORDER_BY_WEIGHT',
        payload
    }
}
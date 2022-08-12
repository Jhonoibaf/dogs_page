import axios from 'axios';

export function getDogs () {
    return async function(dispatch){
       try{
        var info = await axios.get('http://localhost:3001/dogs');
        return dispatch ({
                type: 'GET_DOGS',
                payload: info.data
            })
        } catch (error){
            console.log(error);
        }      
    } 
};

export function getTemperaments(){
    return async function(dispatch){
        try{
            var info = await axios.get('http://localhost:3001/temperaments')
            return dispatch(
                {
                    type: 'GET_TEMPERAMETS',
                    payload: info.data
                }
            )
        } catch(error){
        console.error(error);
        }
    }
}

export function getNameInfo(name){
    return async function(dispatch){
        try{
            var info = await axios.get('http://localhost:3001/dogs?name='+ name)
            return dispatch(
                {
                    type: 'GET_NAME_INFO',
                    payload: info.data
                }
            )
        } catch(error){
        console.error(error);
        }
    }
}

export function postDogInfo(payload){
    return async function(dispatch){
        try{
            var info = await axios.post('http://localhost:3001/dogs', payload)
            return dispatch({
                type: 'POST_DOG_INFO',
                info
            })
        } catch(error){
        console.error(error);
        }
    }
}

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
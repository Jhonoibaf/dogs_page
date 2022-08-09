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
    // A comment
       return{
        type:'FILTER_CREATEDDB',
        payload
    }
}
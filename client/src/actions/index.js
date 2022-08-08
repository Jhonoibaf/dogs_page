import axios from 'axios';

export default function getDogs () {
    return async function(dispatch){
       try{
        var json = await axios.get('http://localhost:3001/dogs');
            console.log(json);
        return dispatch ({
                type: 'GET_DOGS',
                payload: json.data
            })
        } catch (error){
            console.log(error);
        }      
    } 
};
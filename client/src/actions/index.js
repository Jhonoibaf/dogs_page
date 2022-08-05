import axios from 'axios';

export default function getDogs () {
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/Home', {});
        return dispatch ({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
};

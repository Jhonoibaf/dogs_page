import axios from 'axios';

export default function getDogs () {
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs',{

        });
        return dispatch ({
            type: 'GET_DOFS',
            payload: json.data
        })
    }
};

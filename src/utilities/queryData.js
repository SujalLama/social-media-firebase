import axios from 'axios';
import {
   useQuery,
 } from 'react-query'
import { URL } from './urlConstants';

const useQueryData = (param) => {
    const { isLoading, error, data } = useQuery(param, async () =>
        {
            const {data: {data}} = await axios.get(`${URL + param}`)
            return data;
        }
    );
    return {isLoading, error, data };
}

export default useQueryData;
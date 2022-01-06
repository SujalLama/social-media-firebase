import axios from 'axios';
import {
   useMutation
 } from 'react-query'
import { URL } from './urlConstants';

const useMutateData = (param) => {
    const {isLoading, error, data, mutate} = useMutation(async (body) => {
     const {data:{data}} = await axios.post(`${URL + param}`, body)
     return data;
   })
    
    return {isLoading, error, data, mutate };
}

export default useMutateData;
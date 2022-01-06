import axios from "axios";
import { API_URL, AUTH, LOGIN, REGISTER} from "../../urlConstants";
import history from "../../utils/history";
import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS 
} from "../redux-constants/userConstants"

export const userLogin = (user, path) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST});
        const {data: {data}} = await axios.post(API_URL + AUTH + LOGIN, user);
        window.localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        history.replace(path)
    } catch (error) {
        error.response?.data?.message 
            ? dispatch({type: USER_LOGIN_FAIL, payload: error.response?.data?.message})
            : dispatch({type: USER_LOGIN_FAIL, payload: error.message})
    }
}

export const userRegister = (user) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST});
        const {data:{data}} = await axios.post(API_URL + AUTH + REGISTER, user);
        window.localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        history.replace('/tests')
    } catch (error) {
        error.response?.data?.message 
            ? dispatch({type: USER_REGISTER_FAIL, payload: error.response?.data?.message})
            : dispatch({type: USER_REGISTER_FAIL, payload: error.message})
        
    }
}

export const userLogout = () => (dispatch) => {
    window.localStorage.removeItem('userInfo');
    history.replace('/');
    dispatch({type: USER_LOGOUT})
}
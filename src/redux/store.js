import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { userAuthenticationReducer} from './reducers/userReducer';

const reducers = combineReducers({
    userInfo: userAuthenticationReducer,
});

const userInfoFromStorage = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : null;

const initialState = {
    userInfo: {user: userInfoFromStorage}
}
const middleware = [thunk];
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
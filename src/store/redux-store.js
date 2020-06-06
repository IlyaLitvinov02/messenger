import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { reducer as channelsReducer } from '../features/channels/reducer';
import { reducer as authReducer } from './../features/auth/reducer';

const reducers = combineReducers({
    channels: channelsReducer,
    auth: authReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
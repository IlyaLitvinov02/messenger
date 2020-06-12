import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { channelsReducer } from '../features/channels/reducer';
import { authReducer } from './../features/auth/reducer';
import { chatReducer } from "../features/chat/reducer";
import { searchReducer } from "../features/search/reducer";
import { errorReducer } from '../reducers/errorReducer'

const reducers = combineReducers({
    chat: chatReducer,
    channels: channelsReducer,
    auth: authReducer,
    search: searchReducer,
    errors: errorReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
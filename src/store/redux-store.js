import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { reducer as channelsReducer } from '../features/channels/reducer';
import { reducer as authReducer } from './../features/auth/reducer';
import { reducer as chatReducer} from "../features/chat/reducer";

const reducers = combineReducers({
    chat: chatReducer,
    channels: channelsReducer,
    auth: authReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
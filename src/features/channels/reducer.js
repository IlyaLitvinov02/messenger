import { getUsersByTerm, createChatInfo, subscribeOnChats } from "../../api/database";

const SET_CHANNELS_LIST = 'channels/reducer/SET_CHANNELS_LIST';
const SET_ERROR = 'channels/reducer/SET_ERROR'


const initialState = {
    channelsList: [],
    error: undefined
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANNELS_LIST:
        case SET_ERROR:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const setChannelsList = channelsList => ({ type: SET_CHANNELS_LIST, payload: { channelsList } });
export const setError = error => ({ type: SET_ERROR, payload: { error } });

export const searchUsers = term => async dispatch => {
    try {
        const snapshot = await getUsersByTerm(term);
        const list = [];
        snapshot.forEach(snapshotChild => {
            list.push(snapshotChild.val());
        });
        dispatch(setChannelsList(list));
    } catch (error) {
        console.log(error);
    }
}

export const createChat = (firstUser, secondUser) => dispatch => {
    try {
        createChatInfo(firstUser, secondUser);
    } catch (error) {
        dispatch(setError( error.message ));
    }
}

export const getMyChats = () => dispatch => {
    subscribeOnChats(snapshot => {
        const list = [];
        snapshot.forEach(snapshotChild => {
            const value = snapshotChild.val()
            list.push({
                ...value,
                name: value.title,
                chatId: snapshotChild.key
            });
        });
        dispatch(setChannelsList(list));
    });
}
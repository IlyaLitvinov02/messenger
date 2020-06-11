import { chatsAPI } from "./api";

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


export const createChat = (firstUser, secondUser) => dispatch => {
    try {
        chatsAPI.createChatInfo(firstUser, secondUser);
    } catch (error) {
        dispatch(setError( error.message ));
    }
}

export const subscribeOnChats = () => dispatch => {
    console.log('subscribe on chats');
    chatsAPI.subscribeOnChats(snapshot => {
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

export const unsubscribeOffChats = (currentUserId) => dispacth => {
    console.log('unsubscribe off chats');
    chatsAPI.unsubscribeOffChats(currentUserId);
}

export const updateLastMessageAndTimestamp = (chatId, receiverId, messageBody) => dispatch => {
    chatsAPI.updateLastMessageAndTimestamp(chatId, receiverId, messageBody);
}

export const increaseNewMessagesCount = (chatId, receiverId) => dispatch => {
    chatsAPI.increaseNewMessagesCount(chatId, receiverId);
}

export const resetNewMessagesCount = chatId => dispatch => {
    chatsAPI.resetNewMessagesCount(chatId);
}
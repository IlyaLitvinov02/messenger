import { chatsAPI } from "./api";
import { setError } from '../../reducers/errorReducer';

const SET_CHANNELS_LIST = 'channels/reducer/SET_CHANNELS_LIST';


const initialState = {
    channelsList: [],
}

export const channelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANNELS_LIST:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const setChannelsList = channelsList => ({ type: SET_CHANNELS_LIST, payload: { channelsList } });


export const createChat = (firstUser, secondUser) => dispatch => {
    try {
        chatsAPI.createChatInfo(firstUser, secondUser);
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const subscribeOnChats = () => dispatch => {
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

export const unsubscribeOffChats = currentUserId => dispacth => {
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

export const setIsTyping = (chatId, receiverId, isTyping) =>
    dispatch => chatsAPI.setIsTyping(chatId, receiverId, isTyping);

import { messagesAPI } from "./api";
import { increaseNewMessagesCount, updateLastMessageAndTimestamp } from "../channels/reducer";

const SET_MESSAGES = 'chat/reducer/SET_MESSAGES';
const SET_CURRENT_CHAT = 'chat/reducer/SET_CURRENT_CHAT';


const initialState = {
    messages: [],
    currentChat: {}
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_CHAT:
        case SET_MESSAGES:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const setMessages = messages => ({ type: SET_MESSAGES, payload: { messages: [...messages] } });
export const setCurrentChat = currentChat => ({ type: SET_CURRENT_CHAT, payload: { currentChat } });


export const sendMessage = (chatId, receiverId, messageBody) => dispatch => {
    messagesAPI.addMessage(chatId, receiverId, messageBody);
    dispatch(increaseNewMessagesCount(chatId, receiverId))
    dispatch(updateLastMessageAndTimestamp(chatId, receiverId, messageBody));
}

export const subscribeOnMessages = chatId => dispatch => {
    messagesAPI.subscribeOnMessages(chatId, snapshot => {
        console.log('subscribed on messages');
        const list = [];
        snapshot.forEach(snapshotChild => {
            const value = snapshotChild.val();
            list.push({
                ...value,
                messageId: snapshotChild.key
            })
        });
        dispatch(setMessages(list));
    });
}

export const unsubscribeOffMessages = chatId => dispatch => {
    console.log('unsubscribed off messages');
    messagesAPI.unsubscribeOffMessages(chatId);
}
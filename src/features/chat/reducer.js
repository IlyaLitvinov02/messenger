import { addMessage } from "../../api/database";

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


export const sendMessage = (chatId, senderId, receiverId, messageBody) => dispatch => {
    addMessage(chatId, senderId, receiverId, messageBody);
}
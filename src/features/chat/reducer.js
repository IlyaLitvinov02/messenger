const SET_MESSAGES = 'chat/reducer/SET_MESSAGES';
const SEND_MESSAGE_SUCCESS = 'chat/reducer/SEND_MESSAGE_SUCCESS';



const initialState = {
    messages: [],
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                ...action.payload
            };
        case NEW_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, action.message],
            };
        default:
            return state;
    }
}

export const setMessages = messages => ({ type: SET_MESSAGES, payload: { messages: [...messages] } });
export const sendMessageSuccess = message => ({ type: SEND_MESSAGE_SUCCESS, message });
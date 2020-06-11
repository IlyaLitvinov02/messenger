import { messagesAPI } from "./api/database";
import { increaseNewMessagesCount, updateLastMessageAndTimestamp } from "../channels/reducer";
import { uploadMessageImage } from "./api/storage";


const SET_MESSAGES = 'chat/reducer/SET_MESSAGES';
const SET_CURRENT_CHAT = 'chat/reducer/SET_CURRENT_CHAT';
const SET_IS_IMAGE_UPLOADING = 'chat/reducer/SET_IS_IMAGE_UPLOADING';

const initialState = {
    messages: [],
    currentChat: {},
    isImageUploading: false
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_CHAT:
        case SET_MESSAGES:
        case SET_IS_IMAGE_UPLOADING:
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
export const setIsImageUploading = isImageUploading => ({ type: SET_IS_IMAGE_UPLOADING, payload: { isImageUploading } });


export const sendMessage = (chatId, receiverId, messageBody, image) => async dispatch => {
    if (image !== undefined) {
        dispatch(setIsImageUploading(true));
        const response = await uploadMessageImage(image, chatId);
        if (response.state === 'success') {
            const imageUrl = await response.ref.getDownloadURL();
            messagesAPI.addMessage(chatId, receiverId, messageBody, imageUrl);
        }
        dispatch(setIsImageUploading(false))
    } else {
        messagesAPI.addMessage(chatId, receiverId, messageBody);
    }
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

export const unsubscribeOffMessages = (chatId, uid) => dispatch => {
    console.log('unsubscribed off messages');
    messagesAPI.unsubscribeOffMessages(chatId, uid);
}
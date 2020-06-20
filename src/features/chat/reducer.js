import { messagesAPI } from "./api/database";
import { increaseNewMessagesCount, updateLastMessageAndTimestamp } from "../channels/reducer";
import { uploadMessageImage } from "./api/storage";
import { setError } from "../../reducers/errorReducer";


const SET_MESSAGES = 'chat/reducer/SET_MESSAGES';
const SET_CURRENT_CHAT = 'chat/reducer/SET_CURRENT_CHAT';
const SET_IS_IMAGE_UPLOADING = 'chat/reducer/SET_IS_IMAGE_UPLOADING';

const initialState = {
    messages: [],
    currentChat: {},
    isImageUploading: false
}


export const chatReducer = (state = initialState, action) => {
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
    try {
        const messageBodyText =
            messageBody
                ? messageBody.blocks
                    .map(block => block.text !== undefined ? block.text : '')
                    .reduce((previousText, currentText) => previousText + ' ' + currentText)
                : undefined;

        if (image !== undefined) {
            dispatch(setIsImageUploading(true));
            const response = await uploadMessageImage(image, chatId);
            if (response.state === 'success') {
                const imageUrl = await response.ref.getDownloadURL();
                const body = messageBodyText ? messageBody : null;
                messagesAPI.addMessage(chatId, receiverId, body, imageUrl);
            }
            dispatch(setIsImageUploading(false))
        } else {
            if (!messageBodyText) return;
            messagesAPI.addMessage(chatId, receiverId, messageBody);
        }

        dispatch(increaseNewMessagesCount(chatId, receiverId));

        const lastMessage = messageBodyText ? messageBodyText : image ? 'Photo' : null;
        dispatch(updateLastMessageAndTimestamp(chatId, receiverId, lastMessage));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const subscribeOnMessages = chatId => dispatch => {
    try {
        messagesAPI.subscribeOnMessages(chatId, snapshot => {
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
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const unsubscribeOffMessages = (chatId, uid) => dispatch => {
    try {
        messagesAPI.unsubscribeOffMessages(chatId, uid);
    } catch (error) {
        dispatch(setError(error.message));
    }
}
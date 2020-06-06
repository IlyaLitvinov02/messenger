const SET_CHANNELS_LIST = 'channels/reducer/SET_CHANNELS_LIST';

const initialState = {
    channelsList: [
        // {
        //     channellId: null,
        //     channelName: null,
        //     channelAvatar: null,
        //     newMessagesCount: null
        // }
    ]
}

export const reducer = (state = initialState, action) => {
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
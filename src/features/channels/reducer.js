import { getUsersByTerm } from "../../api/database";

const SET_CHANNELS_LIST = 'channels/reducer/SET_CHANNELS_LIST';

const initialState = {
    channelsList: []
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


export const searchUsers = term => async dispatch => {
    const snapshot = await getUsersByTerm(term);
    const list = [];
    snapshot.forEach(snapshotChild => {
        list.push(snapshotChild.val());
    });
    dispatch(setChannelsList(list));
} 


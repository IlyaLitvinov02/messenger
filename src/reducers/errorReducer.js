const SET_ERROR = 'reducers/errorReducer/SET_ERROR'


const initialState = {
    error: undefined
}

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const setError = error => ({ type: SET_ERROR, payload: { error } });
import { notificationAPI } from "./api/messaging"
import { setError } from "../../reducers/errorReducer";
import { setPushToken } from "./api/database";


export const setToken = (token) => async dispatch => {
    try {
        setPushToken(token);
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const getToken = () => async dispatch => {
    try {
        const token = await notificationAPI.getToken();
        if (token) {
            dispatch(setToken(token));
        } else {
            dispatch(requestPermission());
        }
    } catch (error) {
        dispatch(setError(error.message))
    }
}


export const refreshToken = () => async dispatch => {
    try {
        notificationAPI.onTokenRefresh(() => {
            dispatch(getToken());
        });
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const requestPermission = () => async dispatch => {
    try {
        await notificationAPI.requestPermission();
        dispatch(getToken());
    } catch (error) {
        dispatch(setError(error.message))
    }
}
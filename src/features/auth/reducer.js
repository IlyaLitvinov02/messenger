import { authAPI, updateUserInfo } from "./api/auth";
import { setError } from '../../reducers/errorReducer';
import { uploadUserPhoto } from "./api/storage";



const SET_CURRENT_USER = 'auth/reducer/SET_CURRENT_USER';
const SET_IS_AUTH = 'auth/reducer/SET_IS_AUTH';
const SET_USER_NAME = 'auth/reducer/SET_USER_NAME';
const SET_USER_PHOTO_URL = 'auth/reducer/SET_USER_PHOTO_URL'


const initialState = {
    currentUser: {},
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
        case SET_CURRENT_USER:
            return {
                ...state,
                ...action.payload
            };
        case SET_USER_NAME:
        case SET_USER_PHOTO_URL:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload
                }
            };
        default:
            return state;
    }
}



export const setCurrentUser = user => ({ type: SET_CURRENT_USER, payload: { currentUser: user } });
export const setIsAuth = isAuth => ({ type: SET_IS_AUTH, payload: { isAuth } });
export const setUserName = name => ({ type: SET_USER_NAME, payload: { name } });
export const setUserPhotoURL = photoURL => ({ type: SET_USER_PHOTO_URL, payload: { photoURL } });


export const signInWithGoogle = () => async dispatch => {
    try {
        await authAPI.signInWithGoogle()
    } catch (error) {
        dispatch(setError(error.message));
    }
}




export const signUp = (email, password) => async dispatch => {
    try {
        const response = await authAPI.signUp(email, password);
        if (response && response.user) return 'success';
    } catch (error) {
        dispatch(setError(error.message));
    }
}


export const signIn = (email, password) => dispatch => {
    try {
        authAPI.signIn(email, password);
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const signOut = () => async dispatch => {
    try {
        await authAPI.signOut();
        dispatch(setIsAuth(false));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const onAuthStateChanged = () => dispatch => {
    try {
        authAPI.onAuthStateChanged(async user => {
            if (user) {
                const { photoURL, displayName, email, emailVerified, uid } = user;
                dispatch(setCurrentUser({
                    photoURL,
                    name: displayName,
                    email,
                    emailVerified,
                    uid
                }));
                dispatch(setIsAuth(true));
            }
        });
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const updateUserName = name => dispatch => {
    try {
        authAPI.updateUserName(name).then(() => {
            dispatch(setUserName(name));
        });
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const updateUserPhoto = photo => async dispatch => {
    try {
        if (photo.type.split('/')[0] === 'image') {
            const response = await uploadUserPhoto(photo);
            if (response.state === 'success') {
                const photoURL = await response.ref.getDownloadURL();
                await authAPI.updateUserPhoto(photoURL);
                dispatch(setUserPhotoURL(photoURL));
            }
        } else {
            throw new Error('Invalid file type');
        }
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const updateCurrentUserInfo = (email, uid, name, photoURL) => dispatch => {
    try {
        updateUserInfo(email, uid, name, photoURL);
    } catch (error) {
        dispatch(setError(error.message));
    }
}
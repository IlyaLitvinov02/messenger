import { authAPI } from "./api";

const SET_CURRENT_USER = 'auth/reducer/SET_CURRENT_USER';
const SET_IS_AUTH = 'auth/reducer/SET_IS_AUTH';


const initialState = {
    currentUser: {},
    isAuth: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
        case SET_CURRENT_USER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}



export const setCurrentUser = user => ({ type: SET_CURRENT_USER, payload: { currentUser: user } });
export const setIsAuth = isAuth => ({ type: SET_IS_AUTH, payload: { isAuth } });


export const signIn = () => dispatch => {
    try {
        authAPI.signIn()
    } catch (error) {
        console.log(error);
    }
}

export const signOut = () => async dispatch => {
    try {
        await authAPI.signOut();
        dispatch(setIsAuth(false));
    } catch (error) {
        console.log(error);
    }
}

export const onAuthStateChanged = () => dispatch => {
    try {
        authAPI.onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                const { photoURL, displayName, email, emailVerified, uid } = user;
                dispatch(setCurrentUser({
                    photoURL,
                    displayName,
                    email,
                    emailVerified,
                    uid
                }));
                dispatch(setIsAuth(true));
            }
        });
    } catch (error) {
        console.log(error);
    }
}
import { getUsersByName, getUsersByEmail } from './api';
import { setError } from '../../reducers/errorReducer';


const SET_SEARCH_MODE = 'search/reducer/SET_SEARCH_MODE';
const SET_SEARCH_RESULTS = 'search/reducer/SET_SEARCH_REDUCER';


const initialState = {
    searchMode: false,
    searchResults: []
}


export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_MODE:
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}


export const setSearchResults = results => ({ type: SET_SEARCH_RESULTS, payload: { searchResults: results } });
export const setSearchMode = searchMode => ({ type: SET_SEARCH_MODE, payload: { searchMode } });

export const searchUsers = term => async dispatch => {
    try {
        const snapshot = term.search(/.+@.+\..+/i) !== -1
            ? await getUsersByEmail(term) 
            : await getUsersByName(term);
        const results = [];
        snapshot.forEach(snapshotChild => {
            results.push(snapshotChild.val());
        });
        dispatch(setSearchResults(results));
    } catch (error) {
        dispatch(setError(error.message));
    }
}
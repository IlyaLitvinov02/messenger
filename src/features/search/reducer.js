import { getUsersByTerm } from './api';


const SET_SEARCH_MODE = 'search/reducer/SET_SEARCH_MODE';
const SET_SEARCH_RESULTS = 'search/reducer/SET_SEARCH_REDUCER';


const initialState = {
    searchMode: false,
    searchResults: []
}


export const reducer = (state = initialState, action) => {
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
        const snapshot = await getUsersByTerm(term);
        const results = [];
        snapshot.forEach(snapshotChild => {
            results.push(snapshotChild.val());
        });
        dispatch(setSearchResults(results));
    } catch (error) {
        console.log(error);
    }
}
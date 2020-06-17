import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { firebaseConfig } from './config/fbConfig';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, updateCurrentUserInfo } from './features/auth/reducer';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { Login } from './pages/Login';
import { Messenger } from './pages/main/Messenger';
import { Signup } from './pages/Signup';
import { setError } from './reducers/errorReducer';


const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />



firebase.initializeApp(firebaseConfig);


export const App = () => {
    const error = useSelector(state => state.errors.error);
    const {
        currentUser: {
            photoURL,
            name,
            email,
            uid
        },
        isAuth
    } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(onAuthStateChanged());
    }, [dispatch]);

    useEffect(() => {
        if (isAuth) {
            dispatch(updateCurrentUserInfo(email, uid, name, photoURL));
        }
    }, [isAuth, photoURL, name, email, uid, dispatch]);

    const handleClose = () => {
        dispatch(setError(undefined));
    }


    return (
        <Router>
            <div className="App">
                <Snackbar
                    open={!!error}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert severity='error'>{error}</Alert>
                </Snackbar>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/main' />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/signup'>
                        <Signup />
                    </Route>
                    <Route path='/main/:chatId?'>
                        <Messenger />
                    </Route>
                    <Route>
                        You just hit the route that doesn't exist... the sadness
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
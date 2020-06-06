import React, { useEffect } from 'react';
import './App.css';
import { Messenger } from './pages/main/Messenger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { firebaseConfig } from './api/fbConfig';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from './features/auth/reducer';


firebase.initializeApp(firebaseConfig);


export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(onAuthStateChanged());
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/:chatId?'>
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
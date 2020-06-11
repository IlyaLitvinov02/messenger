import React from 'react';
import {
    Dialog,
    DialogTitle,
    ListItem,
    List,
    ListItemText,
} from '@material-ui/core';
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SignupForm } from '../features/auth/SignupForm';



export const Signup = () => {
    const isAuth = useSelector(state => state.auth.isAuth);



    if (isAuth) return <Redirect to='/' />
    return (
        <Dialog open>
            <DialogTitle>
                Sign up
            </DialogTitle>
            <List>
                <SignupForm />
                <NavLink to='/login'>
                    <ListItem button>
                        <ListItemText>To login page</ListItemText>
                    </ListItem>
                </NavLink>
            </List>
        </Dialog>
    );
}
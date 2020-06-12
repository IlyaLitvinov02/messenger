import React from 'react';
import {
    Dialog,
    DialogTitle,
    ListItem,
    List,
    ListItemText,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { SignupForm } from '../features/auth/SignupForm';



export const Signup = () => (
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

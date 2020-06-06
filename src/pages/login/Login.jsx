import React from 'react';
import {
    Dialog,
    DialogTitle,
    Avatar,
    ListItem,
    List,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../features/auth/reducer';



export const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    

    const handleClick = () => {
        dispatch(signIn());
    }


    if (isAuth) return <Redirect to='/' />
    return (
        <Dialog open>
            <DialogTitle>
                Sign in
            </DialogTitle>
            <List>
                <ListItem button onClick={() => { handleClick() }}>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: "#eee" }}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                height="30"
                                alt="G"
                            />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        Sign in with Google
                    </ListItemText>
                </ListItem>
            </List>
        </Dialog>
    );
}
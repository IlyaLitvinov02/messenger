import React, { useEffect } from 'react';
import { ListItem, ListItemText, Avatar, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../auth/reducer';
import { useStyles } from './styles';
import { writeUserInfo } from '../../api/database';

export const Menu = () => {
    const {
        currentUser: {
            photoURL,
            displayName,
            email,
            uid
            //emailVerified
        },
        isAuth
    } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        if (!!displayName && !!uid) {
            writeUserInfo(displayName, email, photoURL, uid);
        }
    },[email, displayName, photoURL, uid]);

    const handleClick = () => {
        dispatch(signOut());
    }

    return (
        <>
            <Avatar src={photoURL} />
            <ListItem>
                <ListItemText
                    primary={displayName} secondary={email}
                    classes={{
                        primary: classes.primaryText
                    }} />
            </ListItem>
            {isAuth &&
                <Button
                    variant='outlined'
                    color="primary"
                    onClick={handleClick}>Logout</Button>}
        </>
    );
}
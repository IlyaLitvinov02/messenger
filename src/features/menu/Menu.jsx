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
            name,
            email,
            uid
        },
        isAuth
    } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        if (!!name && !!uid) {
            writeUserInfo(name, email, photoURL, uid);
        }
    }, [email, name, photoURL, uid]);

    const handleClick = () => {
        dispatch(signOut());
    }

    return (
        <>
            <Avatar src={photoURL} />
            <ListItem>
                <ListItemText
                    primary={name} secondary={email}
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
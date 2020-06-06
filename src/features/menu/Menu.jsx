import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../auth/reducer';

export const Menu = () => {
    const {
        photoURL,
        displayName,
        email,
        //emailVerified
    } = useSelector(state => state.auth.currentUser)
    const dispatch = useDispatch();


    const handleClick = () => {
        dispatch(signOut());
    }

    return (
        <div>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={displayName} secondary={email} />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemText>
                        Sign out
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}
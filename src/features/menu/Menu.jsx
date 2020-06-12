import React from 'react';
import { ListItem, ListItemText, Avatar, Button, IconButton, ListItemAvatar, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, updateUserPhoto } from '../auth/reducer';
import { useStyles } from './styles';

export const Menu = () => {
    const {
        currentUser: {
            photoURL,
            name,
            email,
        },
        isAuth
    } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const classes = useStyles();


    const handleClick = () => {
        dispatch(signOut());
    }

    const handleFileChange = ({ target }) => {
        const uploadFile = target.files[0];
        dispatch(updateUserPhoto(uploadFile));
    }


    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Tooltip
                        title='Update avatar'
                        classes={{ tooltip: classes.customSizeTooltip }}
                        arrow
                    >
                        <IconButton component='label'>
                            <Avatar src={photoURL} />
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange} />
                        </IconButton>
                    </Tooltip>
                </ListItemAvatar>
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
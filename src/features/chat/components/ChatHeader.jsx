import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
    itemText: {
        color: "#424242"
    }
}));

export const ChatHeader = () => {
    const { photoURL, name } = useSelector(state => state.chat.currentChat);

    const classes = useStyles();

    return (
        <>
            {name &&
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={photoURL} />
                    </ListItemAvatar>
                    <ListItemText classes={{
                        root: classes.itemText
                    }}>{name}</ListItemText>
                </ListItem>
            }
        </>
    );
} 
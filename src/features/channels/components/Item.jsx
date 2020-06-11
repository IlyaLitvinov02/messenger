import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Badge,
    Fab,
    ListItemSecondaryAction,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';



export const Item = ({
    chatId,
    photoURL,
    lastMessage,
    email,
    newMessagesCount,
    name,
    onClick
}) => <ListItem>
        <ListItemAvatar>
            <Avatar src={photoURL} />
        </ListItemAvatar>
        <ListItemText
            primary={name}
            secondary={lastMessage ? lastMessage.substring(0, 20) : email} />
        {newMessagesCount
            ?
            <Badge badgeContent={newMessagesCount} color='secondary' />
            :
            !chatId
            &&
            <ListItemSecondaryAction>
                <Fab size='small' onClick={onClick}>
                    <PersonAddIcon color='primary' fontSize='small' />
                </Fab>
            </ListItemSecondaryAction>}
    </ListItem>
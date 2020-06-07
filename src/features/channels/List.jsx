import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannelsList, createChat, setError, getMyChats } from './reducer';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Badge,
    Fab,
    ListItemSecondaryAction,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />



const Item = ({
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
        <ListItemText primary={name} secondary={lastMessage || email} />
        {newMessagesCount
            ?
            <Badge badgeContent={newMessagesCount} color='secondary' />
            :
            !chatId
            &&
            <ListItemSecondaryAction>
                <Fab size='small' onClick={onClick}>
                    <MoreHorizIcon color='primary' fontSize='small' />
                </Fab>
            </ListItemSecondaryAction>}
    </ListItem>




export const ChannelsList = () => {
    const dispatch = useDispatch();
    const channelsList = useSelector(state => state.channels.channelsList);
    const error = useSelector(state => state.channels.error);
    const authUserInfo = useSelector(state => state.auth.currentUser)

    const handleClick = userInfo => {
        dispatch(createChat(authUserInfo, userInfo));
    }

    const handleClose = () => {
        dispatch(setError(undefined));
    }

    useEffect(() => {
        dispatch(getMyChats())
    }, [dispatch]);

    return <List>
        <Snackbar
            open={!!error}
            autoHideDuration={5000}
            onClose={handleClose}>
            <Alert severity='error'>{error}</Alert>
        </Snackbar>
        {channelsList.map(channel =>
            channel.chatId
                ? <NavLink
                    to={channel.chatId}
                    key={channel.chatId}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <Item
                        chatId={channel.chatId}
                        photoURL={channel.photoURL}
                        lastMessage={channel.lastMessage}
                        newMessagesCount={channel.newMessagesCount}
                        name={channel.name} />
                </NavLink>
                : <Item
                    photoURL={channel.photoURL}
                    email={channel.email}
                    name={channel.name}
                    onClick={() => {
                        handleClick(channel);
                    }}
                    key={channel.uid} />
        ).reverse()}
    </List>
}
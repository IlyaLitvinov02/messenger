import React, { useEffect } from 'react';
import { subscribeOnMessages, unsubscribeOffMessages } from '../../reducer';
import { animateScroll as scroll, } from 'react-scroll'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles.module.css';
import {
    Chip,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@material-ui/core';
import { useStyles } from './styles';



export const ChatBody = () => {
    const {
        uid: currentUserId,
        photoURL: currentUserPhotoURL
    } = useSelector(state => state.auth.currentUser);
    const companionPhotoURL = useSelector(state => state.chat.currentChat.photoURL);
    const messages = useSelector(state => state.chat.messages);
    const { chatId } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (chatId) {
            dispatch(subscribeOnMessages(chatId));
            return () => {
                dispatch(unsubscribeOffMessages(chatId));
            }
        }
    }, [chatId, dispatch]);

    useEffect(() => {
        scroll.scrollToBottom({ containerId: 'scrollContainer', duration: 200 });
    });



    return (
        <div className={styles.messagesWrap} id='scrollContainer'>
            {messages && messages.map(message =>
                <ListItem key={message.messageId}>
                    {message.senderId === currentUserId
                        ? <>
                            <ListItemAvatar>
                                <Avatar src={currentUserPhotoURL} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Chip label={message.body} className={classes.message} />
                            </ListItemText>
                        </>
                        : <>
                            <ListItemAvatar>
                                <Avatar src={companionPhotoURL} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Chip variant="outlined" label={message.body} className={classes.message} />
                            </ListItemText>
                        </>
                    }
                </ListItem>
            )}
        </div>
    );
} 
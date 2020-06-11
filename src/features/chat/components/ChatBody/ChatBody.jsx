import React, { useEffect } from 'react';
import { subscribeOnMessages, unsubscribeOffMessages } from '../../reducer';
import { animateScroll as scroll, } from 'react-scroll'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { ListItem, List, ListSubheader, Chip } from '@material-ui/core';
import { resetNewMessagesCount } from '../../../channels/reducer';
import { Message } from './components/Message';
import moment from "moment";



const groupByDate = array => [{}, ...array].reduce((obj, item) => {
    const date = moment(new Date(item.timestamp)).format('MMMM D');
    const objDay = obj[date] ? obj[date] : [];
    return {
        ...obj,
        [date]: [...objDay, item]
    };
});


export const ChatBody = () => {
    const {
        uid: currentUserId,
        photoURL: currentUserPhotoURL
    } = useSelector(state => state.auth.currentUser);
    const companionPhotoURL = useSelector(state => state.chat.currentChat.photoURL);
    const messages = useSelector(state => state.chat.messages);
    const { chatId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (chatId) {
            dispatch(subscribeOnMessages(chatId));
            return () => {
                dispatch(unsubscribeOffMessages(chatId, currentUserId));
            }
        }
    }, [chatId, currentUserId, dispatch]);

    useEffect(() => {
        dispatch(resetNewMessagesCount(chatId));
    });

    useEffect(() => {
        scroll.scrollToBottom({ containerId: 'scrollContainer', duration: 200 });
    });

    const messagesObject = groupByDate(messages);
    const messagesObjectKeys = Object.keys(messagesObject);

    return (
        <div className={styles.messagesWrap} id='scrollContainer'>
            {messagesObjectKeys.map(key =>
                <List key={key}>
                    <ListSubheader classes={{root: styles.subheader}}>
                        <Chip label={key} />
                    </ListSubheader>
                    {messagesObject[key].map(message =>
                        <ListItem key={message.messageId}>
                            <Message
                                variant={
                                    message.senderId === currentUserId
                                        ? 'filled'
                                        : 'outlined'
                                }
                                avatarURL={
                                    message.senderId === currentUserId
                                        ? currentUserPhotoURL
                                        : companionPhotoURL
                                }
                                imageURL={message.imageUrl}
                                body={message.body}
                                timestamp={message.timestamp} />
                        </ListItem>
                    )}
                </List>
            )}
        </div >
    );
} 
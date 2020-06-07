import React, { useState, useEffect } from 'react';
import { Fab, TextareaAutosize, Toolbar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, setCurrentChat } from './reducer';


export const Chat = () => {
    const { chatId } = useParams();
    const [newMessageBody, setNewMessageBody] = useState('');
    const currentUserId = useSelector(state => state.auth.currentUser.uid);
    const channelsList = useSelector(state => state.channels.channelsList);
    const companionId = useSelector(state => state.chat.currentChat.companionId)

    const dispatch = useDispatch();

    useEffect(() => {
        const currentChat = channelsList.filter(chat => chat.chatId === chatId);
        dispatch(setCurrentChat(currentChat[0] || {}));
    }, [chatId, channelsList, dispatch]);

    const handleClick = () => {
        dispatch(sendMessage(chatId, currentUserId, companionId, newMessageBody));
    }

    const handleChange = ({ target: { value } }) => {
        setNewMessageBody(value);
    }

    return (
        <>
            <div className={styles.messagesWrap}>
                messages
            </div>
            <div className={styles.inputWrap}>
                <Toolbar>
                    <TextareaAutosize variant='outlined' value={newMessageBody} onChange={handleChange} />
                    <Fab onClick={handleClick}>
                        <SendIcon />
                    </Fab>
                </Toolbar>
            </div>
        </>
    );
}
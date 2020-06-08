import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBody } from './components/ChatBody/ChatBody';
import { setCurrentChat } from './reducer';
import { MessagesInput } from './components/MessagesInput/MessagesInput';
import { Chip } from '@material-ui/core';
import styles from './styles.module.css';

export const Chat = () => {
    const channelsList = useSelector(state => state.channels.channelsList);
    const currentChatId = useSelector(state => state.chat.currentChat.chatId);
    const dispatch = useDispatch();
    const { chatId } = useParams();


    useEffect(() => {
        const currentChat = channelsList.filter(chat => chat.chatId === chatId);
        dispatch(setCurrentChat(currentChat[0] || {}));
    }, [chatId, channelsList, dispatch]);


    return (
        currentChatId
            ? <>
                <ChatBody />
                <MessagesInput />
            </>
            : <div className={styles.selectChatMessage}>
                <Chip label='Please, select chat to start messaging' />
            </div>
    );
}
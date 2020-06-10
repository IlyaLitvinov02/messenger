import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Fab,
    TextareaAutosize,
    Toolbar,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import styles from '../../styles.module.css';
import { sendMessage } from '../../reducer';
import { useStyles } from './styles';


export const MessagesInput = () => {
    const companionId = useSelector(state => state.chat.currentChat.companionId);
    const dispatch = useDispatch();
    const { chatId } = useParams();

    const classes = useStyles();

    const [newMessageBody, setNewMessageBody] = useState('');


    const handleClick = () => {
        dispatch(sendMessage(chatId, companionId, newMessageBody));
        setNewMessageBody('');
    }

    const handleChange = ({ target: { value } }) => {
        setNewMessageBody(value);
    }

    return (
        <div className={styles.inputWrap}>
            <Toolbar>
                <TextareaAutosize
                    className={classes.textarea}
                    value={newMessageBody}
                    onChange={handleChange}
                    rowsMax={3}
                    placeholder='Write a message...'
                 />
                <Fab onClick={handleClick}>
                    <SendIcon />
                </Fab>
            </Toolbar>
        </div>
    );
}
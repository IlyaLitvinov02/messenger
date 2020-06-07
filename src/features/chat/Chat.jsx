import React from 'react';
import { Fab, TextareaAutosize, Toolbar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import styles from './styles.module.css';


export const Chat = () => {

    return (
        <>
            <div className={styles.messagesWrap}>
                messages
            </div>
            <div className={styles.inputWrap}>
                <Toolbar>
                    <TextareaAutosize variant='outlined' />
                    <Fab>
                        <SendIcon />
                    </Fab>
                </Toolbar>
            </div>
        </>
    );
}
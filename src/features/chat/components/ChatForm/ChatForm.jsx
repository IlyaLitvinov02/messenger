import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    TextareaAutosize,
    Toolbar,
    IconButton,
    Chip,
    CircularProgress
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import styles from '../../styles.module.css';
import { sendMessage } from '../../reducer';
import { useStyles } from './styles';
import { useForm } from 'react-hook-form';
import { setIsTyping } from '../../../channels/reducer';
import { useEffect } from 'react';
import { useCallback } from 'react';



const useDebounce = (callback, delay) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            callback();
        }, delay);
        return () => clearTimeout(timer);
    }, [value, delay, callback]);

    return setValue;
}


export const ChatForm = () => {
    const companionId = useSelector(state => state.chat.currentChat.companionId);
    const isImageUploading = useSelector(state => state.chat.isImageUploading);
    const dispatch = useDispatch();
    const { chatId } = useParams();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm();
    const classes = useStyles();
    const [image, setImage] = useState(undefined);

    const setUserIsTyping = useCallback(isTyping =>
        dispatch(setIsTyping(chatId, companionId, isTyping)),
        [chatId, companionId, dispatch]);

    const debounce = useDebounce(() => {
        setUserIsTyping(false);
    }, 2000);


    const handleFileChange = ({ target }) => {
        const uploadFile = target.files[0];
        const image = uploadFile.type.split('/')[0] === 'image' ? uploadFile : undefined;
        setImage(image);
    }

    const onSubmit = async ({ message }) => {
        if (message || image) {
            await setUserIsTyping(false);
            const result = await dispatch(sendMessage(chatId, companionId, message, image));
            reset(result);
            setImage(undefined);
        }
    }

    const handleKeyDown = event => {
        if (!isSubmitting && event.ctrlKey && event.key === 'Enter') handleSubmit(onSubmit)();
    }

    const handleChange = () => {
        setUserIsTyping(true);
        debounce(watch('message'));
    }

    return (
        <div className={styles.inputWrap}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Toolbar>
                    <TextareaAutosize
                        name='message'
                        ref={register}
                        className={classes.textarea}
                        rowsMax={3}
                        placeholder='Write a message...'
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        onBlur={() => setUserIsTyping(false)}
                    />
                    {image &&
                        <Chip label={image.name} onDelete={() => { setImage(undefined) }} />}
                    <IconButton component='label'>
                        <AddPhotoIcon />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange} />
                    </IconButton>
                    {isImageUploading
                        ? <CircularProgress />
                        : <IconButton type='submit'>
                            <SendIcon />
                        </IconButton>
                    }
                </Toolbar>
            </form>
        </div>
    );
}
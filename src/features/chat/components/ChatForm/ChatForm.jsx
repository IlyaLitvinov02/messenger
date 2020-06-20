import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Toolbar,
    IconButton,
    Chip,
    CircularProgress
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import styles from '../../styles.module.css';
import { sendMessage } from '../../reducer';
import { setIsTyping } from '../../../channels/reducer';
import { RTEditor } from './RTEditor/RTEditor';
import { EditorState, convertToRaw } from 'draft-js';



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
    const [image, setImage] = useState(undefined);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [newMessageBody, setNewMessageBody] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setUserIsTyping = useCallback(isTyping =>
        dispatch(setIsTyping(chatId, companionId, isTyping)),
        [chatId, companionId, dispatch]);

    const debounce = useDebounce(() => {
        setUserIsTyping(false);
    }, 2000);

    const reset = () => {
        setEditorState(EditorState.createEmpty());
        if (newMessageBody) setNewMessageBody(undefined);
        if (image) setImage(undefined);
    }

    const handleFileChange = ({ target }) => {
        const uploadFile = target.files[0];
        const image = uploadFile.type.split('/')[0] === 'image' ? uploadFile : undefined;
        setImage(image);
    }

    const handleSubmit = async () => {
        if (!isSubmitting && (newMessageBody || image)) {
            setIsSubmitting(true);
            await dispatch(sendMessage(chatId, companionId, newMessageBody, image));
            reset();
            setUserIsTyping(false);
            setIsSubmitting(false);
        }
    }

    const handleChange = newEditorState => {
        setEditorState(newEditorState);
        const value = convertToRaw(newEditorState.getCurrentContent());
        debounce(value);
        setNewMessageBody(value);
        setUserIsTyping(true);
    }


    return (
        <div className={styles.inputWrap}>
            <Toolbar>
                <RTEditor
                    onChange={handleChange}
                    onCtrlEnter={handleSubmit}
                    onBlur={() => setUserIsTyping(false)}
                    placeholder='Write a message...'
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
                {image &&
                    <Chip label={image.name} onDelete={() => { setImage(undefined) }} />
                }
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
                    : <IconButton onClick={handleSubmit}>
                        <SendIcon />
                    </IconButton>
                }
            </Toolbar>
        </div>
    );
}
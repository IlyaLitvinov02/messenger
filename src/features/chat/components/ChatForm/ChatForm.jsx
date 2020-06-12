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



export const ChatForm = () => {
    const companionId = useSelector(state => state.chat.currentChat.companionId);
    const isImageUploading = useSelector(state => state.chat.isImageUploading);
    const dispatch = useDispatch();
    const { chatId } = useParams();
    const { register, handleSubmit, reset } = useForm();

    const classes = useStyles();

    const [image, setImage] = useState(undefined);

    const handleFileChange = ({ target }) => {
        const uploadFile = target.files[0];
        const image = uploadFile.type.split('/')[0] === 'image' ? uploadFile : undefined;
        setImage(image);
    }

    const onSubmit = async ({ message }) => {
        if (message || image) {
            const result = await dispatch(sendMessage(chatId, companionId, message, image));
            reset(result);
            setImage(undefined)
        }
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
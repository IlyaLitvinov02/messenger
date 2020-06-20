import React from 'react';
import { ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import styles from '../styles.module.css';
import moment from "moment";
import { Editor, convertFromRaw, EditorState } from 'draft-js';

export const Message = ({
    avatarURL,
    imageURL,
    body,
    variant,
    timestamp
}) => {

    const date = new Date(timestamp);
    const time = moment(date).format('LT');
    const content = typeof body === "object"
        ? convertFromRaw({
            ...body,
            entityMap: body.entityMap || {}
        })
        : undefined;
    const editorState = content ? EditorState.createWithContent(content) : undefined;

    return <>
        <ListItemAvatar>
            <Avatar src={avatarURL} />
        </ListItemAvatar>
        <ListItemText>
            <div className={`${styles.message} ${variant ? styles[variant] : styles.outlined}`}>
                {imageURL &&
                    <div>
                        <img src={imageURL} alt='' className={styles.messageImage} />
                    </div>
                }
                <div>
                    {editorState
                        ? <Editor editorState={editorState} readOnly={true} />
                        : body
                    }
                </div>
            </div>
            <div className={styles.messageTime}>
                <span>{time}</span>
            </div>
        </ListItemText>
    </>
}
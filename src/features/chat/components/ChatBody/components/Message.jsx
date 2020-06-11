import React from 'react';
import { ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction } from '@material-ui/core';
import styles from '../styles.module.css';
import moment from "moment";

export const Message = ({
    avatarURL,
    imageURL,
    body,
    variant,
    timestamp
}) => {

    const date = new Date(timestamp);
    const time = moment(date).format('LT');


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
                    {body}
                </div>
            </div>
            <div className={styles.messageTime}>
                <span>{time}</span>
            </div>
        </ListItemText>
    </>
}
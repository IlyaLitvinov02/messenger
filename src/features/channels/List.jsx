import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannelsList } from './reducer';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Badge } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';



const channels = [

];

export const ChannelsList = () => {
    const dispatch = useDispatch();
    const channelsList = useSelector(state => state.channels.channelsList);


    useEffect(() => {
        dispatch(setChannelsList(channels))
    }, [dispatch]);

    return <List>
        {channelsList.map(channel =>
            <NavLink
                to={channel.uid}
                key={channel.uid}
                className={styles.link}
                activeClassName={styles.activeLink}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={channel.photoURL}/>
                    </ListItemAvatar>
                    <ListItemText>
                        {channel.name}
                    </ListItemText>
                    <Badge badgeContent={channel.newMessagesCount} color='secondary' />
                </ListItem>
            </NavLink>
        )}
    </List>
}
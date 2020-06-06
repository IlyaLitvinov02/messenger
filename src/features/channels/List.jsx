import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannelsList } from './reducer';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Badge } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';



const channels = [
    {
        channelId: 1,
        channelName: 'Nunenaaado',
        channelAvatar: null,
        newMessagesCount: 1
    },
    {
        channelId: 2,
        channelName: 'tawerka',
        channelAvatar: null,
        newMessagesCount: 5
    },
    {
        channelId: 3,
        channelName: 'Dimon',
        channelAvatar: null,
        newMessagesCount: 8
    },
    {
        channelId: 4,
        channelName: 'Way of samurai',
        channelAvatar: null,
        newMessagesCount: null
    },
    {
        channelId: 5,
        channelName: 'Ylylyk',
        channelAvatar: null,
        newMessagesCount: 1
    },
    {
        channelId: 6,
        channelName: 'Bakirov',
        channelAvatar: null,
        newMessagesCount: 23
    },
    {
        channelId: 7,
        channelName: 'Мякиш',
        channelAvatar: null,
        newMessagesCount: 1
    }
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
                to={channel.channelName}
                key={channel.channelId}
                className={styles.link}
                activeClassName={styles.activeLink}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText>
                        {channel.channelName}
                    </ListItemText>
                    <Badge badgeContent={channel.newMessagesCount} color='secondary' />
                </ListItem>
            </NavLink>
        )}
    </List>
}
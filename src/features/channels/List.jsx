import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, subscribeOnChats, unsubscribeOffChats } from './reducer';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import { setSearchMode } from '../search/reducer';
import { Item } from './components/Item';








export const ChannelsList = () => {
    const dispatch = useDispatch();
    const channelsList = useSelector(state => state.channels.channelsList);
    const authUserInfo = useSelector(state => state.auth.currentUser);
    const currentUserId = authUserInfo.uid;
    const { searchMode, searchResults } = useSelector(state => state.search);

    useEffect(() => {
        if (!searchMode) {
            dispatch(subscribeOnChats());
            return () => {
                dispatch(unsubscribeOffChats(currentUserId));
            }
        }
    }, [searchMode, currentUserId, dispatch]);


    const handleClick = userInfo => {
        dispatch(createChat(authUserInfo, userInfo));
        dispatch(setSearchMode(false))
    }


    return (
        <List>
            {searchMode
                ? <>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton onClick={() => { dispatch(setSearchMode(false)) }}>
                                <ArrowBackIcon color='primary' />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText>
                            Back to chat list
                    </ListItemText>
                    </ListItem>
                    {searchResults.map(result =>
                        <Item
                            photoURL={result.photoURL}
                            email={result.email}
                            name={result.name}
                            onClick={() => {
                                handleClick(result);
                            }}
                            key={result.uid} />
                    )}
                </>
                : channelsList.map(channel =>
                    channel.chatId
                    && <NavLink
                        to={`/main/${channel.chatId}`}
                        key={channel.chatId}
                        className={styles.link}
                        activeClassName={styles.activeLink}
                    >
                        <Item
                            chatId={channel.chatId}
                            photoURL={channel.photoURL}
                            lastMessage={channel.lastMessage}
                            isTyping={channel.isCompanionTyping}
                            newMessagesCount={channel.newMessagesCount}
                            name={channel.name} />
                    </NavLink>
                ).reverse()
            }
        </List>
    );
}
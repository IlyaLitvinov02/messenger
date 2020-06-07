import React, { useState } from 'react';
import { AppBar, Drawer, Divider, IconButton, Hidden, Toolbar } from '@material-ui/core';
import { useStyles } from './styles';
import { ChannelsList } from '../../features/channels/List';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from '../../features/menu/Menu';
import { Chat } from '../../features/chat/Chat';
import { SearchBar } from '../../features/channels/SearchBar';



export const Messenger = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);



    if (!isAuth) return <Redirect to='/login' />
    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Menu />
                </Toolbar>
            </AppBar>
            <div>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={() => { setMobileOpen(false) }}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <SearchBar />
                        </div>
                        <Divider />
                        <ChannelsList />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <div className={classes.drawerHeader}>
                            <SearchBar />
                        </div>
                        <Divider />
                        <ChannelsList />
                    </Drawer>
                </Hidden>

                <AppBar className={classes.chatHeader}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => { setMobileOpen(true) }}
                            className={classes.menuButton}
                        >
                            <MenuIcon color='primary' />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <Chat />
                </main>
            </div>
        </>
    );
}
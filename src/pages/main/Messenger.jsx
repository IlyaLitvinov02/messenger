import React, { useState } from 'react';
import { AppBar, Drawer, Divider, IconButton, Hidden, Toolbar } from '@material-ui/core';
import { useStyles } from './styles';
import { ChannelsList } from '../../features/channels/List';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from '../../features/menu/Menu';


export const Messenger = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const classes = useStyles();
    const [menuOpened, setMenuOpened] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);


    if (!isAuth) return <Redirect to='/login' />
    return (
        <>
            <Drawer
                variant='temporary'
                open={menuOpened}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
                onBackdropClick={() => { setMenuOpened(false) }}
            >
                <Menu />
            </Drawer>

            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => { setMobileOpen(false) }}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={() => { setMenuOpened(true) }}>
                            <MenuIcon />
                        </IconButton>
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
                        <IconButton onClick={() => { setMenuOpened(true) }}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <ChannelsList />
                </Drawer>
            </Hidden>

            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => { setMobileOpen(true) }}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>

            </main>
        </>
    );
}
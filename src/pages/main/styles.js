import { makeStyles } from "@material-ui/core";


const drawerWidth = 260,
    drawerHeaderHeight = 60,
    appBarHeight = 64,
    drawerHeight = `calc(100% - ${appBarHeight - 1}px)`;


export const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        height: drawerHeight
    },

    drawerPaper: {
        width: drawerWidth,
        height: drawerHeight,
        top: appBarHeight + 1
    },

    drawerHeader: {
        height: drawerHeaderHeight,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1)
    },

    appBar: {
        height: appBarHeight,
        backgroundColor: '#fff',
    },

    chatHeader: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        backgroundColor: '#fff',
        boxShadow: 1,
        height: drawerHeaderHeight,
        top: appBarHeight + 1
    },

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },


    content: {
        height: `calc(100% - ${drawerHeaderHeight + appBarHeight + 1}px)`,
        position: 'fixed',
        width: '98%',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            left: drawerWidth,
        },
        top: drawerHeaderHeight + appBarHeight + 1
    },
}));
import { makeStyles } from "@material-ui/core";


const drawerWidth = 260,
    appBarHeight = 60;

export const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },

    drawerPaper: {
        width: drawerWidth
    },

    drawerHeader: {
        height: appBarHeight,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1)
    },

    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        height: appBarHeight,
        backgroundColor: '#e8eaf6',
    },

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
    },
}));
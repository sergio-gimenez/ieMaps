import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function getKeys(data) {
    return (
        Object.keys(data).map(key => (
            <ListItem button>
                <ListItemText primary={key} secondary={data[key]} />
            </ListItem>
        ))
    )
}

export default function SimpleList(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List >
                {getKeys(props.data)}
            </List>
        </div>
    );
}


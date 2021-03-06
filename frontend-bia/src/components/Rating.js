import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    textField: {
        margin: theme.spacing(2),
    },
}));

export default function Rating(props) {

    const classes = useStyles();

    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Enunciado"
                multiline
                rows="2"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(e) => props.changeQuestion(e.target.value)}

            />
        </div>
    );
}
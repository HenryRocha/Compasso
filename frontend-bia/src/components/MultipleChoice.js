import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    textField: {
        margin: theme.spacing(2),
    },
}));

export default function MultipleChoice(props) {

    const classes = useStyles();

    const titleStyle = {
        color: "black",
        backgroundColor: null,
        padding: "20px",
        fontFamily: "Arial",
        textAlign: "center",
        fontSize: "20px"
      };


    return (
        <div>
            <Grid item xs container direction="row" spacing={2} style={titleStyle} >
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
            </Grid>
            <TextField
                id="outlined-multiline-static"
                label="A"
                multiline
                rows="2"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(e) => props.changeChoiceA(e.target.value)}

            />
            <TextField
                id="outlined-multiline-static"
                label="B"
                multiline
                rows="2"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(e) => props.changeChoiceB(e.target.value)}
            />
            <TextField
                id="outlined-multiline-static"
                label="C"
                multiline
                rows="2"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(e) => props.changeChoiceC(e.target.value)}
            />
            <TextField
                id="outlined-multiline-static"
                label="D"
                multiline
                rows="2"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(e) => props.changeChoiceD(e.target.value)}
            />
        </div>
    );
}
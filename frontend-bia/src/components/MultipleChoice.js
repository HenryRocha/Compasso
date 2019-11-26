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

    const [quiz, setQuiz] = React.useState({
        question: "",
        choices: [],
        answers: [],
        type: ""
    });

    const classes = useStyles();

    const titleStyle = {
        color: "black",
        backgroundColor: null,
        padding: "20px",
        fontFamily: "Arial",
        textAlign: "center",
        fontSize: "20px"
      };

    const onHandleChange = (event)=>{
        setQuiz({
            answer:event.target.value
        });
    }

    const onChangeQuestion = (event) =>{
        onHandleChange(event)
        // props.changeQuestion(quiz.question)
    }

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
                // onInput={onChangeQuestion}
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
            />
        </div>
    );
}
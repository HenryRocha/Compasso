import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    textField: {
        margin: theme.spacing(2),
    },
}));

export default function Preview(props) {

    const classes = useStyles();

    const titleStyle = {
        color: "black",
        backgroundColor: null,
        padding: "20px",
        fontFamily: "Arial",
        textAlign: "center",
        fontSize: "20px"
    };

    const { changePreview } = props;

    return (
        <div>
            {changePreview.length != 0 ?
            changePreview.map((a, i) => (
                <Grid item xs container direction="row" spacing={2} style={titleStyle} >
                    <Grid item xs container direction="row" spacing={5} style={titleStyle} >
                        <Typography
                            style={titleStyle}
                        >{a.question}</Typography>

                        <TextField
                            id="tipo"
                            label="Tipo"
                            multiline
                            rows="2"
                            defaultValue={a.type}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button onClick={null} color="primary">
                            Editar
                    </Button>
                        <Button onClick={null} color="primary">
                            Deletar
                    </Button>
                    </Grid>
                </Grid>
            ))
                : console.log(null)
            }
        </div>
    );
}
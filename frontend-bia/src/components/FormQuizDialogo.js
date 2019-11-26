import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Short from '../components/Short'
import Rating from '../components/Rating'
import MultipleChoice from '../components/MultipleChoice'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [quiz, setQuiz] = React.useState({
        question: "",
        choices: [],
        answers: [],
        type: ""
    });
    const [quizzes, setQuizzes] = React.useState({
        title: "",
        description: "",
        questions: [],
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    const handleChange = event => {
        setValue(event.target.value);
    };
    const handleSubmit = event => {
        if (quiz) {
            setQuizzes(quizzes.questions.concat(quiz));
        }
        setQuiz({
            question: "",
            choices: [],
            answers: [],
            type: ""
        });
        event.preventDefault();
    };

    const changeQuestion = newQuestion => {
        setQuiz({
            question: newQuestion
        });
        handleSubmit()
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                ADICIONAR QUESTÃO
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Tipo da pergunta:</DialogTitle>
                <DialogContent>
                    <FormControl required component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">marque uma opção</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel control={<Radio />} value="Multipla escolha" label="Multiple choice" />
                            <FormControlLabel control={<Radio />} value="Resposta Curta" label="Resposta curta" />
                            <FormControlLabel control={<Radio />} value="Rating" label="Rating" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                {value === "Multipla escolha" ?
                    <MultipleChoice
                        // changeQuestion={changeQuestion.bind(this)}
                    /> : (
                        value === "Resposta Curta" ?
                            <Short></Short> : (
                                value === "Rating" ?
                                    <Rating></Rating> : null
                            ))}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
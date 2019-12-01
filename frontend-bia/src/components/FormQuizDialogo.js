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
    const [A, setA] = React.useState('');
    const [B, setB] = React.useState('');
    const [C, setC] = React.useState('');
    const [D, setD] = React.useState('');
    const [quiz, setQuiz] = React.useState({
        question: "",
        choices: [],
        answers: [],
        type: ""
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
    const handleSubmit = () => {
        console.log(quiz.question)
        props.changeQuizzes(quiz)
        handleClose()
    };
    const changeChoices = () => {
        if (A !== '' && B !== '' && C !== '' && D !== '') {
            let localChoices = []
            localChoices.push(A, B, C, D);
            setQuiz({
                question: quiz.question,
                choices: localChoices,
                type: quiz.type
            });
            console.log('Entrou em Choices')
        }
    }

    // Multiple
    const changeMQuestion = newQuestion => {
        console.log("Entrou Question")
        setQuiz({
            question: newQuestion,
            type: "Multipla escolha"
        });
    }
    const changeMChoiceA = newChoiceA => {
        console.log("Entrou A")
        setA(newChoiceA);
        changeChoices();
    }
    const changeMChoiceB = newChoiceB => {
        console.log("Entrou B")
        setB(newChoiceB);
        changeChoices();
    }
    const changeMChoiceC = newChoiceC => {
        console.log("Entrou C")
        setC(newChoiceC);
        changeChoices();
    }
    const changeMChoiceD = newChoiceD => {
        console.log("Entrou D")
        setD(newChoiceD);
        changeChoices();
    }

    // Short
    const changeSQuestion = newQuestion => {
        console.log("Entrou Question")
        setQuiz({
            question: newQuestion,
            type: "Resposta curta"
        });
    }
    // Rating
    const changeRQuestion = newQuestion => {
        console.log("Entrou Question")
        setQuiz({
            question: newQuestion,
            type: "Rating"
        });
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
                        changeQuestion={changeMQuestion.bind(this)}
                        changeChoiceA={changeMChoiceA.bind(this)}
                        changeChoiceB={changeMChoiceB.bind(this)}
                        changeChoiceC={changeMChoiceC.bind(this)}
                        changeChoiceD={changeMChoiceD.bind(this)}
                    /> : (
                        value === "Resposta Curta" ?
                            <Short
                                changeQuestion={changeSQuestion.bind(this)}
                            /> : (
                                value === "Rating" ?
                                    <Rating
                                        changeQuestion={changeRQuestion.bind(this)}
                                    /> : null
                            ))}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
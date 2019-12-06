import React from 'react';
import ReactDOM from 'react-dom';
import TextField from "@material-ui/core/TextField";
import { bindActionCreators } from "redux";
import actions from "../actions";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import FormQuizDialogo from '../components/FormQuizDialogo'
import Preview from '../components/Preview';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    textField: {
        margin: theme.spacing(2),
    },
}));

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => bindActionCreators({
  postQuiz: actions.postQuiz
}, dispatch);

class QuizzesCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      questions: [],
    };

    this.quiz = {
      question: "",
      choices: [],
      answers: [],
      type: ""
    };
  }

  saveQuiz(e) {
    console.log(e)
    this.state.questions.push(e);
    console.log(this.state)
  }

  async handleSaveTemplate(e) {
    this.props.history.push("/dash");
    //GET não esta funcionando
    // var apiBaseUrl = 'https://ec2-3-83-147-131.compute-1.amazonaws.com/';
    // await axios.post(apiBaseUrl + 'template', this.state)
    //   .then(function (response) {
    //     this.props.history.push("/dash");
    //   })
  }
  render() {

    const titleStyle = {
      color: "black",
      backgroundColor: null,
      padding: "20px",
      fontFamily: "Arial",
      textAlign: "center",
      fontSize: "20px"
    };

    const previewElement = <Preview
      changePreview={this.state.questions}
    />

    return (
      <div>
        <TextField
          label="Nome do Template"
          style={{ margin: 7 }}
          fullWidth
          margin="normal"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <TextField
          label="Descrição do Projeto"
          style={{ margin: 7 }}
          fullWidth
          margin="normal"
          onChange={e => this.setState({ description: e.target.value })}
        />
        <Grid item xs container direction="row" spacing={2} style={titleStyle} >
          <FormQuizDialogo
            saveQuiz={(e) => this.saveQuiz(e)}
            title={this.state.title}
            description={this.state.description}
          />
        </Grid>
        {!this.state.questions.length === 0 ?
          this.state.questions.map((a, i) => (
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
          : null
        }
        <center>
          <Button variant="outlined" color="primary" onClick={e => this.handleSaveTemplate(e)}>
            Enviar!
      </Button>
        </center>
      </div>

    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizzesCreate);
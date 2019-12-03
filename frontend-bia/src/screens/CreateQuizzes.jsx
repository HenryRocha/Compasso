import React from 'react';
import ReactDOM from 'react-dom';
import TextField from "@material-ui/core/TextField";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import FormQuizDialogo from '../components/FormQuizDialogo'
import Preview from '../components/Preview';
import axios from 'axios';

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

  componentDidMount() {
    fetch('/templates')
      .then(res => res.json())
      .then((response) => {
        console.log("response", response);
        this.setState({
          title: response.title,
          description: response.description,
          questions: response.questions
        });
        console.log("fetchQuestions", this.state.questions);
      }, (error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    fetch('/template', {
      method: 'post',
      body: JSON.stringify(this.state)
    }).then(function (response) {
      return response.json();
    });
  }

  saveQuiz() {
    this.state.questions.push(this.quiz)
    console.log(this.state)
  }
  changeQuizzes(event) {
    console.log("CreateQuizzes")
    console.log(event.question)
    this.quiz.question = event.question
    this.quiz.choices = event.choices
    this.quiz.type = event.type
    console.log(this.quiz)
    this.saveQuiz()
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
          id="nome-novo-template"
          label="Nome do Template"
          style={{ margin: 7 }}
          placeholder=""
          fullWidth
          margin="normal"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <Grid item xs container direction="row" spacing={2} style={titleStyle} >
          <FormQuizDialogo
            changeQuizzes={(e) => this.changeQuizzes(e)}
          />
        </Grid>
        <Preview/>
      </div>

    );
  }
}

export default connect()(QuizzesCreate);
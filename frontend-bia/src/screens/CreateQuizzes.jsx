import React from 'react';
import TextField from "@material-ui/core/TextField";
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import FormQuizDialogo from '../components/FormQuizDialogo'
import Preview from '../components/Preview';

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => bindActionCreators({
  postQuiz: actions.postQuiz
}, dispatch);

class QuizzesCreate extends React.Component {
  constructor(props) {
    super(props);

    this.show = {
      showPreview: true
    };
    this.state = {
      title: "",
      description: "",
      questions: [
        {
          question: "",
          choices: [],
          answers: [],
          type: ""
        }
      ],
    };

    this.quiz = {
      question: "",
      choices: [],
      answers: [],
      type: ""
    };

  }

  // show = {
  //   showPreview: true
  // };
  // quizzes = {
  //   lastQuiz: [],
  //   quizzes: []
  // };
  // state = {
  //   title: "",
  //   description: "",
  //   questions: [
  //     {
  //       question: "",
  //       choices: [],
  //       answers: [],
  //       type: ""
  //     }
  //   ],
  // };



  // togglePopup() {
  //   this.setShow({
  //     showPopup: !this.show.showPopup,
  //     showQuizzes: this.show.showQuizzes
  //   });
  // }

  // showQuizzes() {
  //   this.setShow({
  //     showPopup: this.show.showPopup,
  //     showQuizzes: !this.show.showQuizzes
  //   });
  // }

  saveQuiz(){
        
  }
  changeQuizzes(event) {
    console.log("CreateQuizzes")
    console.log(event.question)
    this.quiz.questions = event.question
    this.quiz.choices = event.choices
    this.quiz.type = event.type
    console.log(this.quiz)
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
    // const buttonStyle = {
    //   margin: 5
    // };
    // const theme = createMuiTheme({
    //   palette: {
    //     secondary: {
    //       main: '#F25C5C'
    //     }
    //   },
    // });

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
        {this.show.showPreview ?
          <Preview></Preview>
          : null
        }
      </div>

    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizzesCreate);
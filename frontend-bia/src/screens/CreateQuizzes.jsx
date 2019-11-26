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
  // constructor(props) {
  //   super(props);
  // }

  show = {
    showPreview: true
  };
  quizzes = {
    lastQuiz: [],
    quizzes: []
  };
  state = {
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

  // saveQuiz(){
  //   this.quizzes.lastQuiz===[] ?
  //   this.setQuizzes({

  //     quizzes:
  //   }):
  // }


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
          id="nome-novo-quiz"
          label="Nome do Quiz"
          style={{ margin: 7 }}
          placeholder=""
          fullWidth
          margin="normal"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <Grid item xs container direction="row" spacing={2} style={titleStyle} >
          <FormQuizDialogo></FormQuizDialogo>
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
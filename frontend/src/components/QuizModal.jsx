import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../css/app.css";
import actions from "../actions";
import { Colors } from "../constants/Colors";

const mapStateToProps = state => ({
  user: state.user,
  quizId: state.quizId,
  quiz:
    state.data.quizzes &&
    state.data.quizzes.find(q => q && q._id === state.quizId)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleQuizModal: actions.toggleQuizModal,
      patchQuizz: actions.patchQuizz
    },
    dispatch
  );

class QuizModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
  }

  componentDidMount = () => {
    let teste = [];
    for (let i = 0; i++; i < this.props.quiz.question.lenght) {
      teste.push("");
    }
    this.setState({ answers: teste });
  };

  onConfirm() {
    const { quiz, patchQuizz } = this.props;
    const { answers } = this.state;
    const oldQuiz = { ...quiz };
    oldQuiz.questions.map((q, i) => {
      q.answers = answers[i];
    });
    oldQuiz.answerDate = true;
    patchQuizz(quiz._id, oldQuiz);
  }

  render() {
    const { quiz, quizId, toggleQuizModal, patchQuizz } = this.props;
    const { answers } = this.state;
    return (
      quizId && (
        <div
          style={{
            backgroundColor: "lightGrey",
            position: "fixed",
            borderRadius: "1rem",
            top: "20%",
            left: "35%",
            padding: "1rem"
          }}
        >
          {quiz.questions.map((q, qi) => (
            <React.Fragment>
              <h1>{qi + 1 + ") " + q.question}</h1>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {q.type === "checkbox" ? (
                  q.choices.map((c, ci) => (
                    <div
                      style={{ borderRadius: "0.5rem", borderColor: "black" }}
                    >
                      <h1
                        style={{
                          marginRight: "0.5rem",
                          marginBottom: "0.5rem",
                          color: c === answers[qi] ? Colors.pink : "black"
                        }}
                        className="hoverPointer"
                        onClick={() => {
                          const oldState = [...answers];
                          oldState[qi] = c;
                          this.setState({ answers: oldState });
                        }}
                      >
                        {c}
                      </h1>
                    </div>
                  ))
                ) : (
                  <input />
                )}
              </div>
            </React.Fragment>
          ))}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1
              className="hoverPointer"
              style={{
                marginRight: "1rem",
                textDecoration: "underline"
              }}
              onClick={() => this.onConfirm()}
            >
              enviar
            </h1>

            <h1
              className="hoverPointer"
              style={{
                textDecoration: "underline"
              }}
              onClick={() => toggleQuizModal(null)}
            >
              cancelar
            </h1>
          </div>
        </div>
      )
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizModal);

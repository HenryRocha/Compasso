import React, { Component } from "react";
import { connect } from "react-redux";
import { Colors } from "../constants/Colors";
import "../css/app.css";
import actions from "../actions";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  quizzes: state.data.quizzes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleQuizModal: actions.toggleQuizModal }, dispatch);

export class Idea extends Component {
  render() {
    const { idea, toggleQuizModal } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          marginRight: "1rem",
          backgroundColor: Colors.pink,
          padding: "0.5rem",
          borderRadius: "0.8rem",
          color: "white"
        }}
      >
        <h1> Ideia: {idea.title}</h1>
        <h1 style={{ fontWeight: "light" }}> Descrição: {idea.description}</h1>

        {this.props.quizzes &&
          idea.quizzes.map(quizId => {
            let quiz = this.props.quizzes.find(
              quiz => quiz && quiz._id === quizId
            );
            if (quiz) {
              return (
                <h1
                  className="hoverUnderline hoverPointer"
                  onClick={() => toggleQuizModal(quiz._id)}
                >
                  {"Quiz: " + quiz.name + " (responder)"}
                </h1>
              );
            }
          })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea);

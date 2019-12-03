import React, { Component } from "react";
import { connect } from "react-redux";

export class Idea extends Component {
    render() {
        const idea = this.props.idea;
        return (
            <div
                style={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    marginTop: "1rem"
                }}
            >
                <h1> Ideia {idea.title}</h1>
                <h1 style={{ fontWeight: "light" }}>
                    {" "}
                    Descricao: {idea.description}
                </h1>

                {this.props.quizzes &&
                    idea.quizzes.map(quizId => {
                        let quiz = this.props.quizzes.find(
                            quiz => quiz._id === quizId
                        );
                        if (quiz) {
                            return <h1>{"Quiz: " + quiz.name}</h1>;
                        } else return null;
                    })}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        quizzes: state.data.quizzes
    };
}

export default connect(mapStateToProps, null)(Idea);

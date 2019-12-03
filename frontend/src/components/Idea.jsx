import React, { Component } from "react";
import { connect } from "react-redux";

export class Idea extends Component {
    render() {
        const idea = this.props.idea;
        return (
            <div style={{ display: "flex", flexFlow: "column nowrap" }}>
                <h1> Ideia {idea.title}</h1>
                <h1 style={{ fontWeight: "light" }}>
                    {" "}
                    Descricao: {idea.description}
                </h1>
                {idea.quizzes.map(quizId => {
                    let quiz = this.props.quizzes.find(
                        element => element._id === quizId
                    );
                    if (quiz) {
                        return <h1>AQUI</h1>;
                    } else return <h1>RUIM</h1>;
                })}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, null)(Idea);

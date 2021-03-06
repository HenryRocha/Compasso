import React from "react";
import "../css/app.css";
import MCQuestion from "./MCQuestion";
import actions from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import store from "../store";
import { Colors } from "../constants/Colors";

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postIdea: actions.postIdea
    },
    dispatch
  );

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }
  render() {
    const { isVisible, onConfirm, user } = this.props;
    const { title, description } = this.state;
    return (
      <div
        style={{
          display: isVisible ? "flex" : "none",
          flexDirection: "column",
          alignSelf: "center",
          width: "27vw"
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <h1>1. Qual o título do projeto?</h1>
          <input
            style={{
              width: "100%",
              border: "none",
              borderBottom: "0.09rem solid black",
              fontSize: "1rem"
            }}
            onChange={e => this.setState({ title: e.target.value })}
            value={title}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <h1>2. Descreva brevemente o projeto</h1>
          <input
            style={{
              width: "100%",
              border: "none",
              borderBottom: "0.09rem solid black",
              fontSize: "1rem"
            }}
            onChange={e => this.setState({ description: e.target.value })}
            value={description}
          />
        </div>
        <div
          className="hoverPointer"
          style={{
            border: `0.09rem solid ${Colors.pink}`,
            borderRadius: "0.5rem",
            justifyContent: "center",
            padding: "0.3rem",
            marginRight: "0.5rem",
            display: "inline-block",
            width: "30%"
          }}
          onClick={() => {
            this.props.postIdea(user.id, user.projectId, title, description);
            onConfirm();
          }}
        >
          <h1
            style={{
              color: Colors.pink
            }}
          >
            Adicionar
          </h1>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

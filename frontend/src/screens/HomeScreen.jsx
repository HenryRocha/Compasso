import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../css/app.css";
import ProjectForm from "../components/ProjectForm";
import { persistor } from "../store";
import actions from "../actions";

const mapStateToProps = state => ({
  ideas: state.data.ideas,
  user: state.user
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
  }
  render() {
    const { showForm } = this.state;
    const { ideas, postIdea, user } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <h1
          className="hoverPointer"
          style={{ marginRight: "1rem" }}
          onClick={() => this.setState({ showForm: true })}
        >
          Adicionar ideia
        </h1>
        <ProjectForm
          isVisible={showForm}
          onConfirm={() => this.setState({ showForm: false })}
        />
        {ideas && ideas.map((idea, i) => <div> Ideia {idea.idea.title}</div>)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

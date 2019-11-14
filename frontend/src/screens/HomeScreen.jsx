import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../css/app.css";
import ProjectForm from "../components/ProjectForm";
import { persistor } from "../store";

const mapStateToProps = state => ({
  projects: state.data.projects
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
    const { projects } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <h1
          className="hoverPointer"
          style={{ marginRight: "1rem" }}
          onClick={() => this.setState({ showForm: true })}
        >
          Adicionar projeto
        </h1>
        <ProjectForm
          isVisible={showForm}
          onConfirm={() => this.setState({ showForm: false })}
        />
        {projects && projects.map((p, i) => <div> Ideia {p.idea}</div>)}
        <h1 onClick={() => persistor.purge()}>purge</h1>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

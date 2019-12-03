import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../css/app.css";
import ProjectForm from "../components/ProjectForm";
import { Colors } from "../constants/Colors";
import Idea from "../components/Idea";
import QuizModal from "../components/QuizModal";

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
    const { ideas, user } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between"
        }}
      >
        <QuizModal />
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0.8rem"
            }}
          >
            {ideas &&
              ideas.map((idea, i) => (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}
                >
                  <Idea idea={idea} />
                </div>
              ))}

            <div
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-around"
              }}
            >
              <ProjectForm
                isVisible={showForm}
                onConfirm={() => this.setState({ showForm: false })}
              />
              <h1
                className="hoverPointer"
                style={{
                  marginRight: "1rem",
                  backgroundColor: Colors.black,
                  color: "white",
                  borderRadius: "0.3rem",
                  padding: "0.6rem",
                  height: "2.5vh",
                  alignContent: "center",
                  textAlign: "center"
                }}
                onClick={() => this.setState({ showForm: true })}
              >
                Adicionar ideia
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

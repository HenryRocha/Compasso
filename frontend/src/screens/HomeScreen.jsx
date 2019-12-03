import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../css/app.css";
import ProjectForm from "../components/ProjectForm";
import { persistor } from "../store";
import actions from "../actions";
import { Colors } from "../constants/Colors";

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
            <div
                style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    justifyContent: "space-between",
                    marginTop: "3vh"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "flex-start",
                        width: "45vw"
                    }}
                >
                    {ideas &&
                        ideas.map((idea, i) => (
                            <div
                                style={{
                                    width: "10vw",
                                    display: "flex",
                                    flexFlow: "row nowrap",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    padding: "0.4rem"
                                }}
                            >
                                <h1> Ideia {idea.idea.title}</h1>
                            </div>
                        ))}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexFlow: "row nowrap",
                        justifyContent: "space-around",
                        width: "45vw"
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
                            backgroundColor: Colors.darkPink,
                            color: "white",
                            borderRadius: "0.3rem",
                            padding: "0.4rem",
                            height: "2.5vh"
                        }}
                        onClick={() => this.setState({ showForm: true })}
                    >
                        Adicionar ideia
                    </h1>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

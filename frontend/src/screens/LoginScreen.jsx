import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../css/app.css";
import actions from "../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { login: actions.login, register: actions.register },
    dispatch
  );

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      token: "",
      isRegistering: false
    };
  }
  onConfirm() {
    const { email, password, token, isRegistering } = this.state;
    if (isRegistering) {
      this.props.register(email, password, token);
    } else {
      this.props.login(email, password);
    }
  }
  render() {
    const {
      email,
      password,
      confirmPassword,
      token,
      isRegistering
    } = this.state;
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center"
        }}
      >
        <div style={{ width: "35%" }}>
          <div style={{ marginBottom: "1rem", width: "100%" }}>
            <h1>email:</h1>
            <input
              style={{ width: "100%" }}
              onChange={e => this.setState({ email: e.target.value })}
              value={email}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <h1>senha:</h1>
            <input
              style={{ width: "100%" }}
              onChange={e => this.setState({ password: e.target.value })}
              value={password}
            />
          </div>
          {isRegistering && (
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <h1>confirmar senha:</h1>
                <input
                  style={{ width: "100%" }}
                  onChange={e =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                  value={confirmPassword}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <h1>token:</h1>
                <input
                  style={{ width: "100%" }}
                  onChange={e => this.setState({ token: e.target.value })}
                  value={token}
                />
              </div>
            </div>
          )}
          <div
            className="hoverPointer"
            style={{
              border: `0.09rem solid black`,
              borderRadius: "0.4rem"
            }}
            onClick={this.onConfirm()}
          >
            <h1>Entrar</h1>
          </div>
          <div
            className="hoverPointer"
            style={{
              border: `0.09rem solid black`,
              borderRadius: "0.4rem"
            }}
            onClick={() => this.setState({ isRegistering: !isRegistering })}
          >
            <h1>Cadastrar</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

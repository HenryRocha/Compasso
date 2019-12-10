import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../css/app.css";
import actions from "../actions";
import { Colors } from "../constants/Colors";

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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      token: "",
      isRegistering: false
    };
  }

  onConfirm() {
    const { name, email, password, token, isRegistering } = this.state;
    if (isRegistering) {
      this.props.register(name, email, password, token);
    } else {
      this.props.login(email, password);
    }
  }

  isRegisterValid() {
    const {
      name,
      email,
      password,
      confirmPassword,
      token,
      isRegistering
    } = this.state;
    if (
      (password === confirmPassword &&
        token.length > 0 &&
        name.length > 4 &&
        email.length > 6 &&
        password.length > 5 &&
        isRegistering) ||
      !isRegistering
    ) {
      return true;
    }
    return false;
  }

  isLoginValid() {
    const { email, password, isRegistering } = this.state;
    if (email.length > 6 && password.length > 5 && !isRegistering) {
      return true;
    }
    return false;
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      token,
      isRegistering,
      name
    } = this.state;

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div style={{ width: "35%", marginTop: "1rem" }}>
          {isRegistering && (
            <div style={{ marginBottom: "1rem" }}>
              <h1>nome:</h1>
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "0.09rem solid black",
                  fontSize: "1rem"
                }}
                onChange={e => this.setState({ name: e.target.value })}
                value={name}
              />
            </div>
          )}
          <div style={{ marginBottom: "1rem", width: "100%" }}>
            <h1>e-mail:</h1>
            <input
              type="email"
              style={{
                width: "100%",
                border: "none",
                borderBottom: "0.09rem solid black",
                fontSize: "1rem"
              }}
              onChange={e => this.setState({ email: e.target.value })}
              value={email}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <h1>senha:</h1>
            <input
              type="password"
              style={{
                width: "100%",
                border: "none",
                borderBottom: "0.09rem solid black",
                fontSize: "1rem"
              }}
              onChange={e => this.setState({ password: e.target.value })}
              value={password}
            />
          </div>
          {isRegistering && (
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <h1>confirmar senha:</h1>
                <input
                  type="password"
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "0.09rem solid black",
                    fontSize: "1rem"
                  }}
                  onChange={e =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                  value={confirmPassword}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <h1>token:</h1>
                <input
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "0.09rem solid black",
                    fontSize: "1rem"
                  }}
                  onChange={e => this.setState({ token: e.target.value })}
                  value={token}
                />
              </div>
            </div>
          )}
          <div
            id="login"
            className="hoverPointer"
            style={{
              borderRadius: "0.4rem",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              backgroundColor: this.isLoginValid()
                ? Colors.pink
                : isRegistering
                ? Colors.pink
                : Colors.greyDark
            }}
            onClick={() =>
              !isRegistering
                ? this.isLoginValid()
                  ? this.onConfirm()
                  : null
                : this.setState({ isRegistering: false })
            }
          >
            <h1 style={{ alignSelf: "center", color: Colors.white }}>
              {!isRegistering ? "Entrar" : "Voltar para Login"}
            </h1>
          </div>
          <div
            id="register"
            className="hoverPointer"
            style={{
              borderRadius: "0.4rem",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: "1rem",
              backgroundColor: this.isRegisterValid()
                ? Colors.darkPink
                : Colors.greyDark
            }}
            onClick={() =>
              this.isRegisterValid()
                ? isRegistering
                  ? this.onConfirm()
                  : this.setState({ isRegistering: true })
                : null
            }
          >
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

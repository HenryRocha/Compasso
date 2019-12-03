import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../css/app.css";
import actions from "../actions";
import { Colors } from "../constants/Colors";

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout: actions.logout }, dispatch);

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, logout } = this.props;
    return (
      <div
        style={{
          backgroundColor: Colors.black,
          width: "100%",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "flex-row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "flex-row",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <img
            style={{
              heigth: "2.2rem",
              width: "2.2rem",
              margin: "1rem 0 1rem 1rem"
            }}
            src="https://teambuilding.mastertech.com.br/assets/images/mastertech-logo.png"
          />
          {user && (
            <h1 style={{ color: Colors.white, marginLeft: "1rem" }}>
              Olá, {user.name}
            </h1>
          )}
        </div>
        {user && (
          <h1
            className="hoverPointer"
            style={{ color: Colors.white, marginRight: "1rem" }}
            onClick={() => logout()}
          >
            Logout
          </h1>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import "../App.css";
import { Colors } from "../constants/Colors";

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <div
        style={{
          backgroundColor: Colors.black,
          width: "100%",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "flex-row"
        }}
      >
        <img
          style={{
            heigth: "2.2rem",
            width: "2.2rem",
            margin: "1rem 0 1rem 1rem"
          }}
          src="https://s3-sa-east-1.amazonaws.com/bibliotecafiles/Icones/logoMt.png"
        />
        {user && <h1>Olá, {user.name}</h1>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
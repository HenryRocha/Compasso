import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { login } from "../actions/authActions"


const mapStateToProps = state => {
  return { 
    email: state.email,
    id: state.id
  };
};

function mapDispatchToProps(dispatch) {
  return {
    login: user => dispatch(login(user))
  };
}

class PreLogin extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      id: ""
    }
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const body = {
        email: this.state.email,
        password: this.state.password
    }

    axios.post('http://localhost:5000/login', body)
    .then(res => {
        if(res.status == 200){
            const user = {
                email: this.state.email,
                id: res.data.id
            }
            this.props.login(user);
            this.props.history.push("/acount");
        }
    });
    
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
            <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group text-center">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreLogin);

export default Login;
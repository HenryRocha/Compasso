import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Header from "../components/Header";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );


class CreateProjectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      email: "",
      quizzes: {},
      D0: false,
      D7: false,
      D14: false,
      D30: false,
      D60: false,
      D90: false
    };
  }
  onChangeD0 = () => {
    this.setState(initialState => ({
      D0: !initialState.D0
    }));
  };
  onChangeD7 = () => {
    this.setState(initialState => ({
      D7: !initialState.D7
    }));
  };
  onChangeD14 = () => {
    this.setState(initialState => ({
      D14: !initialState.D14
    }));
  };
  onChangeD30 = () => {
    this.setState(initialState => ({
      D30: !initialState.D30
    }));
  };
  onChangeD60 = () => {
    this.setState(initialState => ({
      D60: !initialState.D60
    }));
  };

  async handleClick(e) {
    this.props.history.push("/dash");
//Não esta funcionando o POST
    //     var apiBaseUrl = "localhost:80/";
    //     await axios.post(apiBaseUrl+'projects', this.state)
    //     .then(function (response) {
    //         this.props.history.push("/dash");
    //     });
    //         e.preventDefault();
  }
  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        "& > *": {
          margin: theme.spacing(4)
        }
      }
    }));
    return (
      <div className={useStyles.root}>
        <TextField
          id="nome-novo-projeto"
          label="Novo Projeto"
          style={{ margin: 7 }}
          placeholder="Nome do projeto"
          fullWidth
          margin="normal"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />

        <TextField
          id="ponto-de-contato"
          label="Ponto de Contato"
          style={{ margin: 7 }}
          placeholder="campo de email"
          fullWidth
          margin="normal"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />

        <FormGroup row>
          <FormControlLabel
            control={<Checkbox onChange={this.onChangeD0} value="checkedD0" />}
            label="Registro de Ideias"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={this.onChangeD7}
                value="checkedD7"
                color="primary"
              />
            }
            label="D+7"
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                onChange={this.onChangeD14}
                value="checkedD14"
                color="primary"
              />
            }
            label="D+14"
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                onChange={this.onChangeD30}
                value="checkedD30"
                color="primary"
              />
            }
            label="D+30"
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                onChange={this.onChangeD60}
                value="checkedD60"
                color="primary"
              />
            }
            label="D+60"
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                onChange={this.onChangeD90}
                value="checkedD90"
                color="primary"
              />
            }
            label="D+90"
          />
        </FormGroup>
        <Button variant="outlined" onClick={e => this.handleClick()}>
          Criar
        </Button>
      </div>
    );
  }
}
export default CreateProjectScreen;

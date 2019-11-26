import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Header from "../components/Header";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';
import axios from 'axios';

class CriacaoDeProjeto extends React.Component {
  state = {
    nomeProjeto: "",
    pontoDeContato: "",
    listaDeInteracao: "",
    D0:false,
    D7:false,
    D14:false,
    D30:false,
    D60:false,
    D90:false,
};
onChangeD0 = () => {
    this.setState(initialState => ({
        D0: !initialState.D0,
    }));
}
onChangeD7 = () => {
    this.setState(initialState => ({
        D7: !initialState.D7,
    }));
}
onChangeD14 = () => {
    this.setState(initialState => ({
        D14: !initialState.D14,
    }));
}
onChangeD30 = () => {
    this.setState(initialState => ({
        D30: !initialState.D30,
    }));
}
onChangeD60 = () => {
    this.setState(initialState => ({
        D60: !initialState.D60,
    }));
}

handleClick = (title, email) => {
    //O BACK RECEBE OS QUIZ EM LISTA
    //Aqui falta mandar os dados para o back e voltar para o dash
    const apiBaseUrl = "http://localhost:8080/";
    var payload = {"title": title, "email": email}
    axios.post(apiBaseUrl + "project", payload);
    this.props.history.push("/dash_bia");

}
addProject(payload) {
    const apiBaseUrl = "http://localhost:3002/";
    axios.post(apiBaseUrl + "project", payload);
}

render() {
    const useStyles = makeStyles(theme => ({
        root: {
          '& > *': {
            margin: theme.spacing(4),
        },
    },
}));
    return (
      <div className={useStyles.root}>
      <Header />
      <TextField
      id="nome-novo-projeto"
      label="Novo Projeto"
      style={{ margin: 7 }}
      placeholder="Nome do projeto"
      fullWidth
      margin="normal"
      value={this.state.nomeProjeto}
      onChange={e => this.setState({ nomeProjeto: e.target.value })}
      />

      <TextField
      id="ponto-de-contato"
      label="Ponto de Contato"
      style={{ margin: 7 }}
      placeholder="campo de email"
      fullWidth
      margin="normal"
      value={this.state.pontoDeContato}
      onChange={e => this.setState({ pontoDeContato: e.target.value })}        />


      <Button variant="outlined" onClick ={() => this.handleClick(this.state.nomeProjeto, this.state.pontoDeContato)} >Criar</Button>

      </div>
      );
}
}
export default CriacaoDeProjeto;

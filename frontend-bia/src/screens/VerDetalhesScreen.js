import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CardDetalhe from "../components/CardDetalhe"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  textField: {
    margin: theme.spacing(2),
  },
}));

class VerDetalhesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nomeProjeto: "",
      pontoDeContato: "",
      listaDeQuizzes: []
    };

    this.titleStyle = {
      color: "black",
      backgroundColor: null,
      padding: "20px",
      fontFamily: "Arial",
      textAlign: "center",
      fontSize: "20px"
    };

  }


  render() {
    return (
      <div>

        <Grid item xs container direction="row" spacing={1} style={this.titleStyle} >
          <TextField
            id="tipo"
            label="Empresa"
            multiline
            rows="2"
            defaultValue={this.state.nomeProjeto}
            // className={}
            margin="normal"
          />
          <Button onClick={null} color="primary">
            Editar
          </Button>
          <Button onClick={null} color="primary">
            Deletar
          </Button>
        </Grid>
        <Grid item xs container direction="row" spacing={2} style={this.titleStyle} >
          <TextField
            id="tipo"
            label="Ponto de Contato"
            multiline
            rows="2"
            defaultValue={this.state.pontoDeContato}
            // className={}
            margin="normal"
          />
        </Grid>
        <Grid item xs container direction="row" spacing={6} style={this.titleStyle} >
        <Typography style={this.titleStyle}>
          Formulários habilitados:
        </Typography>
        </Grid>
        <Grid item xs container direction="row" spacing={5} style={this.titleStyle} >
          {this.state.listaDeQuizzes.length !== 0 ?
            this.state.listaDeQuizzes.map((a, i) => (
              <CardDetalhe
                nomeQuiz={a.title}
              />
            ))
            : null
          }
        </Grid>

      </div>
    );
  }
}
export default VerDetalhesScreen;

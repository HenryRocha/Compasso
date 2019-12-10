import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
//Redux
import actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  user: state.user,
  projects: state.data.projects,
  templates: state.data.templates
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { postProject: actions.postProject },
    dispatch
  );

class CreateProjectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      email: "",
      token: "1234",
      quizzes: [],
      templates : props.templates
    };
  }
  handleCheck = (d) => {
    this.state.quizzes.push({
      _templateId: d._id,
      deadline: "2021-12-31T03:00:00.000+00:00",
      name:d.title
    })
  };

  async handleClick(e) {
    console.log(this.state)
    this.props.postProject(
      this.state.title,
      this.state.description,
      this.state.email,
      this.state.token,
      this.state.quizzes
    );
  }
  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        "& > *": {
          margin: theme.spacing(4)
        }
      }
    }));

    var checkBox = this.state.templates.map((d, i) =>
      <div>
        <FormControlLabel
          control={<Checkbox onChange={() => this.handleCheck(d)} value={i} />}
          label={d.title}
        />
      </div>
    );

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
          {checkBox}
        </FormGroup>
        <Button variant="outlined" onClick={e => this.handleClick()}>
          Criar
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectScreen);
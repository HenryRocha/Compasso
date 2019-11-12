import React from "react";
import "../css/app.css";
import MCQuestion from "./MCQuestion";
import actions from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import store from "../store";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postProject: actions.postProject
    },
    dispatch
  );

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idea: "",
      client: "",
      effort: "",
      benefitRating: "",
      alignment: "",
      bennefitType: "",
      needInvestment: null,
      original: null,
      newIdea: null,
      willBeDeveloped: null
    };
  }
  render() {
    const { isVisible, onConfirm } = this.props;
    const { idea, client } = this.state;
    return (
      <div
        style={{
          display: isVisible ? "flex" : "none",
          flexDirection: "column",
          alignSelf: "center",
          width: "40%"
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <h1>1. Qual a ideia?</h1>
          <input
            onChange={e => this.setState({ idea: e.target.value })}
            value={idea}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <h1>2. Quem é o cliente na sua ideia?</h1>
          <input
            onChange={e => this.setState({ client: e.target.value })}
            value={client}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <MCQuestion
            question={"3. Indique o esforço de desenvolvimento"}
            answers={["baixo", "médio", "alto"]}
            value={value => this.setState({ effort: value })}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <MCQuestion
            question={"4. Indique o potencial de benefício"}
            answers={["baixo", "médio", "alto"]}
            value={value => this.setState({ benefitRating: value })}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <MCQuestion
            question={
              "5. Qual o alinhamento estratégico dessa ideia, numa escala de 1 a 10, sendo 10 totalmente alinhado"
            }
            answers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            value={value => this.setState({ alignment: value })}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <MCQuestion
            question={"6. Qual a natureza dos benefícios esperados?"}
            answers={[
              "Eficiência operacional",
              "Melhoria em comunicação",
              "Aperfeiçoamento de produtos",
              " Melhora na Logística",
              " Aumento de valor agregado (preço)",
              "Aumento de vendas",
              "Melhora no serviço ao cliente."
            ]}
            value={value => this.setState({ bennefitType: value })}
            checkBox
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <MCQuestion
            question={"7. Existe necessidade de investimento?"}
            answers={["sim", "não", "não sei dizer"]}
            value={value => this.setState({ needInvestment: value })}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <MCQuestion
            question={"8. Essa ideia é original?"}
            answers={["sim", "não"]}
            value={value => this.setState({ original: value })}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <MCQuestion
            question={"9. Você já havia tido essa ideia antes?"}
            answers={["sim", "não"]}
            value={value => this.setState({ newIdea: value })}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <MCQuestion
            question={"10. Acha que um dia essa ideia será desenvolvida?"}
            answers={["sim", "não"]}
            value={value => this.setState({ willBeDeveloped: value })}
          />
        </div>
        <div
          className="hoverPointer"
          style={{
            border: `0.09rem solid green`,
            borderRadius: "0.5rem",
            justifyContent: "center",
            padding: "0.3rem",
            marginRight: "0.5rem",
            display: "inline-block"
          }}
          onClick={() => {
            this.props.postProject(this.state);
            onConfirm();
          }}
        >
          <h1 style={{ color: "green" }}>Adicionar</h1>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);

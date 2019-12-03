import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";

const CardDetalhe = props => {
  return (
    <div>
      <Card body>
        <CardTitle>{props.nomeQuiz}</CardTitle>
        <CardText>{props.quantRespostas}respostas</CardText>
      </Card>
    </div>
  );
};

export default CardDetalhe;

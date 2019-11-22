import React from "react";
import "../css/app.css";

export default class MCQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null
    };
  }
  render() {
    const { question, answers, value, checkBox } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div>
        <h1>{question}</h1>
        {checkBox ? (
          <div>
            {answers.map((a, i) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "0.5rem"
                }}
              >
                <div
                  onClick={() => {
                    this.setState({ selectedIndex: i });
                    value(answers[i]);
                  }}
                  style={{
                    border:
                      selectedIndex !== null && selectedIndex === i
                        ? `0.09rem solid red`
                        : `0.09rem solid black`,
                    backgroundColor:
                      selectedIndex !== null && selectedIndex === i
                        ? "red"
                        : "white",
                    borderRadius: "4rem",
                    heigth: "1rem",
                    width: "1.6rem",
                    marginRight: "1rem"
                  }}
                />
                <h1>{a}</h1>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {answers.map((a, i) => (
              <div
                className="hoverPointer"
                style={{
                  border:
                    selectedIndex !== null && selectedIndex === i
                      ? `0.09rem solid red`
                      : `0.09rem solid black`,
                  borderRadius: "0.5rem",
                  justifyContent: "center",
                  padding: "0.3rem",
                  marginRight: "0.5rem"
                }}
                onClick={() => {
                  this.setState({ selectedIndex: i });
                  value(answers[i]);
                }}
              >
                <h1
                  key={`${i}-mcq`}
                  style={{
                    color:
                      selectedIndex !== null && selectedIndex === i
                        ? "red"
                        : "black"
                  }}
                >
                  {a}
                </h1>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

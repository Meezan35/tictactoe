import React from "react";
import "./style.css";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  getText(playerTurn) {
    if (playerTurn === "X") {
      return "player 1s turn";
    }
    if (playerTurn === "O") {
      return "player 2s turn";
    }
  }
  render() {
    return <div className="turn">{this.getText(this.props.turn)}</div>;
  }
}

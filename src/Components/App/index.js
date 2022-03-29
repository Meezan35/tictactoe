import React from "react";
import "./style.css";
import GridRow from "../GridRow";
import Header from "../Header";
import Footer from "../Footer";
import reportWebVitals from "../../reportWebVitals";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      playerTurn: "X",
      boardstate: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  }

  playerClick = (i, j) => {
    if (this.state.boardstate[i][j] === "") {
      const currboardstate = this.state.boardstate;
      currboardstate[i][j] = this.state.playerTurn;
      this.setState({
        boardstate: currboardstate,
        playerTurn: this.state.playerTurn === "X" ? "O" : "X",
      });
    }
  };
  componentDidUpdate() {
    let won = true;

    // check for rows
    for (let i = 0; i < 3; i++) {
      won = true;

      for (let j = 1; j < 3; j++) {
        if (this.state.boardstate[i][j] !== this.state.boardstate[i][j - 1]) {
          won = false;
          break;
        }
      }
      if (won && this.state.boardstate[i][0] !== "") {
        return this.alertWin(this.state.boardstate[i][0]);
      }
    }
    // check for cols
    for (let j = 0; j < 3; j++) {
      won = true;

      for (let i = 1; i < 3; i++) {
        if (this.state.boardstate[i][j] !== this.state.boardstate[i - 1][j]) {
          won = false;
          break;
        }
      }
      if (won && this.state.boardstate[0][j] !== "") {
        return this.alertWin(this.state.boardstate[0][j]);
      }
    }
    // check forward diagnol
    won = true;
    for (let i = 1; i < 3; i++) {
      if (this.state.boardstate[i][i] !== this.state.boardstate[i - 1][i - 1]) {
        won = false;
        break;
      }
    }
    if (won && this.state.boardstate[0][0] !== "") {
      return this.alertWin(this.state.boardstate[0][0]);
    }
    // check anti-diagnol
    won = true;
    for (let i = 1; i < 3; i++) {
      if (
        this.state.boardstate[i][2 - i] !==
        this.state.boardstate[i - 1][2 - i + 1]
      ) {
        won = false;
        break;
      }
    }
    if (won && this.state.boardstate[2][0] !== "") {
      return this.alertWin(this.state.boardstate[2][0]);
    }
    // check for draw
    let draw = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.state.boardstate[i][j] === "") {
          draw = false;
          break;
        }
      }
      if (draw === false) {
        break;
      }
    }
    if (draw) {
      return this.alertDraw();
    }
  }

  alertWin(playerWon) {
    if (playerWon === "X") {
      alert("Congratulations! Player1 wins");
    } else {
      alert("Congratulations! Player2 wins");
    }
    this.resetGame();
  }

  alertDraw() {
    alert("Draw!");
    this.resetGame();
  }
  resetGame() {
    this.setState({
      playerTurn: "X",
      boardstate: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div id="board">
          {this.state.boardstate.map((boardRow, rowIdx) => (
            <GridRow
              key={rowIdx}
              row={boardRow}
              rowIdx={rowIdx}
              playerClickCB={this.playerClick}
            />
          ))}
        </div>
        <Footer turn={this.state.playerTurn} />
      </div>
    );
  }
}

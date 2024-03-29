import React from "react";
import "./style.css";
import GridItem from "../GridItem";

export default class GridRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="grid-row">
        {this.props.row.map((boardcell, colIdx) => (
          <GridItem
            key={colIdx}
            value={boardcell}
            colIdx={colIdx}
            rowIdx={this.props.rowIdx}
            playerClickCB={this.props.playerClickCB}
          />
        ))}
      </div>
    );
  }
}

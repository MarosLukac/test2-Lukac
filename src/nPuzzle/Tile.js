import React from "react";
import { TileStateEnum } from "./Core";
import "./TileNPuzzle.css";

const TILE_COLORS = ["transparent"];

export default function TileComponent(props) {
  const { tile, row, col, handleChangePosition } = props;

  const tileStyle = {
    color: TILE_COLORS[tile.value]
  };

  return (
    <td className="colStyle">
      <button
        className={
          "tileStylenPuzzle " +
          (tile.state === TileStateEnum.OPEN ? "openPuzzle" : "closedStone")
        }
        style={tileStyle}
        onClick={() => handleChangePosition(row, col)}
      >
        {tile.value}
      </button>
    </td>
  );
}

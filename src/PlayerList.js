import React from "react";
import { Button } from "./Button";
import { ACTIONS } from "./index";

function xPosition(x) {
  if (x >= 10) {
    return Number.parseFloat(x).toPrecision(3);
  }
  return Number.parseFloat(x).toPrecision(2);
}

const PlayerRow = ({ player, dispatch }) => {
  return (
    <tr className="player-row">
      <td>
        <Button
          onClick={() =>
            dispatch({ type: ACTIONS.ADD_FAVORITE, payload: player.pid })
          }
        >
          Add to Favorites
        </Button>
      </td>
      <td className="td-player-name">{player.name}</td>
      <td className="td-player-stat">{xPosition(player.pts)}</td>
      <td className="td-player-stat">{xPosition(player.reb)}</td>
      <td className="td-player-stat">{xPosition(player.ast)}</td>
    </tr>
  );
};

const PlayerList = ({ data, dispatch }) => {
  // sort the data
  const renderData = React.useMemo(() => data.sort((a, b) => b.pts - a.pts), [
    data,
  ]);

  return (
    <div className="inner-container">
      <h2>Players:</h2>
      <table>
        <tbody>
          <tr className="table-header">
            <th></th>
            <th className="td-player-name">Name</th>
            <th className="td-player-stat">PTS</th>
            <th className="td-player-stat">REB</th>
            <th className="td-player-stat">AST</th>
          </tr>
          {renderData.map((player) => (
            <PlayerRow key={player.pid} player={player} dispatch={dispatch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;

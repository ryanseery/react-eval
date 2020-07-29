import React from "react";
import { Button } from "./Button";
import { xPosition } from "./utils";

const PlayerRow = ({ player, addFavorite }) => {
  return (
    <tr className="player-row">
      <td>
        <Button onClick={() => addFavorite(player.pid)}>
          Add to Favorites
        </Button>
      </td>
      <td className="col player-name">{player.name}</td>
      <td className="col player-stat">{xPosition(player.pts)}</td>
      <td className="col player-stat">{xPosition(player.reb)}</td>
      <td className="col player-stat">{xPosition(player.ast)}</td>
    </tr>
  );
};

const PlayerList = ({ data, addFavorite }) => {
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
            <th className="col player-name">Name</th>
            <th className="col player-stat">PTS</th>
            <th className="col player-stat">REB</th>
            <th className="col player-stat">AST</th>
          </tr>
          {renderData.map((player) => (
            <PlayerRow
              key={player.pid}
              player={player}
              addFavorite={addFavorite}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;

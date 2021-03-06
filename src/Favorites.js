import React from "react";
import { Button } from "./Button";
import { ACTIONS } from "./index";

const Favorite = ({ player, dispatch }) => {
  return (
    <div className="favorite-player">
      <img src={player.img} alt={player.name} />
      <div className="player-info">
        <h4>{player.name}</h4>

        <div className="player-stats">
          <div className="stat">
            <span className="state-title">PTS</span>
            <span className="state-points">{player.pts}</span>
          </div>

          <div className="stat">
            <span className="state-title">REB</span>
            <span className="state-points">{player.reb}</span>
          </div>

          <div className="stat">
            <span className="state-title">AST</span>
            <span className="state-points">{player.ast}</span>
          </div>
        </div>

        <div className="remove-favorite">
          <Button
            className="remove"
            onClick={() =>
              dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: player.pid })
            }
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

const Favorites = ({ favorites, dispatch }) => {
  return (
    <div className="inner-container">
      <h2>Favorites:</h2>
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <h3>No Favorites Yet</h3>
        </div>
      ) : (
        <div className="favorites-container">
          {favorites.map((player) => (
            <Favorite key={player.pid} player={player} dispatch={dispatch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

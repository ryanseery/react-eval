import React from "react";
import { Button } from "./Button";
import { xPosition } from "./utils";

const Favorite = ({ player, removeFavorite }) => {
  return (
    <div className="favorite-player">
      <img src={player.img} alt={player.name} />
      <div className="player-info">
        <h4>{player.name}</h4>

        <div className="player-stats">
          <div className="stat">
            <span className="state-title">PTS</span>
            <span className="state-points">{xPosition(player.pts)}</span>
          </div>

          <div className="stat">
            <span className="state-title">REB</span>
            <span className="state-points">{xPosition(player.reb)}</span>
          </div>

          <div className="stat">
            <span className="state-title">AST</span>
            <span className="state-points">{xPosition(player.ast)}</span>
          </div>
        </div>

        <div className="remove-favorite">
          <Button className="remove" onClick={() => removeFavorite(player.pid)}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

const Favorites = ({ favorites, removeFavorite }) => {
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
            <Favorite
              key={player.pid}
              player={player}
              removeFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

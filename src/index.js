import React from "react";
import { render } from "react-dom";
import PlayerList from "./PlayerList";
import Favorites from "./Favorites";
import "./style.css";

// url
const jsonUrl =
  "http://my-json-server.typicode.com/nortenzio/leagueplayerstats/players";

// set up actions
export const ACTIONS = {
  INITIATE: "INITIATE",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  ADD_FAVORITE: "ADD_FAVORITE",
  REMOVE_FAVORITE: "REMOVE_FAVORITE",
};

// * State
// loading: boolean
// error: string | boolean
// data: null | KeyValue
// favorites: [] | player[]

// set up are reducer
// handle loading / error /state
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INITIATE: {
      return { ...state, loading: true, error: false };
    }
    case ACTIONS.SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case ACTIONS.FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case ACTIONS.ADD_FAVORITE: {
      const dataToUpdate = [...state.data];

      const playerToAddToFav = dataToUpdate.filter(
        (player) => player.pid === action.payload
      );

      const updatedData = dataToUpdate.filter(
        (player) => player.pid !== action.payload
      );

      return {
        ...state,
        data: [...updatedData],
        favorites: [...state.favorites, ...playerToAddToFav],
      };
    }
    case ACTIONS.REMOVE_FAVORITE: {
      const dataToUpdate = [...state.favorites];

      const playerToRemove = dataToUpdate.filter(
        (player) => player.pid === action.payload
      );

      const updatedData = dataToUpdate.filter(
        (player) => player.pid !== action.payload
      );

      return {
        ...state,
        data: [...state.data, ...playerToRemove],
        favorites: [...updatedData],
      };
    }

    default: {
      throw new Error("Reducer received unknown action.");
    }
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: true,
    error: false,
    data: null,
    favorites: [],
  });

  React.useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      // initiate loading
      dispatch({ type: ACTIONS.INITIATE });

      try {
        // async fetch
        const response = await fetch(jsonUrl, {
          signal: abortController.signal,
        });

        // read payload
        const resp = await response.json();

        // create favorites key value

        const payload = resp.map((player) => ({ ...player, favorite: false }));

        // set json data to state
        dispatch({ type: ACTIONS.SUCCESS, payload });
      } catch (err) {
        console.error(`fetchError: ${err}`);
        dispatch({ type: ACTIONS.FAILURE, payload: err.message });
      }
    })();
  }, []);

  console.log("state: ", state);

  return (
    <div className="container">
      {state.loading && <div>Loading...</div>}

      {state.error && <div>Error: {state.error}</div>}

      {!state.loading && !state.error ? (
        <>
          <Favorites favorites={state.favorites} dispatch={dispatch} />
          <PlayerList data={state.data} dispatch={dispatch} />
        </>
      ) : null}
    </div>
  );
};

render(<App />, document.getElementById("root"));

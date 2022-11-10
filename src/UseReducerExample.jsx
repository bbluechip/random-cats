import { useReducer } from "react";
import { initialState, reducer } from "./reduces";

const UseReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, catImage, error } = state;
  const getCatImage = async () => {
    const url = "https://api.thecatapi.com/v1/images/search";
    dispatch({ type: "START" });

    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "SUCCESS", payload: data[0].url });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "DATA CAN NOT BE LOADED" });
    }
  };

  return (
    <div>
      <button
        onClick={getCatImage}
        disabled={loading}
        style={{ display: "block", margin: "1rem" }}
      >
        Get Cat
      </button>
      {error && <h2>{error}</h2>}
      {catImage && <img width="50%" src={catImage} alt="img" />}
    </div>
  );
};

export default UseReducerExample;

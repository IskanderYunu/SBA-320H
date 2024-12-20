import React, { useEffect, useState } from "react";
import { fetchElixirs } from "../services/api";

const ElixirList = () => {
  const [elixirs, setElixirs] = useState([]);
  const [visibleIngredients, setVisibleIngredients] = useState({});

  useEffect(() => {
    const getElixirs = async () => {
      try {
        const data = await fetchElixirs();
        console.log("Fetched elixirs:", data); // Debug log
        setElixirs(data);
      } catch (error) {
        console.error("Error Fetching the Sauce:", error);
      }
    };
    getElixirs();
  }, []);

  const toggleIngredients = (id) => {
    setVisibleIngredients((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <h1>Your an Elixir Harry!</h1>
      <div>
        {elixirs.map((elixir) => (
          <div
            key={elixir.id}
            style={{
              border: "1px solid black",
              margin: "20px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h2>{elixir.name}</h2>
            <p>
              <strong>Effect:</strong> {elixir.effect}
            </p>
            <button onClick={() => toggleIngredients(elixir.id)}>
              {visibleIngredients[elixir.id]
                ? "Hide Ingredients"
                : "Show Ingredients"}
            </button>
            {visibleIngredients[elixir.id] && (
              <p>
                <strong>Ingredients:</strong>{" "}
                {elixir.ingredients
                  .map((ingredient) => ingredient.name)
                  .join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElixirList;

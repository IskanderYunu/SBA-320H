import React, { useEffect, useState } from "react";
import { fetchElixirs } from "../services/api";

const ElixirList = () => {
  const [elixirs, setElixirs] = useState([]);
  const [selectedElixir, setSelectedElixir] = useState(null);

  useEffect(() => {
    const getElixirs = async () => {
      try {
        const data = await fetchElixirs();
        console.log("Fetched elixirs:", data); //debug

        setElixirs(data);
      } catch (error) {
        console.error("Error Fetching the Sauce:", error);
      }
    };
    getElixirs();
  }, []);

  const handleElixirClick = (elixir) => {
    console.log("Selected Elixir:", elixir); //debug
    setSelectedElixir(elixir);
  };

  return (
    <div>
      <h1>Your an Elixir Harry!</h1>
      <ul>
        {elixirs.map((elixir) => (
          <li key={elixir.id}>
            {elixir.name}{" "}
            <button onClick={() => handleElixirClick(elixir)}>
              View Details
            </button>
          </li>
        ))}
      </ul>
      {selectedElixir && (
        <div>
          <h2>{selectedElixir.name}</h2>
          <p>
            <strong>Effect:</strong> {selectedElixir.effect}
          </p>
          <p>
            <strong>Ingredients:</strong>{" "}
            {selectedElixir.ingredients.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ElixirList;

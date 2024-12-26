import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { fetchElixirs } from "../services/api";
import "slick-carousel/slick/slick.css"; //imported carousel css
import "slick-carousel/slick/slick-theme.css";
import potionFavIcon from "/images/fav-list-potion.png"; // Imported favList image

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        fontSize: "90px",
        cursor: "pointer",
        color: "black",
        position: "absolute",
        right: "30px",
        top: "30%",
        margin: "-100px",
        //zIndex controls the stack order of elements
        zIndex: 1,
      }}
      onClick={onClick}
    >
      →
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        fontSize: "90px",
        cursor: "pointer",
        color: "black",
        position: "absolute",
        left: "30px",
        top: "30%",
        margin: "-100px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

const ElixirList = () => {
  const [elixirs, setElixirs] = useState([]);
  const [visibleIngredients, setVisibleIngredients] = useState({});
  const [favorites, setFavorites] = useState([]);

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

  const handleToggleIngredients = (id) => {
    setVisibleIngredients((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleFavorite = (elixir) => {
    setFavorites((prevFavorites) => [...prevFavorites, elixir]);
  };

  const handleRemoveFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((elixir) => elixir.id !== id)
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <div style={{ textAlign: "center", color: "#FFDAB9" }}>
        <h1>You're an Elixir Harry!⚗️</h1>
        <h2>Choose your potion wisely...</h2>
        <p>*Some Ingredients are missing/classified*</p>
      </div>
      <Slider {...settings}>
        {elixirs.map((elixir) => (
          <div
            key={elixir.id}
            //might not be needed DELETE?
            style={{ padding: "100px", position: "relative" }}
          >
            <div
              style={{
                border: "1px outset #8B4513",
                borderWidth: "35px",
                margin: "30px",
                padding: "20px",
                borderRadius: "5px",
                position: "relative",
                backgroundColor: "#FAEBD7",
              }}
            >
              <button
                onClick={() => handleFavorite(elixir)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "white",
                  border: "none",
                  cursor: "pointer",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "5px",
                }}
              >
                Favorite
              </button>
              <h2>{elixir.name}</h2>
              <p>
                <strong>Effect:</strong> {elixir.effect}
              </p>
              <button onClick={() => handleToggleIngredients(elixir.id)}>
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
          </div>
        ))}
      </Slider>
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          border: "1px inset #8B4513",
          borderWidth: "15px",
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          width: "300px",
          backgroundColor: "#FAEBD7",
        }}
      >
        <h2>My Favorite Elixirs</h2>
        {favorites.length === 0 ? (
          <p>No favorite elixirs yet.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {favorites.map((elixir) => (
              <li
                key={elixir.id}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundImage: `url(${potionFavIcon})`,
                    backgroundSize: "cover",
                    marginRight: "15px",
                  }}
                ></span>
                {elixir.name}
                <button
                  onClick={() => handleRemoveFavorite(elixir.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ElixirList;

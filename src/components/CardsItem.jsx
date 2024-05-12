import React from "react";
import { Link } from "react-router-dom";
import "../styles/cards.css";

import clock from "../img/clock.png";
import full_star from "../img/full_star.png";
import empty_star from "../img/empty_star.png";

function CardsItem(props) {
  const { id, name, prepTimeMinutes, difficulty, cuisine, mealType, image } =
    props;

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <img src={full_star} alt="Filled Star" className="star" key={i} />
      );
    }
    for (let i = count; i < 3; i++) {
      stars.push(
        <img src={empty_star} alt="Empty Star" className="star" key={i} />
      );
    }
    return <div className="stars-container">{stars}</div>;
  };

  const difficulityConvetror = (diff) => {
    if (diff === "Easy") return 1;
    if (diff === "Medium") return 2;
    if (diff === "Hard") return 3;
  };

  return (
    <Link to={`/recipe/${id}`} className="card-link">
      <div className="card">
        <div className="left-part">
          <h2 className="card-title">{name}</h2>
          <img src={image} alt={name} className="card-image" />
        </div>
        <div className="right-part">
          <p className="card-description">
            Традиционное итальянское блюдо, изначально в виде круглой дрожжевой
            лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса,
            сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и
            прочие продукты. Небольшую пиццу иногда называют пиццеттой.
          </p>
          <div className="card-time">
            <img src={clock} alt="clock" className="clock-time" />{" "}
            {prepTimeMinutes} минут
          </div>
          <div>
            <span className="card-difficulty">
              Сложность: {renderStars(difficulityConvetror(difficulty))}
            </span>
          </div>
          <div className="card-cuisine">
            <span>{cuisine} кухня </span>
          </div>
          <div className="card-mealType">
            <span>{mealType.join(", ")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { CardsItem };

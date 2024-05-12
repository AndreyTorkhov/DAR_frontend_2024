import "../styles/additional.css";
import { getAllRecipes } from "../api";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Additional() {
  const [randomRecipe, setRandomRecipe] = useState(null);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomRecipe = async () => {
    try {
      const allRecipes = await getAllRecipes();
      const recipes = allRecipes.recipes;
      const randomIndex = getRandomNumber(0, recipes.length - 1);
      const randomRecipe = recipes[randomIndex];
      setRandomRecipe(randomRecipe);
    } catch (error) {
      console.error("Ошибка при получении случайного блюда:", error);
    }
  };

  useEffect(() => {
    getRandomRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="additional-container">
      <p className="additional-text">А еще можно попробовать на вкус удачу</p>
      <Link to={randomRecipe ? `/recipe/${randomRecipe.id}` : "#"}>
        <button className="additional-button">Мне повезет!</button>
      </Link>
    </div>
  );
}

export { Additional };

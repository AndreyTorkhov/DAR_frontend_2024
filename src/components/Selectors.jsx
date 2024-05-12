import React, { useState, useEffect, useRef } from "react";
import { getAllRecipes } from "../api";
import "../styles/selectors.css";
import { Loader } from "./Loader";

function Selectors({ updateCatalog }) {
  const kitchenSelectorRef = useRef(null);
  const dishTypeSelectorRef = useRef(null);
  const difficultySelectorRef = useRef(null);

  const [cuisines, setCuisines] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);

  const [filterRecipes, setFilterRecipes] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const recipesData = await getAllRecipes();
      setFilterRecipes(recipesData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const allRecipes = await getAllRecipes();
      setCuisines(getUniqueValues(allRecipes.recipes, "cuisine"));
      const types = allRecipes.recipes.reduce(
        (acc, recipe) => acc.concat(recipe.mealType),
        []
      );
      const uniqueTypes = Array.from(new Set(types));
      setMealTypes(uniqueTypes);
    };

    fetchData();
  }, []);

  const getUniqueValues = (recipes, key) => {
    const values = recipes.map((recipe) => recipe[key]);
    return Array.from(new Set(values));
  };

  const handleResetStyles = async () => {
    setIsLoading(true);
    kitchenSelectorRef.current.value = "Все страны и регионы";
    dishTypeSelectorRef.current.value = "Все типы";
    difficultySelectorRef.current.querySelector(
      'input[type="radio"][value="Любая"]'
    ).checked = true;
    let allData = await getAllRecipes();
    setFilterRecipes(allData);
    updateCatalog(allData);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const filterRecipesByCuisine = (recipes, cuisine) => {
    if (cuisine === "Все страны и регионы") {
      return recipes;
    }

    let filteredRecipes = {
      recipes: [],
      total: 0,
      skip: 0,
      limit: 0,
    };

    for (const recipe of recipes.recipes) {
      const recipeСousine = recipe.cuisine;
      if (recipeСousine && recipeСousine.includes(cuisine)) {
        filteredRecipes.recipes.push(recipe);
      }
    }
    filteredRecipes.total = filteredRecipes.recipes.length;
    filteredRecipes.skip = 0;
    filteredRecipes.limit = filteredRecipes.total;
    return filteredRecipes;
  };

  const filterRecipesByMealType = (recipes, mealType) => {
    if (mealType === "Все типы") {
      return recipes;
    }

    let filteredRecipes = {
      recipes: [],
      total: 0,
      skip: 0,
      limit: 0,
    };

    for (const recipe of recipes.recipes) {
      const recipeСousine = recipe.mealType;
      if (recipeСousine && recipeСousine.includes(mealType)) {
        filteredRecipes.recipes.push(recipe);
      }
    }
    filteredRecipes.total = filteredRecipes.recipes.length;
    filteredRecipes.skip = 0;
    filteredRecipes.limit = filteredRecipes.total;
    return filteredRecipes;
  };

  const filterRecipesByDifficulty = (recipes, difficulity) => {
    if (difficulity === "Любая") {
      return recipes;
    }

    let filteredRecipes = {
      recipes: [],
      total: 0,
      skip: 0,
      limit: 0,
    };

    for (const recipe of recipes.recipes) {
      const recipeDiff = recipe.difficulty;
      if (recipeDiff && recipeDiff == difficulity) {
        filteredRecipes.recipes.push(recipe);
      }
    }
    filteredRecipes.total = filteredRecipes.recipes.length;
    filteredRecipes.skip = 0;
    filteredRecipes.limit = filteredRecipes.total;
    return filteredRecipes;
  };

  const cousineFilter = () => {
    setIsLoading(true);
    const cousine = kitchenSelectorRef.current.value;
    const recipesByCousine = filterRecipesByCuisine(filterRecipes, cousine);
    setFilterRecipes(recipesByCousine);
    updateCatalog(recipesByCousine);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const mealTypeFilter = () => {
    setIsLoading(true);
    const mealType = dishTypeSelectorRef.current.value;
    const recipesByMealType = filterRecipesByMealType(filterRecipes, mealType);
    setFilterRecipes(recipesByMealType);
    updateCatalog(recipesByMealType);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const difficultyFilter = (difficulty) => {
    setIsLoading(true);
    const recipesByDifficulty = filterRecipesByDifficulty(
      filterRecipes,
      difficulty
    );
    setFilterRecipes(recipesByDifficulty);
    updateCatalog(recipesByDifficulty);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="selectors-container">
      {isLoading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      <div className="filter">
        <div className="filter-title">
          <h2 className="text-title">Кухня</h2>
        </div>
        <select
          className="filter-select"
          ref={kitchenSelectorRef}
          onChange={cousineFilter}
        >
          <option>Все страны и регионы</option>
          {cuisines.map((cuisine, index) => (
            <option key={index}>{cuisine}</option>
          ))}
        </select>
      </div>
      <div className="filter">
        <div className="filter-title">
          <h2 className="text-title">Тип блюда:</h2>
        </div>
        <select
          className="filter-select"
          ref={dishTypeSelectorRef}
          onChange={mealTypeFilter}
        >
          <option>Все типы</option>
          {mealTypes.map((mealType, index) => (
            <option key={index}>{mealType}</option>
          ))}
        </select>
      </div>
      <div className="filter">
        <div className="filter-title">
          <h2 className="text-title no-margin">Сложность приготовления:</h2>
        </div>
        <div className="filter-select" ref={difficultySelectorRef}>
          <div className="form_radio_group-item">
            <input
              id="any"
              type="radio"
              name="difficulty"
              value="Любая"
              defaultChecked
            />
            <label htmlFor="any">Любая</label>
          </div>
          <div className="form_radio_group-item">
            <input
              id="low"
              type="radio"
              name="difficulty"
              value="Низкая"
              onChange={() => difficultyFilter("Easy")}
            />
            <label htmlFor="low">Низкая</label>
          </div>
          <div className="form_radio_group-item">
            <input
              id="medium"
              type="radio"
              name="difficulty"
              value="Средняя"
              onChange={() => difficultyFilter("Medium")}
            />
            <label htmlFor="medium">Средняя</label>
          </div>
          <div className="form_radio_group-item">
            <input
              id="high"
              type="radio"
              name="difficulty"
              value="Высокая"
              onChange={() => difficultyFilter("Hard")}
            />
            <label htmlFor="high">Высокая</label>
          </div>
        </div>
      </div>
      <button className="reset-button" onClick={handleResetStyles}>
        Сбросить фильтры
      </button>
    </div>
  );
}

export { Selectors };

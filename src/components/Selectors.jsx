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

  const [allRecipes, setAllRecipes] = useState();
  const [filterRecipes, setFilterRecipes] = useState();

  const [selectedCuisine, setSelectedCuisine] = useState();
  const [selectedMealType, setSelectedMealType] = useState();
  const [selectedDifficulty, setSelectedDifficulty] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const recipesData = await getAllRecipes();
      setAllRecipes(recipesData);
      setFilterRecipes(recipesData);
      setSelectedCuisine(recipesData);
      setSelectedMealType(recipesData);
      setSelectedDifficulty(recipesData);
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
    setFilterRecipes(allRecipes);
    updateCatalog(allRecipes);
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
      // eslint-disable-next-line
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
    setSelectedCuisine(recipesByCousine);
    fetchAndFilter();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const mealTypeFilter = () => {
    setIsLoading(true);
    const mealType = dishTypeSelectorRef.current.value;
    const recipesByMealType = filterRecipesByMealType(filterRecipes, mealType);
    setSelectedMealType(recipesByMealType);
    fetchAndFilter();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const difficultyFilter = (difficulty) => {
    setIsLoading(true);
    if (difficulty === "Любая") {
      setSelectedDifficulty(allRecipes);
    } else {
      const recipesByDifficulty = filterRecipesByDifficulty(
        filterRecipes,
        difficulty
      );
      setSelectedDifficulty(recipesByDifficulty);
    }
    fetchAndFilter();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  async function getAllIds(obj) {
    const allIds = obj.recipes.map((recipe) => recipe.id).flat();
    return await allIds;
  }

  async function findCommonIds(obj1, obj2, obj3) {
    const ids1 = await getAllIds(obj1);
    const ids2 = await getAllIds(obj2);
    const ids3 = await getAllIds(obj3);
    const commonIds = ids1.filter(
      (id) => ids2.includes(id) && ids3.includes(id)
    );

    return await commonIds;
  }

  async function filterObjectsById(obj, commonIds) {
    const filteredRecipes = obj.recipes.filter((recipe) =>
      commonIds.includes(recipe.id)
    );
    const filteredObject = {
      recipes: filteredRecipes,
      total: filteredRecipes.length,
      skip: 0,
      limit: filteredRecipes.length,
    };
    return filteredObject;
  }

  async function fetchAndFilter() {
    try {
      if (!selectedCuisine || !selectedMealType || !selectedDifficulty) {
        return;
      }
      const commonIds = await findCommonIds(
        selectedCuisine,
        selectedMealType,
        selectedDifficulty
      );
      const filterObj = await filterObjectsById(allRecipes, commonIds);
      updateCatalog(filterObj);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAndFilter();
    // eslint-disable-next-line
  }, [selectedCuisine, selectedMealType, selectedDifficulty]);

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
              onChange={() => difficultyFilter("Любая")}
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

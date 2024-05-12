import "../styles/home.css";
import React, { useState, useEffect } from "react";
import { Selectors } from "../components/Selectors";
import { Description } from "../components/Description";
import { Additional } from "../components/Additional";
import { Header } from "../components/Header";
import { CardsList } from "../components/CardsList";
import { getAllRecipes } from "../api";
// import { Loader } from "../components/Loader";

function Home() {
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRecipes()
      .then((data) => {
        setCatalog(data.recipes);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateCatalog = async (filteredData) => {
    setCatalog(filteredData.recipes);
  };

  //can add {loading && <Loader />}

  return (
    <>
      <Header
        title={"Сборник рецептов из разных стран мира"}
        fontSize={"24px"}
        margin={"12px 0px"}
      />
      <div className="home-container">
        <div className="block_search">
          <Description />
          <Selectors updateCatalog={updateCatalog} />
          <Additional />
        </div>

        <div className="block_result">
          <Header
            title={"Найденные рецепты"}
            fontSize={"20px"}
            count={catalog.length > 0 ? catalog.length : " "}
            margin={"0px"}
          />
          <CardsList recipeData={catalog} />
        </div>
      </div>
    </>
  );
}

export { Home };

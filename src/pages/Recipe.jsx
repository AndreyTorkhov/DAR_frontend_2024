import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleResipe } from "../api";

import "../styles/recipe.css";
import vectorBtn from "../img/Vector.png";

import { Header } from "../components/Header";
import { InfoItems } from "../components/InfoItems";
import { InstructionInfo } from "../components/InstuctionInfo";
import { ImageGallery } from "../components/ImageGalery";
import { Loader } from "../components/Loader";

function Recipe() {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate(-1);
  const goBack = () => navigate(-1);

  useEffect(() => {
    getSingleResipe(id)
      .then((data) => {
        setRecipe(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  //can add loader

  // if (loading) {
  //   return <Loader />;
  // }

  if (id > 30) {
    return <h1>Блюдо не найдено</h1>;
  }

  const totalTimeInMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <>
      <Header
        title={recipe.name}
        fontSize={"24px"}
        margin={"12px 0px"}
        button={
          <button className="recipe-btn" onClick={goBack}>
            <img src={vectorBtn} alt="recipe-btn" />
          </button>
        }
      />
      <div className="recipe-container">
        <div className="recipe-info">
          <InfoItems
            title="Кухня"
            description={recipe.cuisine}
            descriptionStyle={{
              color: "black",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          />
          <InfoItems
            title="Теги"
            description={
              recipe.tags && recipe.tags.length > 0 ? `#${recipe.tags[0]}` : ""
            }
            descriptionStyle={{
              color: "#8F8F8F",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          />
          <InfoItems
            title="Калорийность"
            description={`${recipe.caloriesPerServing} ккал`}
            descriptionStyle={{
              color: "black",
              fontSize: "16px",
              lineHeight: "24px",
            }}
            additionalSpanText={"на 100 грамм"}
            spanStyle={{
              marginTop: "8px",
              display: "block",
              color: "#8F8F8F",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          />
          <InfoItems
            title="Количество порций"
            description={recipe.servings}
            descriptionStyle={{
              color: "black",
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: "bold",
            }}
          />
          <InfoItems
            title="Описание"
            description="Традиционное итальянское блюдо, изначально в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и прочие продукты. Небольшую пиццу иногда называют пиццеттой."
            descriptionStyle={{
              color: "#8F8F8F",
              fontSize: "14px",
              lineHeight: "auto",
            }}
          />
        </div>
        <div className="recipe-instuction">
          <InfoItems
            title="Общее время приготовления"
            description={`${totalTimeInMinutes} минут`}
            descriptionStyle={{
              color: "black",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          />
          <InstructionInfo
            title="Инструкции по приготовлению"
            instructions={recipe.instructions || []}
            descriptionStyle={{
              color: "black",
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: "bold",
            }}
          />
        </div>
        <div className="recipe-photo">
          <ImageGallery
            images={recipe.image}
            cardsPerPage={1}
            totalCards={1}
            currentPage={0}
            paginate={() => {}}
          />
        </div>
      </div>
    </>
  );
}
export { Recipe };

import { CardsItem } from "./CardsItem";
import React, { useState, useEffect } from "react";
import "../styles/cards.css";
import { Pagination } from "./Pagination";

function CardsList({ recipeData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = Array.isArray(recipeData)
    ? recipeData.slice(indexOfFirstCard, indexOfLastCard)
    : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipeData]);

  return (
    <div className="list-container">
      <div className="list">
        {currentCards.map((card, index) => (
          <CardsItem key={index} {...card} />
        ))}
      </div>
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={Array.isArray(recipeData) ? recipeData.length : 0}
        paginate={paginate}
      />
    </div>
  );
}

export { CardsList };

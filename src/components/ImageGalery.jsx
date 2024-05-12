import React from "react";
import { Pagination } from "./Pagination";
import "../styles/imageGallery.css";

function ImageGallery({
  images,
  cardsPerPage,
  totalCards,
  currentPage,
  paginate,
}) {
  return (
    <div className="image-gallery">
      <div className="images-container">
        {images && <img src={images} alt="recipe" className="image" />}
      </div>
      <div className="pagination-container">
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={totalCards}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export { ImageGallery };

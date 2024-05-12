import React from "react";
import "../styles/instructionInfo.css";
import dot from "../img/Rectangle.png";

function InstructionInfo({ title, instructions, descriptionStyle }) {
  return (
    <div className="info-item">
      <div className="info-header">
        <h2 className="info-title">{title}</h2>
      </div>
      <div className="divider"></div>
      <div className="info-description" style={descriptionStyle}>
        {instructions.map((instruction, index) => (
          <div className="instruction-container" key={index}>
            <img src={dot} alt="dot" className="dot" />
            <p className="instruction-text">{instruction}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { InstructionInfo };

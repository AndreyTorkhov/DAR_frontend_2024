import React from "react";
import "../styles/infoItems.css";

function InfoItems({
  title,
  description,
  descriptionStyle,
  additionalSpanText,
  spanStyle,
}) {
  return (
    <div className="info-item">
      <div className="info-header">
        <h2 className="info-title">{title}</h2>
      </div>
      <div className="divider"></div>
      <div className="info-description" style={descriptionStyle}>
        {description}
        {additionalSpanText && (
          <span style={spanStyle}>{additionalSpanText}</span>
        )}
      </div>
    </div>
  );
}

export { InfoItems };

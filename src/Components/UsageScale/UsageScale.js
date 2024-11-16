import React from "react";
import "./UsageScale.css";

const UsageScale = () => {
  const usageCategories = [
    { label: "> $5K", percentage: 36, color: "#0d3b66" },
    { label: "$1K - $5K", percentage: 24, color: "#4a90e2" },
    { label: "$500 - $1K", percentage: 20, color: "#91d1f0" },
    { label: "< $500", percentage: 20, color: "#c6e5f2" },
  ];

  return (
    <div className="scale-container">
      <div className="scale-bar">
        {usageCategories.map((category, index) => (
          <div
            key={index}
            className="scale-segment"
            style={{
              width: `${category.percentage}%`,
              backgroundColor: category.color,
            }}
          ></div>
        ))}
      </div>
      <div className="scale-labels">
        {usageCategories.map((category, index) => (
          <div key={index} className="scale-label">
            <div
              className="scale-color-box"
              style={{ backgroundColor: category.color }}
            ></div>
            <span>
              {category.label} - {category.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageScale;

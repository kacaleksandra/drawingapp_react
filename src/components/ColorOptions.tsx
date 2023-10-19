import React from "react";

type ColorOptionsProps = {
  colors: string[];
  selectedColor: string;
  handleColorClick: (color: string) => void;
  handleColorPickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ColorOptions({
  colors,
  selectedColor,
  handleColorClick,
  handleColorPickerChange,
}: ColorOptionsProps) {
  return (
    <div className="row colors">
      <label className="title">Colors</label>
      <ul className="options">
        {colors.slice(0, 4).map((color: string, index: number) => (
          <li
            key={index}
            className={`option ${selectedColor === color ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          ></li>
        ))}
        <li
          className={`option ${selectedColor === colors[4] ? "selected" : ""}`}
        >
          <input
            type="color"
            id="color-picker"
            value={selectedColor}
            onChange={handleColorPickerChange}
          />
        </li>
      </ul>
    </div>
  );
}

export default ColorOptions;

import React, { useRef, useState, useEffect } from "react";
import { drawRect } from "@/fuctions/drawRect";
import { drawTriangle } from "@/fuctions/drawTriangle";
import { drawCircle } from "@/fuctions/drawCircle";
import { drawLine } from "@/fuctions/drawLine";
import { saveFile } from "@/fuctions/saveFile";
import ToolOption from "@/components/ToolOption";
import ColorOptions from "@/components/ColorOptions";

function DrawingApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState("brush");
  const [brushWidth, setBrushWidth] = useState(5);
  const [selectedColor, setSelectedColor] = useState("#000");
  const [colors, setColors] = useState(["#000", "#00f", "#f00", "#0f0", ""]);
  const [prevMouseX, setPrevMouseX] = useState(0);
  const [prevMouseY, setPrevMouseY] = useState(0);
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);
  const [fillColor, setFillColor] = useState(false);

  const handleColorPickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);

    // Aktualizacja tła elementu rodzica
    if (event.target.parentElement) {
      event.target.parentElement.style.background = newColor;
    }

    // Aktualizacja koloru w tablicy kolorów
    const newColors = [...colors];
    newColors[4] = newColor;
    setColors(newColors);
  };

  const setCanvasBackground = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = selectedColor;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    setCanvasBackground();
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setPrevMouseX(e.nativeEvent.offsetX);
    setPrevMouseY(e.nativeEvent.offsetY);

    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.beginPath();
        ctx.lineWidth = brushWidth;
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.fillStyle = selectedColor;
        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setSnapshot(snapshot);
      }
    }
  };

  const drawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.putImageData(snapshot as ImageData, 0, 0);

        if (selectedTool === "brush" || selectedTool === "eraser") {
          ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
          ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
          ctx.stroke();
        } else if (selectedTool === "rectangle") {
          drawRect(canvasRef, e, prevMouseX, prevMouseY, fillColor);
        } else if (selectedTool === "circle") {
          drawCircle(canvasRef, e, prevMouseX, prevMouseY, fillColor);
        } else if (selectedTool === "triangle") {
          drawTriangle(canvasRef, e, prevMouseX, prevMouseY, fillColor);
        } else if (selectedTool === "line") {
          drawLine(canvasRef, e, prevMouseX, prevMouseY, fillColor);
        }
      }
    }
  };

  const handleToolClick = (tool: string) => {
    setSelectedTool(tool);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrushWidth(Number(event.target.value));
  };

  const handleColorClick = (color: String) => {
    if (color !== "") {
      setSelectedColor(String(color));
    }
  };

  const handleClearCanvasClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setCanvasBackground();
    }
  };

  const handleFillColorChange = () => {
    setFillColor(!fillColor);
  };

  return (
    <div className="container">
      <section className="tools-board">
        <div className="row">
          <label className="title">Shapes</label>
          <ul className="options">
            <ToolOption
              iconSrc="/rectangle.svg"
              label="Rectangle"
              active={selectedTool === "rectangle"}
              onClick={() => handleToolClick("rectangle")}
            />
            <ToolOption
              iconSrc="/circle.svg"
              label="Circle"
              active={selectedTool === "circle"}
              onClick={() => handleToolClick("circle")}
            />
            <ToolOption
              iconSrc="/triangle.svg"
              label="Triangle"
              active={selectedTool === "triangle"}
              onClick={() => handleToolClick("triangle")}
            />
            <ToolOption
              iconSrc="/line.svg"
              label="Line"
              active={selectedTool === "line"}
              onClick={() => handleToolClick("line")}
            />
            <li className="option">
              <input
                type="checkbox"
                id="fill-color"
                checked={fillColor}
                onChange={handleFillColorChange}
              />
              <label htmlFor="fill-color">Fill color</label>
            </li>
          </ul>
        </div>

        {/* Options */}
        <div className="row">
          <label className="title">Options</label>
          <ul className="options">
            {/* Brush */}
            <ToolOption
              iconSrc="/brush.svg"
              label="Brush"
              active={selectedTool === "brush"}
              onClick={() => handleToolClick("brush")}
            />
            {/* Size Slider */}
            <li className="option">
              <input
                type="range"
                id="size-slider"
                min="1"
                max="30"
                value={brushWidth}
                onChange={handleSliderChange}
              />
            </li>
            <ToolOption
              iconSrc="/eraser.svg"
              label="Eraser"
              active={selectedTool === "eraser"}
              onClick={() => handleToolClick("eraser")}
            />
            <ToolOption
              iconSrc="/lineChanger.svg"
              label="Change line"
              active={selectedTool === "lineChanger"}
              onClick={() => handleToolClick("lineChanger")}
            />
          </ul>
        </div>

        {/* Colors */}
        <ColorOptions
          colors={colors}
          selectedColor={selectedColor}
          handleColorClick={handleColorClick}
          handleColorPickerChange={handleColorPickerChange}
        />

        {/* Buttons */}
        <div className="row buttons">
          <button className="clear-canvas" onClick={handleClearCanvasClick}>
            Clear Canvas
          </button>
          <button className="save-img" onClick={() => saveFile(canvasRef)}>
            Save As Image
          </button>
        </div>
      </section>

      {/* Drawing Board */}
      <section className="drawing-board">
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={drawing}
          onMouseUp={() => setIsDrawing(false)}
        ></canvas>
      </section>
    </div>
  );
}

export default DrawingApp;

export function drawTriangle(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  e: React.MouseEvent<HTMLCanvasElement>,
  prevMouseX: number,
  prevMouseY: number,
  fillColor: boolean
) {
  const canvas = canvasRef.current;
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx.closePath();
  if (fillColor) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

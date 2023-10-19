export function drawCircle(
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
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.nativeEvent.offsetX, 2) +
      Math.pow(prevMouseY - e.nativeEvent.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  if (fillColor) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

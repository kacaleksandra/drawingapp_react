export function drawRect(
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
  if (!fillColor) {
    ctx.strokeRect(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
      prevMouseX - e.nativeEvent.offsetX,
      prevMouseY - e.nativeEvent.offsetY
    );
  } else {
    ctx.fillRect(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
      prevMouseX - e.nativeEvent.offsetX,
      prevMouseY - e.nativeEvent.offsetY
    );
  }
}

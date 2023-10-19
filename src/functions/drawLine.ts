export function drawLine(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  e: React.MouseEvent<HTMLCanvasElement>,
  prevX: number,
  prevY: number,
  fillColor: boolean
) {
  const canvas = canvasRef.current;

  if (canvas) {
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);

      if (fillColor) {
        ctx.stroke();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}

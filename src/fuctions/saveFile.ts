export function saveFile(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const canvas = canvasRef.current;
  if (!canvas) {
    return;
  }
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvasRef.current.toDataURL();
  link.click();
}

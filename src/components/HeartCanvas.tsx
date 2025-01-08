import React, { useRef, useEffect } from "react";

interface HeartCanvasProps {
  brushWidth?: number; // Brush stroke width
  componentWidth?: number; // Width of the canvas
}

const HeartCanvas: React.FC<HeartCanvasProps> = ({
  brushWidth = 4, // Default brush stroke width
  componentWidth = 400, // Default component width
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Define heart size based on component width
    const heartWidth = componentWidth;
    const heartHeight = (componentWidth * 350) / 400; // Maintain aspect ratio

    // Set canvas size to fit the heart
    canvas.width = heartWidth;
    canvas.height = heartHeight;

    const centerX = heartWidth / 2;
    const centerY = heartHeight / 2;

    let angle = 0;

    // Function to calculate heart points
    const getHeartPoint = (t: number): [number, number] => {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );
      return [centerX + x * (heartWidth / 40), centerY + y * (heartWidth / 40)]; // Scale the heart
    };

    // Animation function
    const drawHeart = () => {
      if (angle >= 2 * Math.PI) return;

      const [currentX, currentY] = getHeartPoint(angle);
      const [nextX, nextY] = getHeartPoint(angle + 0.02);

      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      ctx.lineTo(nextX, nextY);
      ctx.strokeStyle = "red";
      ctx.lineWidth = brushWidth; // Use parameter for brush width
      ctx.lineCap = "round";
      ctx.stroke();

      angle += 0.02;
      requestAnimationFrame(drawHeart);
    };

    // Start drawing the heart
    drawHeart();
  }, [brushWidth, componentWidth]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        backgroundColor: "transparent",
        width: `${componentWidth}px`,
        height: "auto", // Maintain aspect ratio
      }}
      className="animate-pulse"
    />
  );
};

export default HeartCanvas;

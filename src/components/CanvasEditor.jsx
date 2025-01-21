import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useParams } from "react-router-dom";

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);
  const { id } = useParams();
  const imgUrl = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasInstance.current = new fabric.Canvas(canvasRef.current);
    canvasInstance.current.setWidth(600);
    canvasInstance.current.setHeight(400);
    const imgElement = document.createElement("img");
    imgElement.src = imgUrl;
    imgElement.crossOrigin = "Anonymous";
    imgElement.onload = function () {
      const objects = canvasInstance.current.getObjects();
      objects.forEach((obj) => {
        if (obj.type === "image") {
          canvasInstance.current.remove(obj);
        }
      });
      let image = new fabric.Image(imgElement, { left: 0, top: 0 });
      image.scaleToWidth(canvasInstance.current.width);
      canvasInstance.current.backgroundImage = image;
      canvasInstance.current.renderAll();
    };

    return () => {
      if (canvasInstance.current) {
        canvasInstance.current.dispose();
      }
    };
  }, [imgUrl]);

  const addText = () => {
    const text = new fabric.Textbox("Edit Text Here", {
      left: 100,
      top: 100,
      fontSize: 30,
      fill: "black",
      fontFamily: "Arial",
    });
    canvasInstance.current.add(text);
    canvasInstance.current.renderAll();
  };

  const addShape = (shape) => {
    let newShape;
    switch (shape) {
      case "circle":
        newShape = new fabric.Circle({
          left: 200,
          top: 200,
          radius: 50,
          fill: "red",
        });
        break;
      case "rectangle":
        newShape = new fabric.Rect({
          left: 300,
          top: 200,
          width: 100,
          height: 50,
          fill: "blue",
        });
        break;
      case "triangle":
        newShape = new fabric.Triangle({
          left: 400,
          top: 200,
          width: 60,
          height: 60,
          fill: "green",
        });
        break;
      default:
        return;
    }
    canvasInstance.current.add(newShape);
    canvasInstance.current.renderAll();
  };

  const handleDownload = () => {
    const dataUrl = canvasInstance.current.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas-image.png";
    link.click();
  };

  return (
    <div className="container text-center">
      <div className="canvas-container mb-4">
        <canvas ref={canvasRef} className="border" />
      </div>
      <div>
        <button className="btn btn-success me-2" onClick={addText}>
          Add Caption
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={() => addShape("circle")}
        >
          Add Circle
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => addShape("rectangle")}
        >
          Add Rectangle
        </button>
        <button
          className="btn btn-warning"
          onClick={() => addShape("triangle")}
        >
          Add Triangle
        </button>
        <button className="btn btn-secondary mt-3" onClick={handleDownload}>
          Download Image
        </button>
      </div>
    </div>
  );
};

export default CanvasEditor;

"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo } from "react";

const productShapes = {
  tshirt: {
    width: 320,
    height: 360,
    radius: 32,
    neckHeight: 60,
  },
  hoodie: {
    width: 340,
    height: 380,
    radius: 38,
    neckHeight: 80,
  },
  cap: {
    width: 280,
    height: 200,
    radius: 140,
    neckHeight: 0,
  },
};

function renderNeck(productType) {
  if (productType === "cap") {
    return null;
  }

  const isHoodie = productType === "hoodie";

  return (
    <div
      className={`preview-neck ${isHoodie ? "preview-neck--hoodie" : ""}`}
    />
  );
}

export default function ProductPreview({
  productType,
  color,
  textOptions,
  imageOptions,
}) {
  const shape = productShapes[productType];

  const displayText = useMemo(() => {
    const text = textOptions.value.trim();
    if (!text) return null;
    return textOptions.transform === "uppercase" ? text.toUpperCase() : text;
  }, [textOptions.value, textOptions.transform]);

  return (
    <div className="preview-card">
      <div className={`preview-stage preview-stage--${productType}`}>
        <div
          className="preview-garment"
          style={{
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            borderRadius: shape.radius,
            background: color.hex,
            boxShadow:
              productType === "cap"
                ? "0 12px 30px rgba(0,0,0,0.18)"
                : "0 20px 40px rgba(0,0,0,0.16)",
          }}
        >
          {renderNeck(productType)}
          <div
            className={`preview-print-area preview-print-area--${productType}`}
          >
            {imageOptions.src && (
              <img
                src={imageOptions.src}
                alt="Uploaded design"
                style={{
                  width: `${imageOptions.scale}%`,
                  left: `${imageOptions.position.x}%`,
                  top: `${imageOptions.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="preview-layer preview-layer--image"
              />
            )}
            {displayText && (
              <span
                className="preview-layer preview-layer--text"
                style={{
                  color: textOptions.color,
                  fontSize: `${textOptions.size}px`,
                  fontFamily: textOptions.font,
                  fontWeight: textOptions.weight,
                  letterSpacing: `${textOptions.letterSpacing}px`,
                  textAlign: textOptions.align,
                  maxWidth: textOptions.maxWidth,
                  left: `${textOptions.position.x}%`,
                  top: `${textOptions.position.y}%`,
                  transform: "translate(-50%, -50%)",
                  textShadow: textOptions.shadow
                    ? "0 4px 12px rgba(0,0,0,0.25)"
                    : "none",
                }}
              >
                {displayText}
              </span>
            )}
          </div>
        </div>
      </div>
      <dl className="preview-meta">
        <div>
          <dt>Product</dt>
          <dd>{productType === "tshirt" ? "T-Shirt" : productType === "hoodie" ? "Hoodie" : "Cap"}</dd>
        </div>
        <div>
          <dt>Fabric Color</dt>
          <dd>{color.name}</dd>
        </div>
        {displayText && (
          <div>
            <dt>Typography</dt>
            <dd>{textOptions.font}</dd>
          </div>
        )}
        {imageOptions.src && (
          <div>
            <dt>Graphic</dt>
            <dd>Custom artwork uploaded</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

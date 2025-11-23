"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProductPreview from "./ProductPreview";
import { calculatePrice } from "../lib/pricing";

const fonts = [
  "Inter",
  "Montserrat",
  "Roboto Condensed",
  "Playfair Display",
  "Oswald",
  "Bebas Neue",
];

const products = {
  tshirt: {
    name: "Performance T-Shirt",
    basePrice: 80,
    leadTime: "48h prep | 3-5d delivery",
    colors: [
      { name: "Casablanca White", hex: "#f5f7fa" },
      { name: "Marina Blue", hex: "#132a7c" },
      { name: "Sahara Sand", hex: "#d9b68d" },
      { name: "Atlas Black", hex: "#101012" },
      { name: "Emerald Rif", hex: "#0f6e5f" },
    ],
  },
  hoodie: {
    name: "Premium Hoodie",
    basePrice: 160,
    leadTime: "72h prep | 4-6d delivery",
    colors: [
      { name: "Midnight Navy", hex: "#19223c" },
      { name: "Light Dove", hex: "#e5e7eb" },
      { name: "Berber Red", hex: "#b91c1c" },
      { name: "Palm Grove", hex: "#14532d" },
      { name: "Charcoal Mist", hex: "#374151" },
    ],
  },
  cap: {
    name: "Streetwear Cap",
    basePrice: 90,
    leadTime: "24h prep | 2-4d delivery",
    colors: [
      { name: "Summer Sand", hex: "#eabf8a" },
      { name: "Anfa Beige", hex: "#f5e8d5" },
      { name: "Yves Blue", hex: "#1d4ed8" },
      { name: "Palm Green", hex: "#1e7a5f" },
      { name: "Carbon Grey", hex: "#111827" },
    ],
  },
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const baseTextOptions = {
  value: "Atlas Print Studio",
  font: "Inter",
  size: 32,
  color: "#111",
  weight: 600,
  align: "center",
  letterSpacing: 1,
  transform: "none",
  shadow: false,
  position: { x: 50, y: 45 },
  maxWidth: "85%",
};

const baseImageOptions = {
  src: "",
  scale: 55,
  position: { x: 50, y: 55 },
};

const createTextOptions = () => ({
  ...baseTextOptions,
  position: { ...baseTextOptions.position },
});

const createImageOptions = () => ({
  ...baseImageOptions,
  position: { ...baseImageOptions.position },
});

export default function ProductCustomizer() {
  const [productType, setProductType] = useState("tshirt");
  const [color, setColor] = useState(products.tshirt.colors[0]);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(25);
  const [textOptions, setTextOptions] = useState(createTextOptions);
  const [imageOptions, setImageOptions] = useState(createImageOptions);
  const [orderItems, setOrderItems] = useState([]);
  const [notes, setNotes] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Casablanca",
  });
  const [submissionState, setSubmissionState] = useState({
    status: "idle",
    message: "",
    orderId: "",
  });

  useEffect(() => {
    setColor(products[productType].colors[0]);
  }, [productType]);

  useEffect(() => {
    setSize("M");
    setQuantity(25);
  }, [productType]);

  const unitQuote = useMemo(() => {
    const printMode = imageOptions.src
      ? "fullColor"
      : textOptions.value.trim()
      ? "singleColor"
      : "blank";
    return calculatePrice(productType, quantity, {
      printMode,
      rush: false,
    });
  }, [imageOptions.src, productType, quantity, textOptions.value]);

  const handleUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = /^image\/(png|jpe?g|svg\+xml)$/i.test(file.type);
    if (!isImage) {
      alert("Please upload a PNG, JPG, or SVG file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageOptions((prev) => ({
        ...prev,
        src: e.target?.result?.toString() ?? "",
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAddItem = useCallback(() => {
    const details = {
      id: `${productType}-${Date.now()}`,
      productType,
      productLabel: products[productType].name,
      color,
      size,
      quantity,
      textOptions,
      image: Boolean(imageOptions.src),
      unitPrice: unitQuote.unit,
      itemTotal: unitQuote.total,
      leadTime: products[productType].leadTime,
    };

    setOrderItems((prev) => [...prev, details]);
    setTextOptions(createTextOptions());
    setImageOptions(createImageOptions());
    setQuantity(25);
    setSize("M");
    setSubmissionState({ status: "idle", message: "", orderId: "" });
  }, [color, imageOptions.src, productType, quantity, size, textOptions, unitQuote.total, unitQuote.unit]);

  const orderTotal = useMemo(
    () =>
      orderItems.reduce((acc, item) => {
        return acc + item.itemTotal;
      }, unitQuote.total),
    [orderItems, unitQuote.total]
  );

  const handleSubmitOrder = useCallback(
    async (event) => {
      event.preventDefault();
      if (!textOptions.value.trim() && !imageOptions.src) {
        setSubmissionState({
          status: "error",
          message:
            "Add at least text or upload an artwork before requesting fulfillment.",
          orderId: "",
        });
        return;
      }

      if (!customer.name || !customer.email || !customer.phone) {
        setSubmissionState({
          status: "error",
          message: "Customer name, email, and phone are required.",
          orderId: "",
        });
        return;
      }

      const payload = {
        customer,
        order: {
          currency: "MAD",
          primaryItem: {
            productType,
            color,
            size,
            quantity,
            textOptions,
            imageAttached: Boolean(imageOptions.src),
            unitPrice: unitQuote.unit,
            total: unitQuote.total,
            leadTime: products[productType].leadTime,
          },
          cart: orderItems,
          notes,
          grandTotal: orderTotal,
        },
        requestedAt: new Date().toISOString(),
      };

      try {
        setSubmissionState({ status: "loading", message: "", orderId: "" });
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to create order");
        }

        const data = await response.json();

        setSubmissionState({
          status: "success",
          message:
            "Order brief received. Our production lead will contact you in less than 2 hours.",
          orderId: data.orderId,
        });

        setOrderItems([]);
      } catch (error) {
        setSubmissionState({
          status: "error",
          message: "Something went wrong while sending the order. Try again.",
          orderId: "",
        });
      }
    },
    [color, customer, imageOptions.src, notes, orderItems, orderTotal, productType, size, textOptions, unitQuote.total, unitQuote.unit, quantity]
  );

  return (
    <section id="customizer" className="section customizer">
      <div className="section-header">
        <span className="eyebrow">Live Product Personalizer</span>
        <h2>
          Bring your Moroccan streetwear brand to life in minutes
        </h2>
        <p>
          Pick a garment, upload or write your artwork, preview in real-time,
          and send the order straight to Atlas Print Studio. We print in-house
          and deliver nationwide via Amana or Aramex.
        </p>
      </div>

      <div className="customizer-grid">
        <div className="customizer-panel">
          <div className="field-group">
            <label htmlFor="productType">Product</label>
            <div className="pill-group">
              {Object.entries(products).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  className={`pill ${productType === key ? "is-active" : ""}`}
                  onClick={() => setProductType(key)}
                >
                  <span>{item.name}</span>
                  <small>{item.basePrice} MAD</small>
                </button>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label>Fabric Color</label>
            <div className="swatch-list">
              {products[productType].colors.map((option) => (
                <button
                  key={option.hex}
                  type="button"
                  className={`swatch ${
                    color.hex === option.hex ? "is-active" : ""
                  }`}
                  style={{ backgroundColor: option.hex }}
                  onClick={() => setColor(option)}
                >
                  <span className="swatch-label">{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field-group">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
                {sizes.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                min={10}
                max={500}
                step={5}
                value={quantity}
                onChange={(event) =>
                  setQuantity(Number.parseInt(event.target.value, 10) || 10)
                }
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="text">Add text</label>
            <textarea
              id="text"
              rows={3}
              placeholder="Write a slogan, team name, or quote…"
              value={textOptions.value}
              onChange={(event) =>
                setTextOptions((prev) => ({
                  ...prev,
                  value: event.target.value,
                }))
              }
            />
          </div>

          <div className="grid grid-2">
            <div className="field-group">
              <label htmlFor="font">Font</label>
              <select
                id="font"
                value={textOptions.font}
                onChange={(event) =>
                  setTextOptions((prev) => ({
                    ...prev,
                    font: event.target.value,
                  }))
                }
              >
                {fonts.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-group">
              <label htmlFor="textColor">Text color</label>
              <input
                id="textColor"
                type="color"
                value={textOptions.color}
                onChange={(event) =>
                  setTextOptions((prev) => ({
                    ...prev,
                    color: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field-group">
              <label htmlFor="fontSize">Font size</label>
              <input
                id="fontSize"
                type="range"
                min={16}
                max={72}
                value={textOptions.size}
                onChange={(event) =>
                  setTextOptions((prev) => ({
                    ...prev,
                    size: Number(event.target.value),
                  }))
                }
              />
            </div>
            <div className="field-group">
              <label htmlFor="letterSpacing">Letter spacing</label>
              <input
                id="letterSpacing"
                type="range"
                min={0}
                max={6}
                value={textOptions.letterSpacing}
                onChange={(event) =>
                  setTextOptions((prev) => ({
                    ...prev,
                    letterSpacing: Number(event.target.value),
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field-group">
              <label htmlFor="textX">Text horizontal</label>
              <input
                id="textX"
                type="range"
                min={30}
                max={70}
                value={textOptions.position.x}
                onChange={(event) =>
                  setTextOptions((prev) => ({
                    ...prev,
                    position: {
                      ...prev.position,
                      x: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
            <div className="field-group">
              <label htmlFor="textY">Text vertical</label>
              <input
                id="textY"
                type="range"
                min={35}
                max={65}
                value={textOptions.position.y}
                onChange={(event) =>
                  setTextOptions((prev) => ({
                    ...prev,
                    position: {
                      ...prev.position,
                      y: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="field-group field-group--row">
            <label>Alignment</label>
            <div className="pill-group">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  type="button"
                  className={`pill ${
                    textOptions.align === align ? "is-active" : ""
                  }`}
                  onClick={() =>
                    setTextOptions((prev) => ({
                      ...prev,
                      align,
                    }))
                  }
                >
                  {align}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`toggle ${textOptions.transform === "uppercase" ? "is-active" : ""}`}
              onClick={() =>
                setTextOptions((prev) => ({
                  ...prev,
                  transform:
                    prev.transform === "uppercase" ? "none" : "uppercase",
                }))
              }
            >
              Uppercase
            </button>
            <button
              type="button"
              className={`toggle ${textOptions.shadow ? "is-active" : ""}`}
              onClick={() =>
                setTextOptions((prev) => ({
                  ...prev,
                  shadow: !prev.shadow,
                }))
              }
            >
              Drop shadow
            </button>
          </div>

          <div className="field-group">
            <label htmlFor="artwork">Upload artwork</label>
            <input
              id="artwork"
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              onChange={handleUpload}
            />
            {imageOptions.src && (
              <div className="grid grid-3">
                <div className="field-group">
                  <label htmlFor="imageScale">Artwork scale</label>
                  <input
                    id="imageScale"
                    type="range"
                    min={35}
                    max={100}
                    value={imageOptions.scale}
                    onChange={(event) =>
                      setImageOptions((prev) => ({
                        ...prev,
                        scale: Number(event.target.value),
                      }))
                    }
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="imageX">Artwork horizontal</label>
                  <input
                    id="imageX"
                    type="range"
                    min={35}
                    max={65}
                    value={imageOptions.position.x}
                    onChange={(event) =>
                      setImageOptions((prev) => ({
                        ...prev,
                        position: {
                          ...prev.position,
                          x: Number(event.target.value),
                        },
                      }))
                    }
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="imageY">Artwork vertical</label>
                  <input
                    id="imageY"
                    type="range"
                    min={35}
                    max={75}
                    value={imageOptions.position.y}
                    onChange={(event) =>
                      setImageOptions((prev) => ({
                        ...prev,
                        position: {
                          ...prev.position,
                          y: Number(event.target.value),
                        },
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="quote-card">
            <div>
              <h3>{unitQuote.unit.toFixed(2)} MAD</h3>
              <p>Estimated unit cost · screen + DTG ready</p>
            </div>
            <dl>
              <div>
                <dt>Setup & prepress</dt>
                <dd>{unitQuote.setup.toFixed(2)} MAD</dd>
              </div>
              <div>
                <dt>Quantity</dt>
                <dd>{quantity} pcs</dd>
              </div>
              <div>
                <dt>Line total</dt>
                <dd>{unitQuote.total.toFixed(2)} MAD</dd>
              </div>
            </dl>
            <button type="button" className="primary" onClick={handleAddItem}>
              Add to production queue
            </button>
          </div>
        </div>

        <ProductPreview
          productType={productType}
          color={color}
          textOptions={textOptions}
          imageOptions={imageOptions}
        />

        <aside className="customizer-summary">
          <h3>Production brief</h3>
          <p>
            Final pricing confirmed after artwork preflight. You receive the
            design proof, invoice, and delivery schedule by email/WhatsApp.
          </p>

          <ul className="order-list">
            <li className="order-list-item">
              <div>
                <strong>{products[productType].name}</strong>
                <span>
                  {quantity} pcs · {size} · {color.name}
                </span>
              </div>
              <span>{unitQuote.total.toFixed(2)} MAD</span>
            </li>
            {orderItems.map((item) => (
              <li key={item.id} className="order-list-item secondary">
                <div>
                  <strong>{item.productLabel}</strong>
                  <span>
                    {item.quantity} pcs · {item.size} · {item.color.name}
                  </span>
                </div>
                <span>{item.itemTotal.toFixed(2)} MAD</span>
              </li>
            ))}
          </ul>

          <div className="order-total">
            <span>Total estimated (MAD)</span>
            <strong>{orderTotal.toFixed(2)}</strong>
          </div>

          <form className="customer-form" onSubmit={handleSubmitOrder}>
            <div className="grid grid-2">
              <div className="field-group">
                <label htmlFor="customerName">Contact name</label>
                <input
                  id="customerName"
                  type="text"
                  required
                  value={customer.name}
                  onChange={(event) =>
                    setCustomer((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="field-group">
                <label htmlFor="customerEmail">Email</label>
                <input
                  id="customerEmail"
                  type="email"
                  required
                  value={customer.email}
                  onChange={(event) =>
                    setCustomer((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-2">
              <div className="field-group">
                <label htmlFor="customerPhone">Phone / WhatsApp</label>
                <input
                  id="customerPhone"
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(event) =>
                    setCustomer((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="field-group">
                <label htmlFor="customerCity">City</label>
                <input
                  id="customerCity"
                  type="text"
                  value={customer.city}
                  onChange={(event) =>
                    setCustomer((prev) => ({
                      ...prev,
                      city: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="notes">Production notes</label>
              <textarea
                id="notes"
                rows={4}
                placeholder="Inks, packaging, delivery window…"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>

            <button
              className="primary"
              type="submit"
              disabled={submissionState.status === "loading"}
            >
              {submissionState.status === "loading"
                ? "Sending order…"
                : "Request production & delivery"}
            </button>

            {submissionState.status === "success" && (
              <p className="status success">
                ✔ {submissionState.message} Order ID:{" "}
                <strong>{submissionState.orderId}</strong>
              </p>
            )}
            {submissionState.status === "error" && (
              <p className="status error">⚠ {submissionState.message}</p>
            )}
          </form>
        </aside>
      </div>
    </section>
  );
}

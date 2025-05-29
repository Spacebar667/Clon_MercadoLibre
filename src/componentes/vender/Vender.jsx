import { useState } from "react";
import "./Vender.css";

function Vender() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price) {
      setMessage("El título y precio son obligatorios");
      return;
    }

    console.log("Producto para vender:", formData);

    setMessage("Producto enviado para revisión");
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
  };

  return (
    <div className="vender-container">
      <h2>Vender un producto</h2>
      <form onSubmit={handleSubmit} className="vender-form">
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </label>

        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Categoría:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Imagen:
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>

        <button type="submit">Publicar producto</button>
      </form>

      {message && <p className="vender-message">{message}</p>}
    </div>
  );
}

export default Vender;

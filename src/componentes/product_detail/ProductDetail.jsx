import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";  // IMPORTAR useAuth
import ProductCard from "../product_card/ProductCard";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();                   // OBTENER navigate
  const { isLoggedIn } = useAuth();                  // OBTENER estado de login

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([
    { id: 1, user: "Ana", rating: 4, comment: "Muy buen producto." },
    { id: 2, user: "Luis", rating: 5, comment: "Excelente calidad!" },
  ]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [showAdded, setShowAdded] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail);

        fetch(`https://dummyjson.com/products/category/${encodeURIComponent(data.category)}`)
          .then(res => res.json())
          .then(catData => {
            const related = catData.products.filter(p => p.id !== Number(id));
            setRelatedProducts(related);
          });
      })
      .catch((err) => console.error("Error al cargar el producto:", err));
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  const Star = ({ filled }) => (
    <span style={{ color: filled ? "#ffc107" : "#e4e5e9", fontSize: "20px" }}>
      ★
    </span>
  );

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newRating === 0 || newComment.trim() === "") {
      alert("Calificación y comentario son obligatorios");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      user: "Usuario",
      rating: newRating,
      comment: newComment,
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment("");
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { message: "Debes tener cuenta para agregar al carrito" } });
      return;
    }
    addToCart(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-images">
          <img
            className="main-image"
            src={mainImage}
            alt={product.title}
          />
          <div className="thumbnail-list">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Imagen ${i + 1}`}
                className="thumbnail"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1>{product.title}</h1>
          <p className="product-price">${product.price}</p>
          <button className="buy-button">Comprar ahora</button>
          <button className="add-cart-button" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
          <p className="product-description">{product.description}</p>
        </div>
      </div>

      {showAdded && (
        <div className="added-notification">
          Producto añadido al carrito ✔️
        </div>
      )}

      <section className="reviews-section">
        <h2>Opiniones de compradores</h2>

        {reviews.length === 0 && <p>No hay comentarios aún.</p>}

        {reviews.map((r) => (
          <div key={r.id} className="review-item">
            <div>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} filled={i <= r.rating} />
              ))}
            </div>
            <p><b>{r.user}</b></p>
            <p>{r.comment}</p>
          </div>
        ))}

        <form onSubmit={handleSubmitReview} className="review-form">
          <label>
            Tu calificación:
            <div className="star-select">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`star ${i <= newRating ? "filled" : ""}`}
                  onClick={() => setNewRating(i)}
                  style={{ cursor: "pointer", fontSize: "25px" }}
                >
                  ★
                </span>
              ))}
            </div>
          </label>

          <label>
            Comentario:
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              required
            />
          </label>

          <button type="submit">Enviar comentario</button>
        </form>
      </section>

      <section className="related-products-section">
        <h2>Productos relacionados</h2>
        <div className="related-products-list">
          {relatedProducts.length === 0 && <p>No hay productos relacionados.</p>}
          {relatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Estado para reviews (simulado)
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Ana', rating: 4, comment: 'Muy buen producto.' },
    { id: 2, user: 'Luis', rating: 5, comment: 'Excelente calidad!' },
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  // Componente para mostrar estrella
  const Star = ({ filled }) => (
    <span style={{ color: filled ? '#ffc107' : '#e4e5e9', fontSize: '20px' }}>★</span>
  );

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newRating === 0 || newComment.trim() === '') {
      alert('Calificación y comentario son obligatorios');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      user: 'Usuario', // Aquí podrías poner el usuario real si tienes autenticación
      rating: newRating,
      comment: newComment,
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment('');
  };

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button className="buy-button">Comprar ahora</button>
        <button className="add-cart-button">Agregar al carrito</button>
      </div>

      <section className="reviews-section">
        <h2>Calificaciones y Comentarios</h2>

        {reviews.length === 0 && <p>No hay comentarios aún.</p>}

        {reviews.map(r => (
          <div key={r.id} className="review-item">
            <div>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} filled={i <= r.rating} />)}
            </div>
            <p><b>{r.user}</b></p>
            <p>{r.comment}</p>
          </div>
        ))}

        <form onSubmit={handleSubmitReview} className="review-form">
          <label>
            Tu calificación:
            <div className="star-select">
              {[1, 2, 3, 4, 5].map(i => (
                <span
                  key={i}
                  className={`star ${i <= newRating ? 'filled' : ''}`}
                  onClick={() => setNewRating(i)}
                  style={{ cursor: 'pointer', fontSize: '25px' }}
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
              onChange={e => setNewComment(e.target.value)}
              rows="3"
              required
            />
          </label>

          <button type="submit">Enviar comentario</button>
        </form>
      </section>
    </div>
  );
}

export default ProductDetail;

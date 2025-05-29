import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Opiniones.css";

function Opiniones() {
  const { isLoggedIn, user } = useAuth();

  const [opiniones, setOpiniones] = useState([
    { id: 1, user: "Ana", rating: 4, comment: "Muy buen producto." },
    { id: 2, user: "Luis", rating: 5, comment: "Excelente calidad!" },
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Aquí podrías cargar opiniones desde backend si tienes
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newRating === 0 || newComment.trim() === "") {
      alert("Por favor, agrega una calificación y un comentario.");
      return;
    }

    const nuevaOpinion = {
      id: opiniones.length + 1,
      user: user?.name || "Anónimo",
      rating: newRating,
      comment: newComment,
    };

    setOpiniones([nuevaOpinion, ...opiniones]);
    setNewRating(0);
    setNewComment("");
  };

  if (!isLoggedIn) {
    return <p>Debes iniciar sesión para ver y agregar opiniones.</p>;
  }

  return (
    <div className="opiniones-container">
      <h2>Opiniones de usuarios</h2>

      {opiniones.length === 0 && <p>No hay opiniones aún.</p>}

      {opiniones.map((op) => (
        <div key={op.id} className="opinion-item">
          <strong>{op.user}</strong>
          <div>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`opinion-stars ${i >= op.rating ? "faded" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
          <p>{op.comment}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="opinion-form">
        <label>
          Tu calificación:
          <div>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="opinion-rating-star"
                style={{ color: i <= newRating ? "#ffc107" : "#e4e5e9" }}
                onClick={() => setNewRating(i)}
              >
                ★
              </span>
            ))}
          </div>
        </label>

        <label>
          Tu comentario:
          <textarea
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="opinion-textarea"
          />
        </label>

        <button type="submit" className="opinion-button">
          Enviar opinión
        </button>
      </form>
    </div>
  );
}

export default Opiniones;

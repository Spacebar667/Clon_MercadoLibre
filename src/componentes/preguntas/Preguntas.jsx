import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Preguntas.css"; // Importamos los estilos

const initialPublicQuestions = [
  { id: 1, user: "Admin", question: "¿Cuánto tarda el envío?", answer: "Entre 3 y 5 días hábiles." },
  { id: 2, user: "Admin", question: "¿Hay garantía?", answer: "Sí, garantía de 1 año." },
];

function Preguntas() {
  const { isLoggedIn, user } = useAuth();
  const [publicQuestions, setPublicQuestions] = useState(initialPublicQuestions);
  const [userQuestions, setUserQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setUserQuestions([
        { id: 101, user: user.email, question: "¿Este producto tiene descuento?", answer: null },
      ]);
    } else {
      setUserQuestions([]);
    }
  }, [isLoggedIn, user]);

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) {
      alert("Escribe una pregunta antes de enviar.");
      return;
    }
    const newQ = {
      id: Date.now(),
      user: user.email,
      question: newQuestion.trim(),
      answer: null,
    };
    setUserQuestions([newQ, ...userQuestions]);
    setNewQuestion("");
  };

  return (
    <div className="preguntas-container">
      <h2 className="preguntas-title">Preguntas y Respuestas</h2>

      {!isLoggedIn ? (
        <p className="preguntas-login-message">Debes iniciar sesión para hacer preguntas y ver las tuyas.</p>
      ) : (
        <div className="preguntas-section">
          <h3 className="section-title">Tus Preguntas</h3>
          {userQuestions.length === 0 ? (
            <p>No has hecho preguntas aún.</p>
          ) : (
            <ul className="preguntas-list">
              {userQuestions.map((q) => (
                <li key={q.id} className="pregunta-item">
                  <span className="pregunta-label">Pregunta:</span> {q.question}
                  <br />
                  <span className="respuesta-label">Respuesta:</span>{" "}
                  {q.answer ?? <i>Sin respuesta aún</i>}
                </li>
              ))}
            </ul>
          )}

          <textarea
            placeholder="Escribe tu pregunta aquí"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows={3}
            className="pregunta-textarea"
          />
          <button onClick={handleAddQuestion} className="pregunta-btn">Enviar pregunta</button>
        </div>
      )}

      <div className="preguntas-section">
        <h3 className="section-title">Preguntas Frecuentes</h3>
        <ul className="preguntas-list">
          {publicQuestions.map((q) => (
            <li key={q.id} className="pregunta-item">
              <span className="pregunta-label">Pregunta:</span> {q.question}
              <br />
              <span className="respuesta-label">Respuesta:</span> {q.answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Preguntas;

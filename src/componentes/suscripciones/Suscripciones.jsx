import { useState } from "react";
import "./Suscripciones.css";

function Suscripciones() {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "Suscripción Básica", active: true },
    { id: 2, name: "Suscripción Premium", active: false },
  ]);
  const [newSubscription, setNewSubscription] = useState("");
  const [selected, setSelected] = useState([]);

  const handleAddSubscription = () => {
    const name = newSubscription.trim();
    if (name === "") return;

    const newSub = {
      id: Date.now(),
      name,
      active: true,
    };

    setSubscriptions([...subscriptions, newSub]);
    setNewSubscription("");
  };

  const toggleSubscription = (id) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, active: !sub.active } : sub
      )
    );
    // También elimina de selección si se desactiva
    setSelected((prev) => prev.filter((sid) => sid !== id));
  };

  const toggleSelected = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleRemoveSubscription = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    setSelected(selected.filter((sid) => sid !== id));
  };

  return (
    <div className="suscripciones-container">
      <h2>Mis Suscripciones</h2>

      <div className="suscripciones-input-group">
        <input
          type="text"
          placeholder="Nueva suscripción"
          value={newSubscription}
          onChange={(e) => setNewSubscription(e.target.value)}
        />
        <button onClick={handleAddSubscription}>Agregar</button>
      </div>

      <ul className="suscripciones-list">
        {subscriptions.map((sub) => (
          <li key={sub.id} className="suscripcion-item">
            <div className="suscripcion-left">
              {sub.active && (
                <input
                  type="checkbox"
                  checked={selected.includes(sub.id)}
                  onChange={() => toggleSelected(sub.id)}
                />
              )}
              <span
                className={`suscripcion-nombre ${!sub.active ? "inactiva" : ""}`}
                onClick={() => toggleSubscription(sub.id)}
              >
                {sub.name}
              </span>
            </div>
            <div className="suscripcion-actions">
              <button
                className="btn-toggle"
                onClick={() => toggleSubscription(sub.id)}
              >
                {sub.active ? "Desactivar" : "Activar"}
              </button>
              <button
                className="btn-delete"
                onClick={() => handleRemoveSubscription(sub.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selected.length > 0 && (
        <div className="suscripciones-seleccionadas">
          <h3>Suscripciones seleccionadas:</h3>
          <ul>
            {subscriptions
              .filter((sub) => selected.includes(sub.id))
              .map((sub) => (
                <li key={sub.id}>{sub.name}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Suscripciones;

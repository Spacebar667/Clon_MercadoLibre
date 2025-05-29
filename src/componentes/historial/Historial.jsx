import { usePurchase } from "../../context/PurchaseContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Historial.css";

function Historial() {
  const { historialCompras } = usePurchase();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login", { state: { message: "Debes iniciar sesión para ver tu historial" } });
    return null;
  }

  return (
    <div className="historial-container">
      <h1>Historial de compras</h1>

      {historialCompras.length === 0 ? (
        <p>No has realizado ninguna compra aún.</p>
      ) : (
        <ul className="lista-historial">
          {historialCompras.map((compra, index) => (
            <li key={index} className="item-compra">
              <img src={compra.thumbnail} alt={compra.title} width={100} />
              <div>
                <h3>{compra.title}</h3>
                <p>Precio: ${compra.price}</p>
                <p>Fecha: {compra.fecha}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Historial;

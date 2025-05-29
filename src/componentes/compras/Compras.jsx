import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePurchase } from "../../context/PurchaseContext";
import "./Compras.css";

function Compras() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const producto = location.state?.productoSeleccionado;

  const [metodoPago, setMetodoPago] = useState("");
  const [compraExitosa, setCompraExitosa] = useState(false);

  // Aquí dentro del componente, usamos el hook
  const { registrarCompra } = usePurchase();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { message: "Debes iniciar sesión para acceder a compras." } });
    }

    if (!producto) {
      navigate("/", { state: { message: "No se seleccionó ningún producto para comprar." } });
    }
  }, [isLoggedIn, producto, navigate]);

  const manejarCompra = () => {
    if (!metodoPago) {
      alert("Selecciona un método de pago");
      return;
    }

    registrarCompra(producto); // <-- Aquí registras la compra correctamente
    setCompraExitosa(true);
  };

  return (
    <div className="compras-container">
      <h1>Proceso de compra</h1>

      {producto && (
        <div className="producto-a-comprar">
          <h2>{producto.title}</h2>
          <img src={producto.thumbnail} alt={producto.title} width={150} />
          <p>Precio: ${producto.price}</p>
        </div>
      )}

      <div className="selector-pago">
        <h3>Selecciona el método de pago:</h3>
        <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
          <option value="">-- Seleccionar --</option>
          <option value="tarjeta">Tarjeta de crédito</option>
          <option value="paypal">PayPal</option>
          <option value="efectivo">Pago en efectivo</option>
        </select>
      </div>

      <button onClick={manejarCompra} className="confirmar-compra">
        Confirmar compra
      </button>

      {compraExitosa && (
        <div className="mensaje-exito">
          <h2>¡Compra realizada con éxito! 🎉</h2>
          <p>Gracias por tu compra de <strong>{producto.title}</strong>.</p>
        </div>
      )}
    </div>
  );
}

export default Compras;

import { createContext, useContext, useState } from "react";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [historialCompras, setHistorialCompras] = useState([]);

  const registrarCompra = (producto) => {
    const nuevaCompra = {
      ...producto,
      fecha: new Date().toLocaleString(),
    };
    setHistorialCompras((prev) => [nuevaCompra, ...prev]);
  };

  return (
    <PurchaseContext.Provider value={{ historialCompras, registrarCompra }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchase debe usarse dentro de un PurchaseProvider");
  }
  return context;
};

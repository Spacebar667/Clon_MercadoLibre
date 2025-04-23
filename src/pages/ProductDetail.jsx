
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Detalle del producto</h1>
      <p>ID del producto: {id}</p>
      <p>Más información del producto irá aquí.</p>
    </div>
  );
}

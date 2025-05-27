// src/components/profile/CardsCard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '/workspaces/Clon_MercadoLibre/src/supabaseClient.js';

function CardsCard({ user }) {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await supabase.from('cards').select('*').eq('user_id', user.id);
      if (data) setCards(data);
    };
    fetchCards();
  }, [user]);

  const handleAdd = async () => {
    if (!newCard) return;
    const { data } = await supabase.from('cards').insert({ user_id: user.id, card_info: newCard }).select();
    setCards(prev => [...prev, ...data]);
    setNewCard('');
  };

  return (
    <div className="card">
      <h4>Tarjetas</h4>
      <ul>
        {cards.map(card => <li key={card.id}>{card.card_info}</li>)}
      </ul>
      <input value={newCard} onChange={e => setNewCard(e.target.value)} placeholder="Nueva tarjeta" />
      <button onClick={handleAdd}>Agregar</button>
    </div>
  );
}

export default CardsCard;
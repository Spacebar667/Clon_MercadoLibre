import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const CardsComponent = () => {
  const { profile, updateProfile } = useOutletContext();
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data, error } = await supabase
          .from('saved_cards')
          .select('*')
          .eq('profile_id', profile.id);

        if (error) throw error;
        
        setSavedCards(data || []);
      } catch (error) {
        console.error('Error al cargar tarjetas:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [profile.id]);

  const handleAddCard = async () => {
    alert('Implementar integración con pasarela de pago');
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const { error } = await supabase
        .from('saved_cards')
        .delete()
        .eq('id', cardId);

      if (error) throw error;
      
      setSavedCards(savedCards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error.message);
    }
  };

  if (loading) return <div>Cargando tarjetas...</div>;

  return (
    <div className="component-container">
      <Link to="/profile" className="back-button">← Volver</Link>
      <h2 className="section-title">Tarjetas</h2>
      <div className="cards-container">
        <button onClick={handleAddCard} className="add-card-button">
          <CreditCard size={24} />
          <span>Agregar nueva tarjeta</span>
        </button>
        
        <div className="saved-cards">
          <h3 className="cards-subtitle">Tarjetas guardadas</h3>
          {savedCards.length === 0 ? (
            <p className="no-cards">No tienes tarjetas guardadas</p>
          ) : (
            savedCards.map((card) => (
              <div key={card.id} className="card-item">
                <div className="card-info">
                  <span className="card-brand">{card.card_brand}</span>
                  <span className="card-number">**** **** **** {card.card_last4}</span>
                </div>
                <button 
                  onClick={() => handleDeleteCard(card.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsComponent;
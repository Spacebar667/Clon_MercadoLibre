// src/components/profile/AddressesCard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '/workspaces/Clon_MercadoLibre/src/supabaseClient.js';

function AddressesCard({ user }) {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      const { data } = await supabase.from('addresses').select('*').eq('user_id', user.id);
      if (data) setAddresses(data);
    };
    fetchAddresses();
  }, [user]);

  const handleAdd = async () => {
    if (!newAddress) return;
    const { data } = await supabase.from('addresses').insert({ user_id: user.id, address_info: newAddress }).select();
    setAddresses(prev => [...prev, ...data]);
    setNewAddress('');
  };

  return (
    <div className="card">
      <h4>Direcciones</h4>
      <ul>
        {addresses.map(address => <li key={address.id}>{address.address_info}</li>)}
      </ul>
      <input value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="Nueva dirección" />
      <button onClick={handleAdd}>Agregar</button>
    </div>
  );
}

export default AddressesCard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const AddressesComponent = () => {
  const { profile, updateProfile } = useOutletContext();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    address_line: '',
    city: '',
    state: '',
    postal_code: ''
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('profile_id', profile.id);

        if (error) throw error;
        
        setSavedAddresses(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar direcciones:', error.message);
        setLoading(false);
      }
    };

    fetchAddresses();
  });

  const handleSaveAddress = async () => {
    try {
      if (currentAddress) {
        const { error } = await supabase
          .from('addresses')
          .update(formData)
          .eq('id', currentAddress.id);

        if (error) throw error;
        
        setSavedAddresses(savedAddresses.map(addr => 
          addr.id === currentAddress.id ? {...addr, ...formData} : addr
        ));
      } else {
        const { data, error } = await supabase
          .from('addresses')
          .insert([{ ...formData, profile_id: profile.id }])
          .select();

        if (error) throw error;
        
        setSavedAddresses([...savedAddresses, data[0]]);
      }
      
      setEditMode(false);
      setCurrentAddress(null);
    } catch (error) {
      console.error('Error al guardar dirección:', error.message);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) throw error;
      
      setSavedAddresses(savedAddresses.filter(addr => addr.id !== addressId));
    } catch (error) {
      console.error('Error al eliminar dirección:', error.message);
    }
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address);
    setFormData({
      address_line: address.address_line,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code
    });
    setEditMode(true);
  };

  if (loading) return <div>Cargando direcciones...</div>;

  return (
    <div className="component-container">
      <Link to="/profile" className="back-button">← Volver</Link>
      <h2 className="section-title">Direcciones</h2>
      
      {editMode ? (
        <div className="address-form">
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              value={formData.address_line}
              onChange={(e) => setFormData({...formData, address_line: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Ciudad</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Estado/Departamento</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Código Postal</label>
            <input
              type="text"
              value={formData.postal_code}
              onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
            />
          </div>
          <div className="form-actions">
            <button onClick={() => {
              setEditMode(false);
              setCurrentAddress(null);
            }}>Cancelar</button>
            <button onClick={handleSaveAddress}>Guardar</button>
          </div>
        </div>
      ) : (
        <>
          <button 
            onClick={() => {
              setFormData({
                address_line: '',
                city: '',
                state: '',
                postal_code: ''
              });
              setEditMode(true);
            }} 
            className="add-address-button"
          >
            <MapPin size={24} />
            <span>Agregar nueva dirección</span>
          </button>
          
          <div className="saved-addresses">
            <h3 className="addresses-subtitle">Direcciones guardadas</h3>
            {savedAddresses.length === 0 ? (
              <p className="no-addresses">No tienes direcciones guardadas</p>
            ) : (
              savedAddresses.map((address) => (
                <div key={address.id} className="address-item">
                  <div className="address-info">
                    <p className="address-line">{address.address_line}</p>
                    <p className="address-details">{address.city}, {address.state} {address.postal_code}</p>
                  </div>
                  <div className="address-actions">
                    <button 
                      onClick={() => handleEditAddress(address)}
                      className="edit-button"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteAddress(address.id)}
                      className="delete-button"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddressesComponent;
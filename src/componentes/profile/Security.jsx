import { useState } from 'react';
import { supabase } from '../../supabaseClient';

const Security = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async () => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setMessage(error ? 'Error al cambiar contraseña' : 'Contraseña actualizada');
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-2">Cambiar Contraseña</h2>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default Security;

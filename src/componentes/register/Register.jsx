import { useState } from "react";
import { supabase } from "../../supabaseClient";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMsg(error.message);
      setSuccessMsg("");
    } else {
      setErrorMsg("");
      setSuccessMsg("Registro exitoso! Revisa tu correo para confirmar.");
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
      {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}
      {successMsg && <p style={{color:"green"}}>{successMsg}</p>}
    </div>
  );
}

export default Register;

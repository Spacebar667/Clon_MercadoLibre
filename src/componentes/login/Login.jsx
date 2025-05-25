import { useState } from "react";
import { supabase } from "../../supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setErrorMsg("");
      alert("Login exitoso!");
      // Aquí podrías redirigir al usuario o hacer otras cosas
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
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
      <button onClick={handleLogin}>Entrar</button>
      {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}
    </div>
  );
}

export default Login;

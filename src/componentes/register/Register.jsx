import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password || !confirmPassword) {
      setErrorMsg("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("¡Registro exitoso! Revisa tu correo para confirmar.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Opcional: después de registro exitoso, puedes redirigir al login
      // navigate("/login");
    }
  };

  return (
    <div className="register-container" role="main" aria-label="Formulario de registro">
      <h2>Registrarse</h2>
      
      <input
        type="email"
        className="register-input"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-label="Correo electrónico"
      />
      <input
        type="password"
        className="register-input"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        aria-label="Contraseña"
      />
      <input
        type="password"
        className="register-input"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        aria-label="Confirmar contraseña"
      />
      <button onClick={handleRegister} className="register-button" aria-label="Registrar cuenta">
        Registrar
      </button>

      {errorMsg && <p className="register-error">{errorMsg}</p>}
      {successMsg && <p className="register-success">{successMsg}</p>}
    </div>
  );
}

export default Register;

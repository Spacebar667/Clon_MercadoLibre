import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectMessage = location.state?.message || "";

  const handleLogin = async () => {
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Debes ingresar correo y contraseña.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg("Correo o contraseña incorrectos.");
    } else {
      navigate("/");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-container" role="main" aria-label="Formulario de inicio de sesión">
      <h2>Iniciar sesión</h2>
      {redirectMessage && <p className="login-redirect-msg">{redirectMessage}</p>}

      <input
        type="email"
        className="login-input"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-label="Correo electrónico"
      />
      <input
        type="password"
        className="login-input"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        aria-label="Contraseña"
      />
      <button onClick={handleLogin} className="login-button" aria-label="Iniciar sesión">
        Entrar
      </button>

      <button 
        onClick={handleRegisterRedirect} 
        className="login-button register-button" 
        aria-label="Crear cuenta"
        style={{ marginTop: "12px", backgroundColor: "#00a650" }}
      >
        Crear cuenta
      </button>

      {errorMsg && <p className="login-error">{errorMsg}</p>}
    </div>
  );
}

export default Login;

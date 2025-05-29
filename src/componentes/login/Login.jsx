import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const redirectMessage = location.state?.message || "";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (!form.email || !form.password) {
      setMessage({ text: "Email y contraseña son obligatorios", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      });

      if (error) throw error;

      navigate("/"); // Redirige a la página principal después del login
    } catch (error) {
      console.error("Login error:", error);
      setMessage({
        text: error.message || "Credenciales incorrectas o error en el servidor",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handlePasswordReset = async () => {
    if (!form.email) {
      setMessage({ text: "Ingresa tu email para restablecer la contraseña", type: "error" });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(form.email);
      if (error) throw error;
      setMessage({
        text: "¡Email de recuperación enviado! Revisa tu bandeja de entrada.",
        type: "success"
      });
    } catch (error) {
      setMessage({
        text: error.message || "Error al enviar el email de recuperación",
        type: "error"
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar sesión</h2>
      
      {redirectMessage && (
        <div className="message success">
          {redirectMessage}
        </div>
      )}

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="primary-button" 
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <div className="auth-links">
        <button 
          onClick={handlePasswordReset} 
          className="text-button"
        >
          ¿Olvidaste tu contraseña?
        </button>

        <div className="auth-footer">
          ¿No tienes cuenta?{" "}
          <span onClick={handleRegisterRedirect}>Regístrate aquí</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
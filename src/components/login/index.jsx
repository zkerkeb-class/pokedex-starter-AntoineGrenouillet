import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importation de useNavigate
import './index.css'; // Importation des styles CSS


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Déclaration du hook navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Réinitialiser le message d'erreur
    setErrorMessage('');

    try {
      // Envoi des informations de connexion vers le backend
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password
      });

      // Sauvegarder le token dans localStorage
      localStorage.setItem('token', response.data.token);

      // Rediriger l'utilisateur vers le tableau de bord (ou une page protégée)
      navigate('/'); // Utilisation de useNavigate pour la redirection
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Erreur de connexion');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="button-login" type="submit">Se connecter</button>
          <p className="switch-page">
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

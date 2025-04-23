import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        password
      });

      // Rediriger vers la page de login après inscription
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Créer un compte</h2>
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
          <div className="input-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="button-login" type="submit">S'inscrire</button>
        </form>
        <p className="switch-page">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

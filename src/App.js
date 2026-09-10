import React, { useState, useEffect } from 'react';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Carrega o usuário logado e a lista de cadastros salvos do localStorage
  const [user, setUser] = useState(() => {
    return localStorage.getItem('purpuzure_active_user') || null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('purpuzure_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Atualiza o localStorage sempre que a lista de usuários mudar
  useEffect(() => {
    localStorage.setItem('purpuzure_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Se já houver usuário logado ao recarregar a página, abre a dashboard
  useEffect(() => {
    if (user) {
      localStorage.setItem('purpuzure_active_user', user);
      setCurrentPage('dashboard');
    } else {
      localStorage.removeItem('purpuzure_active_user');
    }
  }, [user]);

  const handleRegister = (username, password) => {
    const userExists = registeredUsers.some(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (userExists) {
      alert('Este nome de usuário já está cadastrado!');
      return false;
    }

    const newUser = { username, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    setUser(username);
    return true;
  };

  const handleLogin = (username, password) => {
    const foundUser = registeredUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!foundUser) {
      alert('Usuário não encontrado! Faça o cadastro primeiro.');
      return false;
    }

    if (foundUser.password !== password) {
      alert('Senha incorreta!');
      return false;
    }

    setUser(foundUser.username);
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  return (
    <div className="app-container">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <header className="header">
        <div
          className="brand"
          onClick={() => setCurrentPage('landing')}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-icon">P</div>
          <span className="brand-name">Purpuzure</span>
        </div>

        <div className="auth-buttons">
          {currentPage === 'dashboard' ? (
            <button className="btn-secondary" onClick={handleLogout}>
              Sair
            </button>
          ) : currentPage === 'login' ? (
            <button className="btn-secondary" onClick={() => setCurrentPage('landing')}>
              Voltar
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setCurrentPage('login')}>
              Entrar / Cadastrar
            </button>
          )}
        </div>
      </header>

      {currentPage === 'landing' && (
        <Landing onNavigateToLogin={() => setCurrentPage('login')} />
      )}

      {currentPage === 'login' && (
        <Login onLogin={handleLogin} onRegister={handleRegister} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard user={user} />
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="brand">
            <div className="logo-icon small">P</div>
            <span className="brand-name">Purpuzure</span>
          </div>
          <p>© {new Date().getFullYear()} Purpuzure. Conectado ao Microsoft Azure.</p>
        </div>
      </footer>
    </div>
  );
}
import React, { useState } from 'react';

export default function Login({ onLogin, onRegister }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert('Preencha todos os campos!');
      return;
    }

    if (isRegister) {
      onRegister(username, password);
    } else {
      onLogin(username, password);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '5rem auto',
        padding: '2.5rem 2rem',
        background: 'var(--bg-card)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
      }}
    >
      <h2 style={{ marginBottom: '0.5rem' }}>
        {isRegister ? 'Criar Conta' : 'Acessar Dashboard'}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        {isRegister
          ? 'Preencha seus dados para se cadastrar'
          : 'Informe seu usuário e senha para entrar'}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: '#030712',
            color: '#fff',
            outline: 'none'
          }}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: '#030712',
            color: '#fff',
            outline: 'none'
          }}
          required
        />

        <button type="submit" className="btn-primary" style={{ padding: '0.8rem', marginTop: '0.5rem' }}>
          {isRegister ? 'Cadastrar e Entrar' : 'Entrar'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isRegister ? 'Já possui uma conta?' : 'Ainda não tem conta?'}
        </p>
        <button
          className="btn-secondary"
          onClick={() => {
            setIsRegister(!isRegister);
            setUsername('');
            setPassword('');
          }}
          style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
        >
          {isRegister ? 'Fazer Login' : 'Criar Cadastro'}
        </button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';

export default function Dashboard({ user }) {
  const storageKey = `purpuzure_services_${user}`;

  // Carrega as opções salvas do usuário atual ou usa o padrão
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved
      ? JSON.parse(saved)
      : {
          blobStorage: true,
          tableStorage: false,
          queueStorage: true,
          azureFunctions: false
        };
  });

  // Salva no localStorage sempre que algum botão for alternado
  useEffect(() => {
    if (user) {
      localStorage.setItem(storageKey, JSON.stringify(services));
    }
  }, [services, user, storageKey]);

  const toggleService = (key) => {
    setServices((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '3rem auto', padding: '0 1.5rem' }}>
      <div
        style={{
          marginBottom: '2rem',
          paddingBottom: '1.2rem',
          borderBottom: '1px solid var(--border-color)',
          textAlign: 'left'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', margin: '0 0 0.4rem 0' }}>Painel de Controle</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          Usuário conectado: <strong style={{ color: 'var(--purple-light)' }}>{user}</strong>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
        <div className="feature-card">
          <h3>Blob Storage</h3>
          <p style={{ marginBottom: '1.5rem' }}>Controle de contêineres</p>
          <button
            className={services.blobStorage ? 'btn-primary' : 'btn-secondary'}
            onClick={() => toggleService('blobStorage')}
            style={{ width: '100%' }}
          >
            {services.blobStorage ? '● LIGADO' : '○ DESLIGADO'}
          </button>
        </div>

        <div className="feature-card">
          <h3>Table Storage</h3>
          <p style={{ marginBottom: '1.5rem' }}>Base NoSQL PartitionKey</p>
          <button
            className={services.tableStorage ? 'btn-primary' : 'btn-secondary'}
            onClick={() => toggleService('tableStorage')}
            style={{ width: '100%' }}
          >
            {services.tableStorage ? '● LIGADO' : '○ DESLIGADO'}
          </button>
        </div>

        <div className="feature-card">
          <h3>Queue Storage</h3>
          <p style={{ marginBottom: '1.5rem' }}>Fila de mensagens assíncronas</p>
          <button
            className={services.queueStorage ? 'btn-primary' : 'btn-secondary'}
            onClick={() => toggleService('queueStorage')}
            style={{ width: '100%' }}
          >
            {services.queueStorage ? '● LIGADO' : '○ DESLIGADO'}
          </button>
        </div>

        <div className="feature-card">
          <h3>Azure Functions</h3>
          <p style={{ marginBottom: '1.5rem' }}>Execução de rotinas serverless</p>
          <button
            className={services.azureFunctions ? 'btn-primary' : 'btn-secondary'}
            onClick={() => toggleService('azureFunctions')}
            style={{ width: '100%' }}
          >
            {services.azureFunctions ? '● LIGADO' : '○ DESLIGADO'}
          </button>
        </div>
      </div>
    </div>
  );
}
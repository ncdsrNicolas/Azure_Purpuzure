import React, { useState } from 'react';

export default function Landing({ onNavigateToLogin }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="badge">
          <span className="status-dot"></span> Azure Storage & Analytics Suite
        </div>

        <h1 className="hero-title">
          Gerencie seus Dados no Azure com <span className="highlight-text">Visibilidade Total</span>
        </h1>

        <p className="hero-subtitle">
          Uma interface unificada para monitorar, armazenar e manipular <strong>Blob Containers</strong>, <strong>Table Storage</strong> e pipelines de dados com alta performance e baixa latência.
        </p>

        <div className="cta-group">
          <button className="btn-primary btn-large" onClick={onNavigateToLogin}>
            Acessar Dashboard
          </button>
          <button className="btn-secondary btn-large">
            Documentação da API
          </button>
        </div>

        {/* Dashboard Live Interactive Preview */}
        <div id="dashboard-preview" className="dashboard-preview">
          <div className="dashboard-header-bar">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="tab-group">
              <button
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`tab-btn ${activeTab === 'blobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('blobs')}
              >
                Blob Storage
              </button>
              <button
                className={`tab-btn ${activeTab === 'tables' ? 'active' : ''}`}
                onClick={() => setActiveTab('tables')}
              >
                Azure Tables
              </button>
            </div>
          </div>

          <div className="dashboard-screen">
            {activeTab === 'overview' && (
              <div className="dashboard-view grid-3">
                <div className="dash-card">
                  <span className="dash-label">Armazenamento Total (Blobs)</span>
                  <div className="dash-value">1.42 TB</div>
                  <span className="dash-sub text-success">+12% este mês</span>
                </div>
                <div className="dash-card">
                  <span className="dash-label">Registros na Table Storage</span>
                  <div className="dash-value">8,450,210</div>
                  <span className="dash-sub">PartitionKey Ativas: 14</span>
                </div>
                <div className="dash-card">
                  <span className="dash-label">Status da Conexão Azure</span>
                  <div className="dash-value text-purple">Operacional</div>
                  <span className="dash-sub">Latência: 18ms</span>
                </div>
              </div>
            )}

            {activeTab === 'blobs' && (
              <div className="dashboard-view">
                <div className="table-mock">
                  <div className="table-row table-head">
                    <span>Container</span>
                    <span>Acesso</span>
                    <span>Tamanho</span>
                    <span>Última Modificação</span>
                  </div>
                  <div className="table-row">
                    <span>📁 user-uploads</span>
                    <span className="badge-small">Private</span>
                    <span>842.1 GB</span>
                    <span>Há 2 minutos</span>
                  </div>
                  <div className="table-row">
                    <span>📁 app-logs-2026</span>
                    <span className="badge-small">Blob (Read)</span>
                    <span>120.4 GB</span>
                    <span>Há 10 minutos</span>
                  </div>
                  <div className="table-row">
                    <span>📁 static-assets</span>
                    <span className="badge-small">Public</span>
                    <span>15.8 GB</span>
                    <span>Ontem</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tables' && (
              <div className="dashboard-view">
                <div className="table-mock">
                  <div className="table-row table-head">
                    <span>PartitionKey</span>
                    <span>RowKey</span>
                    <span>Data Payload</span>
                    <span>Timestamp</span>
                  </div>
                  <div className="table-row">
                    <span className="code-text">USER_REGION_BR</span>
                    <span className="code-text">usr_9942a</span>
                    <span>&#123; "status": "active", "tier": "pro" &#125;</span>
                    <span>2026-03-09T20:00:12Z</span>
                  </div>
                  <div className="table-row">
                    <span className="code-text">ANALYTICS_EVENT</span>
                    <span className="code-text">evt_0019b</span>
                    <span>&#123; "action": "page_view", "path": "/dash" &#125;</span>
                    <span>2026-03-09T20:02:44Z</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Serviços Integrados */}
      <section id="servicos" className="features">
        <h2 className="section-title">Serviços Azure Otimizados</h2>
        <p className="section-subtitle">
          Pronto para conexão nativa com SDKs do Azure Storage e serviços serverless.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Azure Blob Storage</h3>
            <p>Gerenciamento simplificado de arquivos, mídia e backups estruturados com suporte a upload direto via SAS Tokens.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Azure Table Storage</h3>
            <p>Armazenamento de dados NoSQL ultra-rápido e econômico para tabelas com suporte avançado a consultas por PartitionKey.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Azure Functions & Queues</h3>
            <p>Processamento de eventos assíncronos integrados às suas filas e tabelas sem precisar gerenciar servidores.</p>
          </div>
        </div>
      </section>
    </>
  );
}
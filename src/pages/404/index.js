import React from 'react';

import './Style.css';

export default function Page404() {
  return (
    <section className="error-section">
      <div className="container">
        <div className="content">
          <h2 className="error-title">404</h2>
          <p className="error-message">
            Desculpe, não conseguimos encontrar essa página
          </p>
          <p className="additional-message">
            Mas não se preocupe, você pode encontrar tudo na nossa página
            principal
          </p>
          <a href="/vinculos/funcionarios/" className="btn-back">
            Voltar para a página principal
          </a>
        </div>
      </div>
    </section>
  );
}

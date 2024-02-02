import React from 'react';

import Header from '../../../components/Header';
import { operadoresSidebar as Sidebar } from '../../../components/vinculos/sidebar';

export default function CriarOperador() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div id="direita" />
      </main>
    </>
  );
}

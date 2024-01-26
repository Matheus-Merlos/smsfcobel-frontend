import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Style.css';

import axios from '../../../services/axios';
import Header from '../../../components/Header';
import Sidebar from '../../../components/vinculos/sidebar_vinculos_pendentes';

import Vinculo from '../../../components/vinculos/vinculo';

export default function VinculosPendentes() {
  const [vinculosPendentes, setVinculosPendentes] = useState([]);

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  useEffect(() => {
    async function fetchVinculosPendentes() {
      const response = await axios.get('vinculos/api/vinculos-pendentes/');
      const responseData = response.data;

      setVinculosPendentes(responseData);
      console.log(responseData);
    }

    // Configura o intervalo apenas uma vez
    fetchVinculosPendentes();
    const intervalId = setInterval(fetchVinculosPendentes, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div id="direita-vinculos">
          {vinculosPendentes.map((vinculo) => (
            <Vinculo
              nome={vinculo.nome}
              local={vinculo.local}
              criacao={vinculo.data_criacao}
              inicio={vinculo.data_entrada}
              tipo={vinculo.tipo}
            />
          ))}
        </div>
      </main>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Style.css';

import axios from '../../../services/axios';
import Header from '../../../components/Header';
import { vinculosPendentesSidebar as Sidebar } from '../../../components/vinculos/sidebar';

import Vinculo from '../../../components/vinculos/vinculo';
import history from '../../../services/history';

export default function VinculosPendentes() {
  const [vinculosPendentes, setVinculosPendentes] = useState([]);

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  useEffect(() => {
    async function fetchVinculosPendentes() {
      try {
        const response = await axios.get('vinculos/api/vinculos-pendentes/');
        const responseData = response.data;

        setVinculosPendentes(responseData);
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/login/');
          history.go();
        }
      }
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
              key={vinculo.id}
              profissionalID={vinculo.profissional_id}
              vinculoID={vinculo.id}
              nome={vinculo.nome}
              local={vinculo.local}
              criacao={vinculo.data_criacao}
              inicio={vinculo.data_entrada}
              tipo={vinculo.tipo}
              cpf={vinculo.cpf}
              rg={vinculo.rg}
              expedicaoRG={vinculo.emissao_rg}
              email={vinculo.email}
              nomeMae={vinculo.nome_mae}
              nomePai={vinculo.nome_pai}
              cns={vinculo.cns}
              funcao={vinculo.funcao}
              sexo={vinculo.sexo}
              dataNascimento={vinculo.data_nascimento}
              operadorCodigo={vinculo.operador}
              profissionalCodigo={vinculo.profissional}
            />
          ))}
        </div>
      </main>
    </>
  );
}

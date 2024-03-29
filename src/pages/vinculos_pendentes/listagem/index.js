import React, { useEffect, useState } from 'react';

import './Style.css';

import { useSelector } from 'react-redux';
import axios from '../../../services/axios';
import history from '../../../services/history';
import Header from '../../../components/Header';
import { vinculosPendentesSidebar as Sidebar } from '../../../components/vinculos/sidebar';

import { formatCNS, formatCPF } from '../../../services/utils';

import useRedirect from '../../../services/redirect';
import * as perms from '../../../services/permissions';

export default function ListagemVinculos() {
  useRedirect(perms.VINCULOS_PENDENTES);

  const [allVinculos, setAllVinculos] = useState([]);

  const accessToken = useSelector((state) => state.reducer.accessToken);
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  useEffect(() => {
    async function fetchAllVinculos() {
      try {
        const response = await axios.get('/vinculos/api/vinculos-all/');
        setAllVinculos(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/login/');
          history.go();
        }
      }
    }
    fetchAllVinculos();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div id="direita-listagem-vinculos">
          <table id="listagem-vinculos">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>CPF</th>
                <th>CNS</th>
                <th>RG</th>
                <th>Expedição do RG</th>
                <th>Sexo</th>
                <th>Nome da Mãe</th>
                <th>Nome do Pai</th>
                <th>E-mail</th>
                <th>Função</th>
                <th>Local</th>
                <th>Início das Atividades</th>
                <th>CRM</th>
                <th>Carga Horária</th>
                <th>Operador</th>
                <th>Profissional</th>
                <th>Status CNES</th>
                <th>Status IDS</th>
                <th>Status RH</th>
              </tr>
            </thead>
            <tbody>
              {allVinculos.map((vinculo) => (
                <tr key={vinculo.id}>
                  <td>{vinculo.tipo_vinculo}</td>
                  <td>{vinculo.nome}</td>
                  <td>{vinculo.data_nascimento}</td>
                  <td>{formatCPF(vinculo.cpf)}</td>
                  <td>{formatCNS(vinculo.cns)}</td>
                  <td>{vinculo.rg}</td>
                  <td>{vinculo.emissao_rg}</td>
                  <td>{vinculo.sexo}</td>
                  <td>{vinculo.nome_mae}</td>
                  <td>{vinculo.nome_pai}</td>
                  <td>{vinculo.email}</td>
                  <td>{vinculo.funcao}</td>
                  <td>{vinculo.local}</td>
                  <td>{vinculo.data_entrada}</td>
                  <td>{vinculo.crm}</td>
                  <td>{vinculo.carga_horaria}</td>
                  <td>{vinculo.operador}</td>
                  <td>{vinculo.profissional}</td>
                  <td>{vinculo.status_cnes}</td>
                  <td>{vinculo.status_ids}</td>
                  <td>{vinculo.status_rh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

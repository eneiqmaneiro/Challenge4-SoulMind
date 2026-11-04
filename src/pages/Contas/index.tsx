import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useContas } from "../../hooks/useContas";
import { criarConta, excluirConta } from "../../services/contaService";
import MensagemEstado from "../../components/MensagemEstado";
import FormularioConta from "../../components/FormularioConta";
import { gerarIniciais } from "../../utils/iniciais";
import type { ContaEntrada, ContaExibicao } from "../../types/TipoConta";
import type { EstadoNavegacao } from "../../types/TipoApi";
import type { ResultadoEnvio } from "../../types/TipoContato";

export default function Contas() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const aviso = (state as EstadoNavegacao | null)?.aviso;

  const { dados, carregando, erro, recarregar } = useContas();
  const contas = dados ?? [];

  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoEnvio | null>(null);

  const lista: ContaExibicao[] = contas.map((conta) => ({
    ...conta,
    iniciais: gerarIniciais(conta.nome),
  }));
  
    return (
    <div>
      <section>
        <h2>Contas</h2>
        <p>
          Cadastre, consulte, edite e exclua as contas da plataforma.
        </p>

        <div>
          <h3>
            Nova conta
          </h3>
        </div>

        <div>
          {lista.map((conta) => (
            <div
              key={conta.codigo}
            >
              <div>
                <span>
                  {conta.iniciais}
                </span>
                <div>
                  <h3>{conta.nome}</h3>
                  <p>@{conta.apelido}</p>
                </div>
              </div>

              <div>
                <p>
                  {conta.email}
                </p>
              </div>

              <button
                onClick={() => navigate(`/contas/${conta.codigo}`)}>
                Ver detalhes
              </button>
              <button
                onClick={() => excluir(conta)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


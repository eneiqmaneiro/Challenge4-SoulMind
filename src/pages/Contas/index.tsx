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

  const cadastrar = async (dadosConta: ContaEntrada) => {
    setEnviando(true);
    setResultado(null);
    try {
      await criarConta(dadosConta);
      setResultado({ tipo: "sucesso", texto: "Conta cadastrada com sucesso!" });
      recarregar();
      return true;
    } catch (e) {
      setResultado({
        tipo: "erro",
        texto: e instanceof Error ? e.message : "Não foi possível cadastrar a conta.",
      });
      return false;
    } finally {
      setEnviando(false);
    }
  };

  const excluir = async (conta: ContaExibicao) => {
    if (!window.confirm(`Deseja excluir a conta de ${conta.nome}?`)) return;
    setResultado(null);
    try {
      await excluirConta(conta.codigo);
      setResultado({ tipo: "sucesso", texto: "Conta excluída com sucesso." });
      recarregar();
    } catch (e) {
      setResultado({
        tipo: "erro",
        texto: e instanceof Error ? e.message : "Não foi possível excluir a conta.",
      });
    }
  };

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Contas</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Cadastre, consulte, edite e exclua as contas da plataforma.
        </p>

        <div className="mt-8 rounded-3xl bg-card p-6 shadow-soft sm:mt-10 sm:p-8">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold sm:text-xl">
            <FaUserCircle className="h-5 w-5 text-primary" />
            Nova conta
          </h3>
          <FormularioConta modo="cadastro" enviando={enviando} aoEnviar={cadastrar} />
        </div>

        {aviso && (
          <p role="alert" className="mt-8 rounded-xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800">
            {aviso}
          </p>
        )}
        {resultado && (
          <p
            role={resultado.tipo === "erro" ? "alert" : "status"}
            className={`mt-6 text-sm font-semibold ${resultado.tipo === "erro" ? "text-red-500" : "text-emerald-600"}`}
          >
            {resultado.texto}
          </p>
        )}

        {carregando && <MensagemEstado tipo="carregando" texto="Carregando contas..." />}
        {erro && <MensagemEstado tipo="erro" texto={erro} />}
        {!carregando && !erro && contas.length === 0 && (
          <MensagemEstado tipo="vazio" texto="Nenhuma conta cadastrada por enquanto." />
        )}

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((conta) => (
            <div
              key={conta.codigo}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {conta.iniciais}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold sm:text-base">{conta.nome}</h3>
                  <p className="truncate text-xs text-muted-foreground sm:text-sm">@{conta.apelido}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-1 flex-col gap-2 text-xs text-muted-foreground sm:text-sm">
                <p className="flex items-center gap-2 break-all">
                  <FaEnvelope className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {conta.email}
                </p>
              </div>

              <button
                onClick={() => navigate(`/contas/${conta.codigo}`)}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:text-sm"
              >
                Ver detalhes
              </button>
              <button
                onClick={() => excluir(conta)}
                className="mt-2.5 inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-400 px-5 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 sm:text-sm"
              >
                <FaTrash className="h-3.5 w-3.5" />
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

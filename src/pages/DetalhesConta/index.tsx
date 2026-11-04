import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaAt, FaPen, FaTrash } from "react-icons/fa";
import { useConta } from "../../hooks/useContas";
import { atualizarConta, excluirConta } from "../../services/contaService";
import MensagemEstado from "../../components/MensagemEstado";
import FormularioConta from "../../components/FormularioConta";
import { gerarIniciais } from "../../utils/iniciais";
import type { ContaEntrada } from "../../types/TipoConta";
import type { ResultadoEnvio } from "../../types/TipoContato";

export default function DetalhesConta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dados: conta, carregando, erro, status, recarregar } = useConta(id);

  const [editando, setEditando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoEnvio | null>(null);

  if (carregando) {
    return (
      <section className="mx-auto w-full max-w-2xl px-4 py-16">
        <MensagemEstado tipo="carregando" texto="Carregando conta..." />
      </section>
    );
  }

  // Conta inexistente (404/400): redireciona para a lista com mensagem personalizada
  if (status === 404 || status === 400) {
    return <Navigate to="/contas" replace state={{ aviso: "Conta não encontrada. Confira as contas cadastradas." }} />;
  }

  if (erro || !conta) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16">
        <MensagemEstado tipo="erro" texto={erro ?? "Não foi possível carregar a conta."} />
        <button
          onClick={() => navigate("/contas")}
          className="mt-8 inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
        >
          <FaArrowLeft className="h-4 w-4" />
          Voltar para contas
        </button>
      </section>
    );
  }

  const salvar = async (dadosConta: ContaEntrada) => {
    setEnviando(true);
    setResultado(null);
    try {
      await atualizarConta(conta.codigo, dadosConta);
      recarregar();
      setEditando(false);
      setResultado({ tipo: "sucesso", texto: "Conta atualizada com sucesso!" });
      return true;
    } catch (e) {
      setResultado({
        tipo: "erro",
        texto: e instanceof Error ? e.message : "Não foi possível atualizar a conta.",
      });
      return false;
    } finally {
      setEnviando(false);
    }
  };

  const excluir = async () => {
    if (!window.confirm(`Deseja excluir a conta de ${conta.nome}?`)) return;
    try {
      await excluirConta(conta.codigo);
      navigate("/contas", { replace: true, state: { aviso: "Conta excluída com sucesso." } });
    } catch (e) {
      setResultado({
        tipo: "erro",
        texto: e instanceof Error ? e.message : "Não foi possível excluir a conta.",
      });
    }
  };

  return (
    <div>
      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <button
          onClick={() => navigate("/contas")}
          className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-soft transition-colors hover:text-primary"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </button>

        <div className="mt-5 rounded-3xl bg-card p-6 shadow-soft sm:mt-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {gerarIniciais(conta.nome)}
            </span>
            <div className="min-w-0">
              <h1 className="wrap-break-word text-xl font-bold sm:text-2xl">{conta.nome}</h1>
              <p className="text-sm text-muted-foreground">@{conta.apelido}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-sm sm:text-base">
            <p className="flex items-center gap-2.5 break-all text-muted-foreground">
              <FaEnvelope className="h-4 w-4 shrink-0 text-primary" />
              <span className="font-bold text-foreground">{conta.email}</span>
            </p>
            <p className="flex items-center gap-2.5 text-muted-foreground">
              <FaAt className="h-4 w-4 shrink-0 text-primary" />
              Apelido <span className="font-bold text-foreground">{conta.apelido}</span>
            </p>
          </div>

          {resultado && (
            <p
              role={resultado.tipo === "erro" ? "alert" : "status"}
              className={`mt-6 text-sm font-semibold ${resultado.tipo === "erro" ? "text-red-500" : "text-emerald-600"}`}
            >
              {resultado.texto}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setEditando((v) => !v)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              <FaPen className="h-3.5 w-3.5" />
              {editando ? "Cancelar edição" : "Editar conta"}
            </button>
            <button
              onClick={excluir}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-400 px-6 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              <FaTrash className="h-3.5 w-3.5" />
              Excluir conta
            </button>
          </div>

          {editando && (
            <div className="mt-6 border-t border-border pt-6">
              <FormularioConta
                modo="edicao"
                valoresIniciais={{ nome: conta.nome, apelido: conta.apelido, email: conta.email }}
                enviando={enviando}
                aoEnviar={salvar}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

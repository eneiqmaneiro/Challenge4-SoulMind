import { useCallback, useEffect, useState } from "react";
import { ErroApi } from "../services/api";
import { buscarConta, listarContas } from "../services/contaService";
import type { EstadoRequisicao } from "../types/TipoApi";
import type { TipoConta } from "../types/TipoConta";

const estadoInicial = { dados: null, carregando: true, erro: null, status: null };

function lerErro(e: unknown) {
  return {
    erro: e instanceof Error ? e.message : "Ocorreu um erro inesperado.",
    status: e instanceof ErroApi ? e.status : null,
  };
}

export function useContas() {
  const [estado, setEstado] = useState<EstadoRequisicao<TipoConta[]>>(estadoInicial);
  const [versao, setVersao] = useState(0);

  // Chamado após cadastrar ou excluir para buscar a lista atualizada
  const recarregar = useCallback(() => setVersao((v) => v + 1), []);

  useEffect(() => {
    let ativo = true;
    listarContas()
      .then((dados) => {
        if (ativo) setEstado({ dados, carregando: false, erro: null, status: null });
      })
      .catch((e: unknown) => {
        if (ativo) setEstado({ dados: null, carregando: false, ...lerErro(e) });
      });
    return () => {
      ativo = false;
    };
  }, [versao]);

  return { ...estado, recarregar };
}

export function useConta(id: string | undefined) {
  const [estado, setEstado] = useState<EstadoRequisicao<TipoConta>>(estadoInicial);
  const [versao, setVersao] = useState(0);

  const recarregar = useCallback(() => setVersao((v) => v + 1), []);

  useEffect(() => {
    let ativo = true;
    if (!id) return;
    buscarConta(id)
      .then((dados) => {
        if (ativo) setEstado({ dados, carregando: false, erro: null, status: null });
      })
      .catch((e: unknown) => {
        if (ativo) setEstado({ dados: null, carregando: false, ...lerErro(e) });
      });
    return () => {
      ativo = false;
    };
  }, [id, versao]);

  return { ...estado, recarregar };
}

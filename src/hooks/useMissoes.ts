import { useEffect, useState } from "react";
import { ErroApi } from "../services/api";
import { buscarMissao, listarMissoes } from "../services/missaoService";
import type { EstadoRequisicao } from "../types/TipoApi";
import type { TipoMissao } from "../types/TipoMissao";

const estadoInicial = { dados: null, carregando: true, erro: null, status: null };

function lerErro(e: unknown) {
  return {
    erro: e instanceof Error ? e.message : "Ocorreu um erro inesperado.",
    status: e instanceof ErroApi ? e.status : null,
  };
}

export function useMissoes() {
  const [estado, setEstado] = useState<EstadoRequisicao<TipoMissao[]>>(estadoInicial);

  useEffect(() => {
    let ativo = true;
    listarMissoes()
      .then((dados) => {
        if (ativo) setEstado({ dados, carregando: false, erro: null, status: null });
      })
      .catch((e: unknown) => {
        if (ativo) setEstado({ dados: null, carregando: false, ...lerErro(e) });
      });
    return () => {
      ativo = false;
    };
  }, []);

  return estado;
}

export function useMissao(id: string | undefined) {
  const [estado, setEstado] = useState<EstadoRequisicao<TipoMissao>>(estadoInicial);

  useEffect(() => {
    let ativo = true;
    if (!id) return;
    buscarMissao(id)
      .then((dados) => {
        if (ativo) setEstado({ dados, carregando: false, erro: null, status: null });
      })
      .catch((e: unknown) => {
        if (ativo) setEstado({ dados: null, carregando: false, ...lerErro(e) });
      });
    return () => {
      ativo = false;
    };
  }, [id]);

  return estado;
}

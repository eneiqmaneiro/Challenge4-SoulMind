// Estado de uma requisição GET feita pelos hooks
export interface EstadoRequisicao<T> {
  dados: T | null;
  carregando: boolean;
  erro: string | null;
  status: number | null; // status HTTP quando a API responde com erro
}

// Estado enviado pelo React Router ao redirecionar (ex.: aviso na tela de destino)
export interface EstadoNavegacao {
  aviso?: string;
}

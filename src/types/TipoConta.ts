// Conta como a API Java devolve (ContaResponseDto): a senha nunca volta
export interface TipoConta {
  codigo: number;
  nome: string;
  apelido: string;
  email: string;
}

// Dados enviados em POST/PUT (ContaRequestDto): o código é gerado pelo banco
export type ContaEntrada = Omit<TipoConta, "codigo"> & { senha: string };

// Union type: o mesmo formulário serve para cadastrar e editar
export type ModoFormulario = "cadastro" | "edicao";

// Intersection type: conta vinda da API + dado calculado só para exibição
export type ContaExibicao = TipoConta & { iniciais: string };

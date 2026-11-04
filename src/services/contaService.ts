import { api } from "./api";
import type { ContaEntrada, TipoConta } from "../types/TipoConta";

// Endpoints da API Java (ContaController, @RequestMapping("contas"))
const RECURSO = "/contas";

// GET /contas
export const listarContas = () => api.get<TipoConta[]>(RECURSO);

// GET /contas/{codigo}
export const buscarConta = (codigo: string) => api.get<TipoConta>(`${RECURSO}/${codigo}`);

// POST /contas (201 Created)
export const criarConta = (dados: ContaEntrada) =>
  api.post<TipoConta, ContaEntrada>(RECURSO, dados);

// PUT /contas/{codigo} (200 sem corpo)
export const atualizarConta = (codigo: number, dados: ContaEntrada) =>
  api.put<void, ContaEntrada>(`${RECURSO}/${codigo}`, dados);

// DELETE /contas/{codigo} (204 No Content)
export const excluirConta = (codigo: number) => api.delete<void>(`${RECURSO}/${codigo}`);

import { api } from "./api";
import type { TipoMissao } from "../types/TipoMissao";

// Ajuste os caminhos abaixo conforme os endpoints da API Java do grupo
export const listarMissoes = () => api.get<TipoMissao[]>("/missoes");

export const buscarMissao = (id: string) => api.get<TipoMissao>(`/missoes/${id}`);

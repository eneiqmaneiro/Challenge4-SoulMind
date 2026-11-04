import { api } from "./api";
import type { TipoContato } from "../types/TipoContato";

// Operação de escrita (POST). Ajuste o caminho conforme a API Java do grupo
export const enviarContato = (dados: TipoContato) =>
  api.post<TipoContato, TipoContato>("/contatos", dados);

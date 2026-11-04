export type IconeMissao = "reciclagem" | "agua" | "transporte" | "energia";

export interface TipoMissao {
  id: number;
  titulo: string;
  descricao: string;
  xp: number;
  icone: IconeMissao;
}

// Intersection type: missão vinda da API + estado local de conclusão
export type MissaoComStatus = TipoMissao & { concluida: boolean };

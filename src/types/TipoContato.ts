export interface TipoContato {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export type ResultadoEnvio =
  | { tipo: "sucesso"; texto: string }
  | { tipo: "erro"; texto: string };

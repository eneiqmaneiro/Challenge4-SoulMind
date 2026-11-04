// Camada única de comunicação com a API (fetch nativo, sem bibliotecas externas)
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "");

export class ErroApi extends Error {
  status: number;

  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.name = "ErroApi";
    this.status = status;
  }
}

// A API Java devolve { erro, detalhes } (404/500) ou { campo: mensagem } (400 de validação)
function extrairMensagem(corpo: unknown): string {
  if (typeof corpo !== "object" || corpo === null) return "";
  const objeto = corpo as Record<string, unknown>;
  if (typeof objeto.detalhes === "string") return objeto.detalhes;
  return Object.entries(objeto)
    .filter((par): par is [string, string] => typeof par[1] === "string")
    .map(([campo, mensagem]) => `${campo}: ${mensagem}`)
    .join("; ");
}

async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new ErroApi("URL da API não configurada (variável VITE_API_URL).", 0);
  }

  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: { "Content-Type": "application/json", ...opcoes.headers },
    });
  } catch {
    throw new ErroApi("Não foi possível conectar ao servidor. Tente novamente.", 0);
  }

  if (!resposta.ok) {
    let detalhe = "";
    try {
      detalhe = extrairMensagem(await resposta.json());
    } catch {
      // corpo vazio ou não-JSON: usa a mensagem padrão
    }
    throw new ErroApi(detalhe || `Erro ${resposta.status} ao acessar a API.`, resposta.status);
  }

  // 204 No Content ou corpo vazio (comum em DELETE/PUT)
  const texto = await resposta.text();
  return (texto ? JSON.parse(texto) : undefined) as T;
}

export const api = {
  get: <T>(caminho: string) => requisicao<T>(caminho),
  post: <T, B>(caminho: string, corpo: B) =>
    requisicao<T>(caminho, { method: "POST", body: JSON.stringify(corpo) }),
  put: <T, B>(caminho: string, corpo: B) =>
    requisicao<T>(caminho, { method: "PUT", body: JSON.stringify(corpo) }),
  delete: <T>(caminho: string) => requisicao<T>(caminho, { method: "DELETE" }),
};

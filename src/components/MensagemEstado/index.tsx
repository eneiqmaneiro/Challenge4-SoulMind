import { FaSpinner, FaExclamationTriangle, FaInbox } from "react-icons/fa";

type Props = {
  tipo: "carregando" | "erro" | "vazio";
  texto?: string;
};

const padroes = {
  carregando: "Carregando...",
  erro: "Não foi possível carregar os dados. Tente novamente mais tarde.",
  vazio: "Nenhum item encontrado.",
};

export default function MensagemEstado({ tipo, texto }: Props) {
  const Icone = tipo === "carregando" ? FaSpinner : tipo === "erro" ? FaExclamationTriangle : FaInbox;
  const cor = tipo === "erro" ? "text-red-500" : "text-primary";

  return (
    <div
      role={tipo === "erro" ? "alert" : "status"}
      className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-card p-8 text-center shadow-soft"
    >
      <Icone className={`h-8 w-8 ${cor} ${tipo === "carregando" ? "animate-spin" : ""}`} aria-hidden />
      <p className="text-sm font-semibold sm:text-base">{texto ?? padroes[tipo]}</p>
    </div>
  );
}

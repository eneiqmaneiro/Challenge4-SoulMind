import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,FaRecycle,FaBicycle,FaBolt,FaStar,FaRegCalendarAlt,FaTachometerAlt,FaLeaf,FaGlobeAmericas,FaLightbulb
} from"react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { useMissao } from "../../hooks/useMissoes";
import MensagemEstado from "../../components/MensagemEstado";
import reciclagemImg from "../../assets/reciclagem.png";
import aguaImg from "../../assets/agua.png";
import transporteImg from "../../assets/transporte.png";
import luzImg from "../../assets/luz.png";

const icones = {
  reciclagem: { Icon: FaRecycle, foto: reciclagemImg, cor: "text-emerald-600", tag: "bg-emerald-100 text-emerald-700", nome: "Reciclagem" },
  agua: { Icon: FaDroplet, foto: aguaImg, cor: "text-sky-500", tag: "bg-sky-100 text-sky-700", nome: "Água" },
  transporte: { Icon: FaBicycle, foto: transporteImg, cor: "text-primary", tag: "bg-primary/10 text-primary", nome: "Transporte" },
  energia: { Icon: FaBolt, foto: luzImg, cor: "text-primary", tag: "bg-primary/10 text-primary", nome: "Energia" },
};

const conteudoExtra = {
  reciclagem: {
    prazo: "2 dias",
    dificuldade: "Fácil",
    comoFazer: [
      "Separe corretamente os materiais recicláveis.",
      "Encontre um ponto de coleta mais próximo da sua região.",
      "Faça o descarte correto.",
    ],
    dicas: [
      "Lave as embalagens antes de descartar para evitar mau cheiro.",
      "Separe papel, plástico, vidro e metal em sacos diferentes.",
    ],
    porqueImportante: "A reciclagem reduz a quantidade de lixo nos aterros, preserva recursos naturais e ajuda a combater a poluição.",
    impactoAmbiental: "Menos resíduos no meio ambiente e mais materiais reaproveitados.",
    curiosidade: "1 tonelada de plástico reciclado evita a emissão de até 2,5 toneladas de CO₂ no meio ambiente.",
  },
  agua: {
    prazo: "1 dia",
    dificuldade: "Fácil",
    comoFazer: [
      "Feche a torneira enquanto escova os dentes ou ensaboa a louça.",
      "Reduza o tempo do banho em alguns minutos.",
      "Reaproveite a água da máquina de lavar, se possível.",
    ],
    dicas: [
      "Use um cronômetro para banhos mais curtos.",
      "Conserte vazamentos assim que perceber.",
    ],
    porqueImportante: "A água é um recurso finito. Pequenas economias diárias somam um grande impacto ao longo do tempo.",
    impactoAmbiental: "Menor consumo de água tratada e menos pressão sobre mananciais.",
    curiosidade: "Uma torneira pingando pode desperdiçar mais de 46 litros de água por dia.",
  },
  transporte: {
    prazo: "1 dia",
    dificuldade: "Médio",
    comoFazer: [
      "Escolha um trajeto que possa ser feito de bicicleta ou a pé.",
      "Planeje o tempo extra necessário para o deslocamento.",
      "Aproveite para observar o quanto de CO₂ você deixou de emitir.",
    ],
    dicas: [
      "Comece com trajetos curtos antes de trocar deslocamentos mais longos.",
      "Use equipamentos de segurança se for de bicicleta.",
    ],
    porqueImportante: "O transporte motorizado é uma das maiores fontes de emissão de CO₂ nas cidades.",
    impactoAmbiental: "Redução direta na emissão de gases poluentes e menos congestionamento.",
    curiosidade: "Um trajeto de 5 km de carro pode emitir cerca de 1 kg de CO₂ — de bike, essa emissão é zero.",
  },
  energia: {
    prazo: "1 dia",
    dificuldade: "Fácil",
    comoFazer: [
      "Desligue luzes de cômodos vazios.",
      "Aproveite a luz natural sempre que possível.",
      "Desligue aparelhos da tomada quando não estiverem em uso.",
    ],
    dicas: [
      "Troque lâmpadas comuns por LED, que consomem menos energia.",
      "Evite deixar carregadores ligados sem uso.",
    ],
    porqueImportante: "Reduzir o consumo de energia diminui a demanda por geração, muitas vezes vinda de fontes poluentes.",
    impactoAmbiental: "Menor consumo de energia elétrica e redução da pegada de carbono.",
    curiosidade: "Trocar 5 lâmpadas comuns por LED pode economizar até 80% de energia com iluminação.",
  },
};
export default function MissaoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aba, setAba] = useState<"como-fazer" | "dicas">("como-fazer");

  const { dados: missao, carregando, erro, status } = useMissao(id);

  if (carregando) {
    return (
      <section className="mx-auto w-full max-w-2xl px-4 py-16">
        <MensagemEstado tipo="carregando" texto="Carregando missão..." />
      </section>
    );
  }

  // Missão inexistente (404/400): redireciona para a lista com mensagem personalizada
  if (status === 404 || status === 400) {
    return <Navigate to="/missoes" replace state={{ aviso: "Missão não encontrada. Confira as missões disponíveis." }} />;
  }

  if (erro || !missao) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16">
        <MensagemEstado tipo="erro" texto={erro ?? "Não foi possível carregar a missão."} />
        <button
          onClick={() => navigate("/missoes")}
          className="mt-8 inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
        >
          <FaArrowLeft className="h-4 w-4" />
          Voltar para missões
        </button>
      </section>
    );
  }

  const { Icon, foto, cor, tag, nome } = icones[missao.icone];
  const extra = conteudoExtra[missao.icone];

  return (
    <div>
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <button
          onClick={() => navigate("/missoes")}
          className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-soft transition-colors hover:text-primary"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </button>
        <div className="mt-5 grid gap-5 rounded-3xl bg-card p-5 shadow-soft sm:mt-6 sm:grid-cols-2 sm:p-6">
          <div className="relative overflow-hidden rounded-2xl">
            <img src={foto} alt={nome} className="h-48 w-full object-cover sm:h-full" />
            <span
              className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold shadow-soft ${cor}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {nome}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tag}`}>
              <Icon className="h-3.5 w-3.5" />
              {nome}
            </span>

            <h1 className="mt-3 text-xl font-bold sm:text-2xl">{missao.titulo}</h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{missao.descricao}</p>

            <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-amber-500">
              <FaStar className="h-4 w-4" />
              +{missao.xp} pontos
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-border pt-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <FaRegCalendarAlt className="h-4 w-4 text-primary" />
                Prazo <span className="font-bold text-foreground">{extra.prazo}</span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <FaTachometerAlt className="h-4 w-4 text-primary" />
                Dificuldade <span className="font-bold text-foreground">{extra.dificuldade}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-3xl bg-card p-5 shadow-soft sm:mt-6 sm:p-8">
          <div className="flex gap-6 border-b border-border">
            <button
              onClick={() => setAba("como-fazer")}
              className={`-mb-px border-b-2 pb-3 text-sm font-bold transition-colors ${
                aba === "como-fazer" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              Como fazer
            </button>
            <button
              onClick={() => setAba("dicas")}
              className={`-mb-px border-b-2 pb-3 text-sm font-bold transition-colors ${
                aba === "dicas" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              Dicas
            </button>
          </div>

          <div className="mt-6 grid gap-8 sm:grid-cols-[1.3fr_1fr]">
            <div>
              {aba === "como-fazer" ? (
                <ol className="flex flex-col gap-5">
                  {extra.comoFazer.map((passo, index) => (
                    <li key={passo} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <p className="text-sm text-foreground/80 sm:text-base">{passo}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="flex flex-col gap-4">
                  {extra.dicas.map((dica) => (
                    <li key={dica} className="flex items-start gap-3">
                      <FaLightbulb className="mt-1 h-4 w-4 shrink-0 text-amber-500" />
                      <p className="text-sm text-foreground/80 sm:text-base">{dica}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-5 rounded-2xl bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <FaLeaf className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-sm font-bold">Por que é importante?</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{extra.porqueImportante}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaGlobeAmericas className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                <div>
                  <p className="text-sm font-bold">Impacto ambiental</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{extra.impactoAmbiental}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-3xl bg-card p-5 shadow-soft sm:mt-6 sm:p-6">
          <FaLeaf className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-emerald-500/10 sm:h-28 sm:w-28" aria-hidden />
          <div className="relative flex items-start gap-3">
            <FaLightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="text-sm font-bold">Você sabia?</p>
              <p className="mt-1 text-sm text-muted-foreground">{extra.curiosidade}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
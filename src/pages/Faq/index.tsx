import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaCommentAlt  } from "react-icons/fa";
import avatarImg from "../../assets/soul-faq.png";


const perguntas = [
  {
    pergunta: "O que é a SoulMind?",
    resposta:
      "A SoulMind é uma plataforma gamificada de sustentabilidade que recompensa hábitos ecológicos com pontos e um avatar inteligente.",
  },
  {
    pergunta: "Como funciona o cadastro de contas?",
    resposta:
      "Na página Contas você cadastra, consulta, edita e exclui contas. Os dados são enviados para a nossa API em Java e ficam salvos no banco de dados.",
  },
  {
    pergunta: "Como ganho pontos?",
    resposta:
      "Você ganha pontos mantendo sequências de dias ativos e desbloqueando novas conquistas dentro da plataforma.",
  },
  {
    pergunta: "Posso trocar meus pontos por recompensas?",
    resposta:
      "Sim! Seus pontos podem ser trocados por itens de personalização para o seu avatar, como cores, materiais e acessórios exclusivos.",
  },
  {
    pergunta: "A plataforma é gratuita?",
    resposta:
      "Sim, a SoulMind é 100% gratuita. Você tem acesso ao cadastro de contas, ao avatar e ao sistema de pontos sem nenhum custo.",
  },
  {
    pergunta: "Como posso sugerir melhorias?",
    resposta:
      "Você pode entrar em contato pela nossa página de contato ou usar o botão \"Fale conosco\" no final desta página. Adoramos ouvir sugestões da comunidade!",
  },
];

export default function Faq() {
const [aberta, setAberta] = useState(-1);
  return (
    <div>
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Perguntas frequentes</h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        As dúvidas mais comuns sobre a plataforma
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:mt-10">
        {perguntas.map((item, index) => (
          <div key={item.pergunta} className="rounded-2xl bg-card p-6 shadow-soft">
            <button
              onClick={() => setAberta(aberta === index ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-base font-bold sm:text-lg">{item.pergunta}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {aberta === index ? <FaMinus className="h-4 w-4" /> : <FaPlus className="h-4 w-4" />}
              </span>
            </button>

            {aberta === index && (
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">{item.resposta}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 rounded-3xl bg-linear-to-br from-primary to-primary/70 p-8 text-center shadow-glow-primary sm:mt-10 sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <FaCommentAlt className="h-8 w-8 shrink-0 text-primary-foreground" />
          <div>
            <h3 className="text-lg font-bold text-primary-foreground sm:text-xl">
              Não encontrou sua dúvida?
            </h3>
            <p className="mt-1 text-sm text-primary-foreground/90 sm:text-base">
              Entre em contato conosco que vamos te ajudar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contato" className="rounded-xl bg-card px-6 py-3 text-sm font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5">
            Fale conosco
          </Link>
          <img src={avatarImg} alt="Assistente Soul" className="hidden h-32 w-32 object-contain sm:block" />
        </div>
      </div>
    </section>
    </div>
  );
}
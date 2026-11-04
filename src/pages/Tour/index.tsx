import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import avatarImg from "../../assets/avatar-soul.png";
import { useNavigate } from "react-router-dom";
import imgHome  from "../../assets/home.png";
import imgContas  from "../../assets/contas.png";
import imgAvatar  from "../../assets/avatar.png";
import imgAssistente  from "../../assets/assistente.png";

type Phase = "welcome" | number | "done";

const tourSteps = [
  {
    title: "Home",
    foto: imgHome,
    message: "Aqui é o seu ponto de partida!",
    description:
      "Você pode acompanhar seu progresso, gerenciar suas contas e acessar as principais funções da plataforma.",
  },
  {
    
    title: "Contas",
    foto: imgContas,
    message: "Em Contas você cadastra e gerencia as contas da plataforma.",
    description: "Crie, consulte, edite e exclua contas direto da nossa API!",
  },
  
  {

    title: "Avatar",
    foto: imgAvatar,
    message: "Agora você pode deixar seu avatar com a sua cara!",
    description: "Use suas recompensas para desbloquear novos itens.",
  },
  {
 
    title: "Assistente Soul",
    foto: imgAssistente,
    message: "E se você ficar perdido ou tiver alguma dúvida, pode falar comigo.",
    description: "Estou aqui para ajudar você durante sua jornada!",
  },
];

function LaptopMockup({ phase }: { phase: number }) {

   
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-t-xl border-8 border-b-0 border-slate-800 bg-slate-800">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-primary from-primary/15 via-card to-primary/5">
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wide text-primary/70">
              Prévia da tela
            </span>
            <span className="text-sm font-semibold text-foreground/70">Tela de Exemplo</span>
          </div>

          <img
            src={tourSteps[phase].foto}
            alt="Exemplo de tela"
            className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
      </div>
      <div className="mx-auto h-3 w-[110%] max-w-none -translate-x-5/100 rounded-b-xl bg-slate-700" />
      <div className="mx-auto h-1.5 w-1/4 rounded-b-md bg-slate-600" />
    </div>
  );
}

export default function Tour({ onFinish }: { onFinish?: () => void }) {
  const [phase, setPhase] = useState<Phase>("welcome");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    if (onFinish) {
      onFinish();
    } else {
      navigate("/");
    }
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish();
    } else {
      navigate("/");
    }
  };

  const goNext = () => {
    
    if (phase === "welcome") return setPhase(0);
    if (typeof phase === "number") {
      if (phase < tourSteps.length - 1) setPhase(phase + 1);
      else setPhase("done");
    }
  };

  const goBack = () => {
    if (typeof phase === "number") {
      if (phase === 0) setPhase("welcome");
      else setPhase(phase - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex min-h-screen w-screen flex-col overflow-y-auto bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {phase === "welcome" && (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            5 etapas rápidas
          </span>

          <div className="relative mt-8 flex h-44 w-44 items-center justify-center rounded-full bg-primary/90 shadow-glow-primary sm:h-56 sm:w-56">
            <img
              src={avatarImg}
              alt="Soul, o avatar assistente da plataforma"
              className="h-4/5 w-4/5 animate-float object-contain"
            />
          </div>

          <div className="mt-4 w-fit max-w-[90%] rounded-2xl rounded-tl-sm bg-primary/10 px-5 py-3 text-sm font-semibold text-primary sm:text-base">
            Oi! Eu sou o Soul 
          </div>

          <h1 className="mt-6 max-w-2xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            Conheça a <span className="text-primary">Soul Up</span> com o Soul
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            Vou te acompanhar em uma rápida jornada para mostrar como a plataforma funciona, para
            você não ficar perdido em nenhuma etapa.
          </p>

          <div className="mt-8 flex w-fit items-center gap-2">
            {tourSteps.map((_, i) => (
              <span key={i} className="h-1.5 w-8 rounded-full bg-primary/20" />
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {tourSteps.length} etapas · leva menos de 1 minuto
          </p>

          <div className="mt-10 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleSkip}
              className="text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              Pular tour 
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-9 py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Começar tour <FaArrowRight className="inline-block" />
            </button>
          </div>
        </div>
      )}

      {typeof phase === "number" && (
        <div className="flex flex-1 flex-col px-6 pb-8 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Passo {phase + 1} de {tourSteps.length}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${((phase + 1) / tourSteps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-5xl flex-1 items-center gap-10 py-8 lg:grid-cols-[1.2fr_1fr]">
            <LaptopMockup phase={phase} />

            <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center lg:items-start lg:text-left">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/90 shadow-glow-primary">
                <img
                  src={avatarImg}
                  alt="Soul explicando esta etapa"
                  className="h-4/5 w-4/5 animate-float object-contain"
                />
              </div>

              <div className="mt-4 w-fit max-w-full rounded-2xl rounded-tl-sm bg-primary/10 px-5 py-3 text-sm text-primary sm:text-base">
                {tourSteps[phase].message}
              </div>

              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">{tourSteps[phase].title}</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {tourSteps[phase].description}
              </p>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/25 bg-card px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-hover"
            >
             <FaArrowLeft /> Voltar
            </button>

            <div className="flex items-center gap-2">
              {tourSteps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir para o passo ${i + 1}`}
                  onClick={() => setPhase(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === phase ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Próximo
            </button>
          </div>
        </div>
      )}
      {phase === "done" && (
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-primary/90 shadow-glow-primary sm:h-44 sm:w-44">
            <img
              src={avatarImg}
              alt="Soul comemorando"
              className="h-4/5 w-4/5 animate-float object-contain"
            />
          </div>

          <h2 className="mt-8 flex items-center justify-center gap-2 text-3xl font-bold sm:text-4xl">
            Você está pronto!
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground sm:text-lg">
            Agora que você conhece a Soul Up, que tal cadastrar a sua primeira conta?
          </p>

          <button
            type="button"
            onClick={handleFinish}
            className="mt-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-9 py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Começar minha jornada
          </button>
        </div>
      )}
    </div>
  );
}
import {SiReact,SiTypescript,SiTailwindcss,} from "react-icons/si";
import {FaExclamationTriangle,  FaLightbulb,  FaUserCircle,  FaCoins,  FaGift,FaRobot,} from "react-icons/fa";
const howItWorks = [
  {
    icon: FaUserCircle,
    title: "1. Conta",
    description: "O usuário cria e gerencia a sua conta na plataforma.",
  },
  {
    icon: FaCoins,
    title: "2. Pontos",
    description: "Mantendo hábitos sustentáveis, ganha XP e moedas.",
  },
  {
    icon: FaGift,
    title: "3. Recompensas",
    description: "Desbloqueia itens para o avatar e badges.",
  },
  {
    icon: FaRobot,
    title: "4. IA",
    description: "Assistente sugere ações sustentáveis personalizadas.",
  },
];
const technologies = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
];
export default function SobreProjeto() {
  return (
    <div>
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Sobre o projeto</h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Como a SoulMind nasceu e o problema que ela resolve
      </p>
      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-6 shadow-soft sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FaExclamationTriangle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-5 text-lg font-bold sm:text-xl">O problema</h3>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Hábitos sustentáveis ainda são distantes do dia a dia da maioria das pessoas. Falta
            engajamento, recompensa e visualização do impacto que pequenas ações geram.
          </p>
        </div>
        <div className="rounded-2xl bg-card p-6 shadow-soft sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
            <FaLightbulb className="h-6 w-6 text-emerald-500" />
          </div>
          <h3 className="mt-5 text-lg font-bold sm:text-xl">A solução</h3>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            A SoulMind transforma sustentabilidade em uma experiência interativa, com contas de usuário, recompensas e o Soul Bot, um assistente inteligente que orienta o usuário, tira dúvidas e ajuda a encontrar as melhores ações para sua rotina.
          </p>
        </div>
      </div>
      <h2 className="mt-14 text-2xl font-bold sm:mt-16 sm:text-3xl lg:text-4xl">
        Como o sistema <span className="text-primary">funciona</span>
      </h2>
      <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {howItWorks.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-2xl bg-card p-6 shadow-soft sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 text-base font-bold sm:text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-14 text-2xl font-bold sm:mt-16 sm:text-3xl lg:text-4xl">
        Tecnologias <span className="text-primary">utilizadas</span>
      </h2>
      <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
        {technologies.map(({ icon: Icon, name, color }) => (
          <span
            key={name}
            className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-bold shadow-soft sm:px-5 sm:py-3 sm:text-base"
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} />
            {name}
          </span>
        ))}
      </div>
    </section>
    </div>
  );
}
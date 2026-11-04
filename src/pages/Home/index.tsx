import {
  FaExchangeAlt,FaFileAlt,FaLightbulb,FaBolt,FaWallet,FaEye,FaUserCircle,FaHeart,FaCommentDots,FaShareAlt,FaEllipsisH,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/avatar-soul.png";
import comunidadeImg from "../../assets/comunidade.png";
import { useContas } from "../../hooks/useContas";
import { gerarIniciais } from "../../utils/iniciais";
import MensagemEstado from "../../components/MensagemEstado";

const acoesRapidas = [
  { icon: FaExchangeAlt, label: "Sacar via PIX" },
  { icon: FaFileAlt, label: "Ler cupom fiscal" },
  { icon: FaLightbulb, label: "Resgatar vale energia" },
  { icon: FaBolt, label: "Pagar conta de luz" },
];

export default function Home() {
  const { dados, carregando, erro } = useContas();
  const contas = (dados ?? []).slice(0, 4);

  return (
    <div className="w-full m-auto">
      <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-8 sm:px-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-6 shadow-glow-primary sm:p-10">
          <span className="pointer-events-none absolute -right-6 -top-10 select-none text-[180px] font-bold text-white/10 sm:text-[240px]" aria-hidden>
            S
          </span>

          <div className="relative flex items-center gap-2 text-primary-foreground">
            <FaWallet className="h-6 w-6" />
            <span className="text-lg font-bold sm:text-xl">Minha carteira</span>
          </div>

          <div className="relative mt-6 flex items-center gap-2 text-primary-foreground/90">
            <span className="text-sm font-semibold">Saldo</span>
            <FaEye className="h-4 w-4" />
          </div>
          <p className="relative mt-1 text-3xl font-bold text-primary-foreground sm:text-4xl">
            R$ ••••
          </p>

          <button className="relative mt-8 w-full rounded-xl bg-white/15 py-3 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-white/25 sm:w-auto sm:px-8">
            Acessar carteira
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {acoesRapidas.map(({ icon: Icon, label }) => (
            <button key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-xs font-semibold sm:text-sm">{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6">
        <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">Contas cadastradas</h2>

          {carregando && <MensagemEstado tipo="carregando" texto="Carregando contas..." />}
          {erro && <MensagemEstado tipo="erro" texto={erro} />}
          {!carregando && !erro && contas.length === 0 && (
            <MensagemEstado tipo="vazio" texto="Nenhuma conta cadastrada por enquanto." />
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contas.map((conta) => (
              <div key={conta.codigo} className="flex flex-col overflow-hidden rounded-2xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {gerarIniciais(conta.nome)}
                  </span>
                  <h3 className="min-w-0 truncate text-sm font-bold sm:text-base">{conta.nome}</h3>
                </div>
                <p className="mt-3 text-xs text-muted-foreground sm:text-sm">@{conta.apelido}</p>
                <p className="flex-1 break-all text-xs text-muted-foreground sm:text-sm">{conta.email}</p>
                <Link
                  to={`/contas/${conta.codigo}`}
                  className="mt-4 block w-full rounded-xl bg-primary py-2.5 text-center text-xs font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:text-sm"
                >
                  Ver detalhes
                </Link>
              </div>
            ))}
          </div>

          <Link
            to="/contas"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <FaUserCircle className="h-4 w-4" />
            Ver todas as contas
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-85/100 px-4 pb-16 sm:px-6 sm:pb-20">
        <h2 className="text-xl font-bold sm:text-2xl">Atividades da comunidade</h2>

        <div className="relative mt-6">
          <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-primary/10">
                  <img src={avatarImg} alt="" className="h-full w-full object-contain" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold sm:text-base">Samuel Muca 2</span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      Eco Ativo
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">há 2 horas</span>
                </div>
              </div>
              <button aria-label="Mais opções" className="text-muted-foreground hover:text-primary">
                <FaEllipsisH className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm text-foreground sm:text-base">
              Mais uma conta de luz paga utilizando os créditos resgatados do app! Economia real e
              sustentabilidade juntas ⚡
            </p>

            <div className="relative mt-4 overflow-hidden rounded-2xl">
              <img src={comunidadeImg} alt="Torres de energia ao entardecer" className="h-64 w-full object-cover sm:h-72" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
                <FaBolt className="h-3.5 w-3.5" />
                -100 kWh economizados
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-border pt-4 text-sm font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <FaHeart className="h-4 w-4" />
                24 Curtidas
              </span>
              <span className="flex items-center gap-1.5">
                <FaCommentDots className="h-4 w-4" />
                5 Comentários
              </span>
              <span className="flex items-center gap-1.5">
                <FaShareAlt  className="h-4 w-4" />
                Compartilhar
              </span>
            </div>
          </div>      
        </div>
      </section>
    </div>
  );
}
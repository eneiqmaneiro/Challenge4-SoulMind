import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {FaRecycle,FaBicycle,FaBolt,FaCheck,FaTrophy,FaCheckCircle,} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { useMissoes } from "../../hooks/useMissoes";
import MensagemEstado from "../../components/MensagemEstado";
import type { MissaoComStatus } from "../../types/TipoMissao";
import type { EstadoNavegacao } from "../../types/TipoApi";
import reciclagemImg from "../../assets/reciclagem.png";
import aguaImg from "../../assets/agua.png";
import transporteImg from "../../assets/transporte.png";
import luzImg from "../../assets/luz.png";

const icones = {
  reciclagem: {
    Icon: FaRecycle,
    foto: reciclagemImg,
    cor: "text-emerald-600",
    tag: "bg-emerald-100 text-emerald-700",
    nome: "Reciclagem",
  },
  agua: {
    Icon: FaDroplet,
    foto: aguaImg,
    cor: "text-sky-500",
    tag: "bg-sky-100 text-sky-700",
    nome: "Água",
  },
  transporte: {
    Icon: FaBicycle,
    foto: transporteImg,
    cor: "text-primary",
    tag: "bg-primary/10 text-primary",
    nome: "Transporte",
  },
  energia: {
    Icon: FaBolt,
    foto: luzImg,
    cor: "text-primary",
    tag: "bg-primary/10 text-primary",
    nome: "Energia",
  },
};

const XP_POR_NIVEL = 50;

export default function Missoes() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const aviso = (state as EstadoNavegacao | null)?.aviso;

  const { dados, carregando, erro } = useMissoes();
  const missoes = dados ?? [];

  const [concluidas, setConcluidas] = useState<number[]>([]);

  const alternarMissao = (id: number) => {
    setConcluidas((atual) =>
      atual.includes(id)
        ? atual.filter((item) => item !== id)
        : [...atual, id]
    );
  };

  const lista: MissaoComStatus[] = missoes.map((missao) => ({
    ...missao,
    concluida: concluidas.includes(missao.id),
  }));

  const totalMissoes = missoes.length;

  const quantidadeConcluidas = concluidas.length;

  const xpGanho = missoes
    .filter((missao) => concluidas.includes(missao.id))
    .reduce((soma, missao) => soma + missao.xp, 0);

  const porcentagem =
    totalMissoes > 0
      ? (quantidadeConcluidas / totalMissoes) * 100
      : 0;
  const nivelAtual = Math.floor(xpGanho / XP_POR_NIVEL) + 1;
  const xpNoNivelAtual = xpGanho % XP_POR_NIVEL;
  const progressoNivel = (xpNoNivelAtual / XP_POR_NIVEL) * 100;
  const xpFaltaProximoNivel = XP_POR_NIVEL - xpNoNivelAtual;

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">

        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          Missões
        </h2>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Complete os desafios e cuide do planeta!
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl bg-card shadow-soft sm:mt-10">
          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold sm:text-base">Progresso semanal</p>
                <p className="text-sm font-bold text-primary sm:text-base">
                  {Math.round(porcentagem)}%
                </p>
              </div>

              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${porcentagem}%` }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-primary/5 px-4 py-3 text-center">
                  <p className="text-xl font-extrabold text-primary sm:text-2xl">
                    {quantidadeConcluidas}
                    <span className="text-sm font-semibold text-muted-foreground">/{totalMissoes}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                    Missões concluídas
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 px-4 py-3 text-center">
                  <p className="text-xl font-extrabold text-emerald-600 sm:text-2xl">
                    {xpGanho}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                    XP conquistado
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/5 px-6 py-5 md:w-52">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-soft">
                <FaTrophy className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold">Nível {nivelAtual}</p>

              <div className="w-full">
                <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progressoNivel}%` }}
                  />
                </div>
                <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
                  Faltam <span className="font-bold text-primary">{xpFaltaProximoNivel} XP</span> pro próximo nível
                </p>
              </div>
            </div>
          </div>
        </div>

        {aviso && (
          <p role="alert" className="mt-8 rounded-xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800">
            {aviso}
          </p>
        )}
        {carregando && <MensagemEstado tipo="carregando" texto="Carregando missões..." />}
        {erro && <MensagemEstado tipo="erro" texto={erro} />}
        {!carregando && !erro && missoes.length === 0 && (
          <MensagemEstado tipo="vazio" texto="Nenhuma missão disponível por enquanto." />
        )}

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">

          {lista.map((missao) => {
            const { Icon, foto, cor, tag, nome } = icones[missao.icone];
            const { concluida } = missao;

            return (
              <div
                key={missao.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  concluida ? "border-emerald-300" : "border-border"
                }`}
              >
                <div className="relative h-28">
                  <img
                    src={foto}
                    alt={nome}
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      concluida ? "opacity-70" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-soft ${cor}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  {concluida && (
                    <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/40">
                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-soft">
                        <FaCheckCircle className="h-3.5 w-3.5" />
                        Concluída
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${tag}`}>
                    {nome}
                  </span>

                  <h3 className="mt-3 text-sm font-bold sm:text-base">{missao.titulo}</h3>
                  <p className="mt-1 flex-1 text-xs text-muted-foreground sm:text-sm">
                    {missao.descricao}
                  </p>
                  <p className="mt-2 text-xs font-bold text-primary sm:text-sm">
                    +{missao.xp} pontos
                  </p>

                  <button
                    onClick={() => alternarMissao(missao.id)}
                    className={`mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 sm:text-sm ${
                      concluida ? "bg-emerald-500" : "bg-primary"
                    }`}
                  >
                    {concluida && <FaCheck className="h-4 w-4" />}
                    {concluida ? "Concluída" : "Fazer missão"}
                  </button>

                  <button
                    onClick={() => navigate(`/missoes/${missao.id}`)}
                    className="mt-2.5 inline-flex items-center justify-center rounded-xl border border-primary px-5 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary/10 sm:text-sm"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            );
          })}

        </div>
      </section>
    </div>
  );
}
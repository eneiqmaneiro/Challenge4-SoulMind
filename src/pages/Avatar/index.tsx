import { useState } from "react";
import {FaStar,FaSeedling,FaTint,FaRecycle,FaChartLine,FaLock,FaCheck,FaUndo,FaHeart,} from "react-icons/fa";
import {avatares,niveis} from "../../data/DadosAvatar";

export default function Avatar() {
  const pontosUsuario = 350;
  const [avatarEscolhido, setAvatarEscolhido] = useState(1);
  const nivelAtual =
    [...niveis]
      .reverse()
      .find((nivel) => pontosUsuario >= nivel.min) ??
    niveis[0];
  const indiceNivel = niveis.findIndex(
    (nivel) => nivel.nome === nivelAtual.nome
  );
  const proximoNivel = niveis[indiceNivel + 1];
  const progressoNivel = proximoNivel
    ? ((pontosUsuario - nivelAtual.min) /
        (proximoNivel.min - nivelAtual.min)) *
      100
    : 100;
  const avatarAtual = avatares.find(
    (avatar) => avatar.id === avatarEscolhido
  );
  const progressoGeral = 72;
  const raio = 52;
  const circunferencia = 2 * Math.PI * raio;
  const deslocamento =
    circunferencia * (1 - progressoGeral / 100);
  return (
    <div className=" mt-8 min-h-screen bg-background w-9/10 m-auto">
        
        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative h-32 w-32 shrink-0">
                <svg
                  viewBox="0 0 120 120"
                  className="h-full w-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r={raio}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-primary/10"/>
                  <circle
                    cx="60"
                    cy="60"
                    r={raio}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circunferencia}
                    strokeDashoffset={deslocamento}
                    className="text-primary"/>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                  {progressoGeral}%
                </span>
              </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-primary">
                      <FaChartLine className="h-4 w-4" />
                      Nível: {nivelAtual.nome}
                    </span>
                    {proximoNivel && (
                      <span className="text-muted-foreground">
                        {pontosUsuario} / {proximoNivel.min}
                      </span>
                    )}
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${Math.min(
                          progressoNivel,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  {proximoNivel && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {pontosUsuario} / {proximoNivel.min} para{" "}
                      {proximoNivel.nome}
                    </p>
                  )}
                </div>
              </div>
            </div>
          <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
            <h2 className="text-xl font-bold">
              Conquistas recentes
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <FaSeedling className="h-7 w-7 text-emerald-500" />
                </div>
                <span className="text-xs font-semibold sm:text-sm">
                  Plantador
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10">
                  <FaTint className="h-7 w-7 text-sky-500" />
                </div>
                <span className="text-xs font-semibold sm:text-sm">
                  Poupador de água
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <FaRecycle className="h-7 w-7 text-primary" />
                </div>
                <span className="text-xs font-semibold sm:text-sm">
                  Reciclador
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-5 rounded-3xl bg-card p-6 shadow-soft sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Personalize seu robô
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Escolha um avatar para representar você no Soul Up.
              Desbloqueie novos estilos usando seus pontos!
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <div className=" h-128 rounded-2xl border border-border bg-background p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold">
                  Seu avatar
                </p>
                <span className="flex items-center gap-1 text-sm font-bold text-primary">
                  <FaStar className="h-4 w-4 fill-primary" />
                  {pontosUsuario}
                </span>
              </div>
              <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-primary/5">
                {avatarAtual && (
                  <img
                    src={avatarAtual.imagem}
                    alt={`Avatar ${avatarAtual.nome}`}
                    className="h-full w-full object-contain animate-float"
                  />
                )}

              </div>
              {avatarAtual && (
                <div className="mt-4 text-center">

                  <p className="font-bold text-primary">
                    {avatarAtual.nome}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {avatarAtual.descricao}
                  </p>

                </div>
              )}
              <div className="mt-5 rounded-xl bg-primary/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">
                    Nível {nivelAtual.nome}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(progressoNivel)}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.min(
                        progressoNivel,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mb-5">
                <h3 className="text-xl font-bold">
                  Escolha seu avatar
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Quanto mais pontos você tiver, mais avatares
                  poderá desbloquear.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {avatares.map((avatar) => {
                  const desbloqueado =
                    pontosUsuario >= avatar.pontos;
                  const selecionado =
                    avatarEscolhido === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      disabled={!desbloqueado}
                      onClick={() =>
                        setAvatarEscolhido(avatar.id)
                      }
                      className={`group relative rounded-2xl border-2 p-3 text-left transition-all ${
                        selecionado
                          ? "border-primary bg-primary/5 shadow-md"
                          : desbloqueado
                            ? "border-transparent bg-background hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                            : "cursor-not-allowed border-transparent bg-background opacity-60"
                      }`}
                    >
                      {selecionado && (
                        <div className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <FaCheck className="h-3.5 w-3.5" />
                        </div>
                      )}
                      {!desbloqueado && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-background/70 backdrop-blur-sm">

                          <FaLock className="h-5 w-5" />

                          <p className="mt-2 text-xs font-bold">
                            Bloqueado
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs">
                            <FaStar className="h-3 w-3 fill-primary text-primary" />
                            {avatar.pontos} pontos
                          </p>

                        </div>
                      )}
                      <div className="flex h-44 items-center justify-center rounded-xl bg-primary/5 sm:h-48">
                        <img
                          src={avatar.imagem}
                          alt={`Avatar ${avatar.nome}`}
                          className="h-full w-full object-contain transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2">

                        <h3 className="text-sm font-bold">
                          {avatar.nome}
                        </h3>
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <FaStar className="h-3 w-3 fill-primary" />
                          {avatar.pontos}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {avatar.descricao}
                      </p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setAvatarEscolhido(1)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-background px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5">
                  <FaUndo className="h-4 w-4" />
                  Desfazer
                </button>
                <button
                  type="button"
                  onClick={() =>
                    console.log(
                      "Avatar salvo:",
                      avatarAtual
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5" >
                  <FaHeart className="h-4 w-4" />
                  Salvar avatar
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
  );   
}
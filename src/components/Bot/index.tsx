import { useState } from "react";
import { Link } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import avatarImg from "../../assets/avatar-soul.png";

export default function Bot() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {aberto && (
        <div className="absolute bottom-24 right-0 w-[calc(100vw-3rem)] max-w-sm rounded-3xl bg-card p-6 shadow-soft sm:p-8">
          <button
            type="button"
            onClick={() => setAberto(false)}
            aria-label="Fechar Soul Bot"
            className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            <FaX className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary">
              <img src={avatarImg} alt="Soul Bot" className="h-4/5 w-4/5 object-contain" />
            </div>
            <h3 className="text-xl font-bold sm:text-2xl">Soulzinho</h3>
          </div>

          <p className="mt-5 text-sm text-muted-foreground sm:text-base">
            Olá! Precisa de ajuda com sua conta ou tem dúvidas?
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <Link
              to="/tour"
              onClick={() => setAberto(false)}
              className="rounded-xl border border-primary/30 px-5 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Fazer tour guiado
            </Link>
            <Link
              to="/contas"
              onClick={() => setAberto(false)}
              className="rounded-xl border border-primary/30 px-5 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Ver contas
            </Link>
            <Link
              to="/avatar"
              onClick={() => setAberto(false)}
              className="rounded-xl border border-primary/30 px-5 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Personalizar o Soulzinho
            </Link>
            <Link
              to="/contato"
              onClick={() => setAberto(false)}
              className="rounded-xl border border-primary/30 px-5 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Falar com a equipe
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label={aberto ? "Fechar Soul Bot" : "Abrir Soul Bot"}
        aria-expanded={aberto}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-glow-primary transition-transform hover:-translate-y-0.5 sm:h-20 sm:w-20">
          <img src={avatarImg} alt="" aria-hidden className="h-4/5 w-4/5 animate-float object-contain" />   
      </button>
    </div>
  );
}
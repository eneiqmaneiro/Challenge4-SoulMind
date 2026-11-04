import { FaLinkedin, FaGithub } from "react-icons/fa";
import { DadosIntegrantes } from "../../data/DadosIntegrantes";

export default function QuemSomos() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
        Quem somos
      </h2>

      <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
        Conheça o time por trás da SoulMind
      </p>

      <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2">
        {DadosIntegrantes.map((integrante) => (
          <div
            key={integrante.id}
            className="flex items-center gap-4 rounded-2xl bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
          >
            <img
              src={integrante.foto}
              alt={integrante.nome}
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-4 ring-primary/10"
            />

            <div>
              <h3 className="text-base font-bold sm:text-lg">{integrante.nome}</h3>

              <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {integrante.rm}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">Turma: {integrante.turma}</p>

              <div className="mt-3 flex gap-2">
                <a
                  href={integrante.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LinkedIn de ${integrante.nome}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <FaLinkedin className="h-4 w-4" />
                </a>

                
                  <a
                  href={integrante.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub de ${integrante.nome}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <FaGithub className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
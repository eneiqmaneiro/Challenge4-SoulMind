import { Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import roboErro from "../../assets/robo-erro.png";

export default function PaginaErro() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/90 shadow-glow-primary sm:h-40 sm:w-40">
        <img
          src={roboErro}
          alt="Soul confuso, procurando a página"
          className=" w-8/10 h-9/10"
        />
      </div>

      <div className="mt-4 w-fit max-w-[90%] rounded-2xl rounded-tl-sm bg-primary/10 px-5 py-3 text-sm font-semibold text-primary sm:text-base">
        Hmm... acho que essa página não existe. 
      </div>

      <h1 className="mt-8 text-5xl font-bold text-primary sm:text-6xl">404</h1>
      <h2 className="mt-3 text-xl font-bold sm:text-2xl">Página não encontrada</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground sm:text-base">
        O link pode estar errado ou a página pode ter sido movida. Vamos te levar de volta para a Home.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:text-base">
        <FaHome className="h-4 w-4" />
        Voltar para a Home
      </Link>

    </section>
  );
}
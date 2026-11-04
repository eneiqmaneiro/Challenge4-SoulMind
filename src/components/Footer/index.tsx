import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="border-t border-border bg-background-secondary">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3 sm:gap-10 sm:px-6 sm:py-12">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="w-2/10  object-cover" />
              
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Plataforma gamificada que transforma atitudes sustentáveis em conquistas reais.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Navegação</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { nome: "Avatar", caminho: "/avatar" },
                { nome: "Contas", caminho: "/contas" },
              ].map((item) => (
                <li key={item.nome}>
                  <Link to={item.caminho} className="text-foreground/80 hover:text-primary">
                    {item.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Projeto</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {["Sobre o projeto", "Quem somos", "Perguntas frequentes", "Contato"].map((item) => (
                <li key={item}>
                  <Link to={item === "Sobre o projeto" ? "/sobre" : item === "Quem somos" ? "/quem-somos" : item === "Perguntas frequentes" ? "/faq" : "/contato"} className="text-foreground/80 hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    );
}
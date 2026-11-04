import { useForm } from "react-hook-form";
import { FaRegPaperPlane } from "react-icons/fa";
import type { ContaEntrada, ModoFormulario } from "../../types/TipoConta";

type Props = {
  modo: ModoFormulario;
  valoresIniciais?: Omit<ContaEntrada, "senha">;
  enviando: boolean;
  // Deve retornar true quando a API aceitou os dados
  aoEnviar: (dados: ContaEntrada) => Promise<boolean>;
};

const campo =
  "mt-2 w-full rounded-xl bg-primary/5 px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 sm:text-base";

export default function FormularioConta({ modo, valoresIniciais, enviando, aoEnviar }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContaEntrada>({ defaultValues: valoresIniciais });

  const submeter = async (dados: ContaEntrada) => {
    const sucesso = await aoEnviar({
      nome: dados.nome.trim(),
      apelido: dados.apelido.trim(),
      email: dados.email.trim(),
      senha: dados.senha,
    });
    if (sucesso && modo === "cadastro") reset();
  };

  const erroClasse = (temErro: boolean) =>
    `${campo} ${temErro ? "ring-2 ring-red-400" : "focus:ring-primary/40"}`;

  return (
    <form onSubmit={handleSubmit(submeter)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="text-sm font-bold">Nome completo</label>
          <input
            id="nome"
            type="text"
            placeholder="Digite o nome completo"
            {...register("nome", {
              required: "Por favor, informe o nome.",
              minLength: { value: 3, message: "O nome precisa ter pelo menos 3 letras." },
              maxLength: { value: 100, message: "O nome pode ter no máximo 100 letras." },
            })}
            className={erroClasse(!!errors.nome)}
          />
          {errors.nome && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="apelido" className="text-sm font-bold">Apelido</label>
          <input
            id="apelido"
            type="text"
            placeholder="Como quer ser chamado"
            {...register("apelido", {
              required: "Por favor, informe o apelido.",
              minLength: { value: 2, message: "O apelido precisa ter pelo menos 2 letras." },
              maxLength: { value: 20, message: "O apelido pode ter no máximo 20 letras." },
            })}
            className={erroClasse(!!errors.apelido)}
          />
          {errors.apelido && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.apelido.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-bold">E-mail</label>
          <input
            id="email"
            type="text"
            placeholder="Digite o e-mail"
            {...register("email", {
              required: "Por favor, informe o e-mail.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um e-mail válido." },
            })}
            className={erroClasse(!!errors.email)}
          />
          {errors.email && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="senha" className="text-sm font-bold">Senha</label>
          <input
            id="senha"
            type="password"
            autoComplete="new-password"
            placeholder={modo === "edicao" ? "Digite a senha para salvar" : "De 12 a 30 caracteres"}
            {...register("senha", {
              required: "Por favor, informe a senha.",
              minLength: { value: 12, message: "A senha precisa ter pelo menos 12 caracteres." },
              maxLength: { value: 30, message: "A senha pode ter no máximo 30 caracteres." },
            })}
            className={erroClasse(!!errors.senha)}
          />
          {errors.senha && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.senha.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="inline-flex w-fit items-center justify-center gap-1.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:text-base"
      >
        <FaRegPaperPlane className="h-4 w-4" />
        {enviando ? "Enviando..." : modo === "cadastro" ? "Cadastrar conta" : "Salvar alterações"}
      </button>
    </form>
  );
}

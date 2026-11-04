import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaMapPin, FaRegPaperPlane } from "react-icons/fa";
import avatarImg from "../../assets/soul-contato.png";
import type { ResultadoEnvio, TipoContato } from "../../types/TipoContato";

export default function Contato() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TipoContato>();

  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoEnvio | null>(null);

  // A API Java não possui endpoint de contato: o formulário apenas valida e confirma o envio
  const aoEnviar = async () => {
    setEnviando(true);
    setResultado(null);
    await new Promise((r) => setTimeout(r, 600));
    setResultado({ tipo: "sucesso", texto: "Mensagem enviada com sucesso!" });
    reset();
    setEnviando(false);
  };

  return (
    <div>
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Entre em contato</h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Sua mensagem é muito importante para nós
      </p>

      <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit(aoEnviar)}
          noValidate
          className="flex flex-col gap-5 rounded-3xl bg-card p-6 shadow-soft sm:p-8 lg:col-span-2"
        >
          <div>
            <label className="text-sm font-bold">Nome completo</label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              {...register("nome", {
                required: "Por favor, informe seu nome completo.",
                minLength: { value: 3, message: "O nome precisa ter pelo menos 3 letras." },
              })}
              className={`mt-2 w-full rounded-xl bg-primary/5 px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 sm:text-base ${
                errors.nome ? "ring-2 ring-red-400" : "focus:ring-primary/40"
              }`}
            />
            {errors.nome && (
              <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.nome.message}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-bold">E-mail</label>
              <input
                type="text"
                placeholder="Digite seu e-mail"
                {...register("email", {
                  required: "Por favor, informe seu e-mail.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um e-mail válido.",
                  },
                })}
                className={`mt-2 w-full rounded-xl bg-primary/5 px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 sm:text-base ${
                  errors.email ? "ring-2 ring-red-400" : "focus:ring-primary/40"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-bold">Assunto</label>
              <input
                type="text"
                placeholder="Assunto da mensagem"
                {...register("assunto", {
                  required: "Por favor, informe o assunto.",
                })}
                className={`mt-2 w-full rounded-xl bg-primary/5 px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 sm:text-base ${
                  errors.assunto ? "ring-2 ring-red-400" : "focus:ring-primary/40"
                }`}
              />
              {errors.assunto && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.assunto.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold">Mensagem</label>
            <textarea
              rows={5}
              placeholder="Escreva sua mensagem"
              {...register("mensagem", {
                required: "Por favor, escreva sua mensagem.",
                minLength: { value: 10, message: "A mensagem precisa ter pelo menos 10 caracteres." },
              })}
              className={`mt-2 w-full resize-none rounded-xl bg-primary/5 px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 sm:text-base ${
                errors.mensagem ? "ring-2 ring-red-400" : "focus:ring-primary/40"
              }`}
            />
            {errors.mensagem && (
              <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.mensagem.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="inline-flex w-fit disabled:opacity-60 items-center justify-center gap-1.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:text-base"
          >
            <FaRegPaperPlane className="h-4 w-4" />
            {enviando ? "Enviando..." : "Enviar mensagem"}
          </button>

          {resultado && (
            <p
              role={resultado.tipo === "erro" ? "alert" : "status"}
              className={`text-sm font-semibold ${resultado.tipo === "erro" ? "text-red-500" : "text-emerald-600"}`}
            >
              {resultado.texto}
            </p>
          )}
        </form>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 rounded-3xl bg-card p-6 shadow-soft sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <FaEnvelope className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold sm:text-base">E-mail</p>
                <p className="text-sm text-muted-foreground">rm569336@fiap.com.br</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <FaMapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold sm:text-base">Onde estamos</p>
                <p className="text-sm text-muted-foreground">São Paulo · SP</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-3xl bg-linear-to-br from-primary to-primary/70 p-8 text-center shadow-glow-primary">
            <h3 className="text-lg font-bold text-primary-foreground sm:text-xl">
              Vamos juntos transformar o mundo!
            </h3>
            <img src={avatarImg} alt="Assistente Soul" className="h-28 w-28 object-contain" />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
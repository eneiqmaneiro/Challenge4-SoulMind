
export default function Bot() {
  
  return (
    <div>
      {aberto && (
        <div>
          <button
            type="button"
            onClick={() => setAberto(false)}>
          </button>

          <div>
            <div>
              <img src={avatarImg} alt="Soul Bot"/>
            </div>
            <h3>Soul Bot</h3>
          </div>

          <p>
            Olá! Precisa de ajuda com sua conta ou tem dúvidas?
          </p>

          <div>
            <Link
              to="/tour"
              onClick={() => setAberto(false)}
            >
              Fazer tour guiado
            </Link>
            <Link
              to="/contas"
              onClick={() => setAberto(false)}>
              Ver contas
            </Link>
            <Link
              to="/avatar"
              onClick={() => setAberto(false)}>
              Personalizar Bot
            </Link>
            <Link
              to="/contato"
              onClick={() => setAberto(false)}>
              Falar com a equipe
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}>
        <img src={avatarImg} alt=""/>   
      </button>
    </div>
  );
}
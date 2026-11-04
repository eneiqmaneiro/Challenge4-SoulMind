export default function Contas() {
    return (
    <div>
      <section>
        <h2>Contas</h2>
        <p>
          Cadastre, consulte, edite e exclua as contas da plataforma.
        </p>

        <div>
          <h3>
            Nova conta
          </h3>
        </div>

        <div>
          {lista.map((conta) => (
            <div
              key={conta.codigo}
            >
              <div>
                <span>
                  {conta.iniciais}
                </span>
                <div>
                  <h3>{conta.nome}</h3>
                  <p>@{conta.apelido}</p>
                </div>
              </div>

              <div>
                <p>
                  {conta.email}
                </p>
              </div>

              <button
                onClick={() => navigate(`/contas/${conta.codigo}`)}>
                Ver detalhes
              </button>
              <button
                onClick={() => excluir(conta)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


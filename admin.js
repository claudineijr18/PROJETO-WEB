// Carrega usuários armazenados
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Atualiza a lista visual de usuários
function atualizarLista(filtrados = usuarios) {
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";

    filtrados.forEach((usuario) => {
        const li = document.createElement("li");
        li.textContent = `${usuario.nome} - ${usuario.email}`;

        // Botão de excluir individual pela pesquisa
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("btn-excluir");

        btnExcluir.onclick = () => {
            excluirUsuario(usuario.id);
        };

        li.appendChild(btnExcluir);
        lista.appendChild(li);
    });
}

// cadastro de um novo usuário
    document.getElementById("btnCadastrar").addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if (nome === "" || email === "") {
        alert("Preencha todos os campos!");
        return;
    }

    usuarios.push({
        id: Date.now(), 
        nome,
        email
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";

    alert("Usuário cadastrado com sucesso!");
    atualizarLista();
});

// Excluir usuário pelo ID
function excluirUsuario(id) {
    if (!confirm("Deseja excluir este usuário?")) return;

    usuarios = usuarios.filter(u => u.id !== id);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    atualizarLista();
}

// Botão para limpar os campos
    document.getElementById("btnLimparCampos").addEventListener("click", () => {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pesquisa").value = "";
});

// Busca atraves do nome OU e-mail
    document.getElementById("btnPesquisar").addEventListener("click", () => {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = usuarios.filter((u) =>
        u.nome.toLowerCase().includes(termo) ||
        u.email.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
        alert("Nenhum usuário encontrado.");
        atualizarLista();
        return;
    }

    atualizarLista(filtrados);
});

// Botão para excluir tudo
    document.getElementById("btnExcluirTudo").addEventListener("click", () => {
    if (!confirm("Excluir TODOS os usuários?")) return;

    usuarios = [];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    atualizarLista();
});

// Inicializa a lista
atualizarLista();

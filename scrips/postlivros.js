document.getElementById('btnCadastrar').addEventListener('click', async (e) => {
    e.preventDefault(); // Prevenir o envio do formulário

    // URL do endpoint da aplicação web API
    const url = "http://localhost:8001/livros";

    // Valores que estão vindo do front-end
    const nomeLivro = document.getElementById('nomeLivro').value;
    const nomeAutor = document.getElementById('nomeAutor').value;
    const nomeBibliografia = document.getElementById('nomeBibliografia').value;
    const edicao = document.getElementById('edicao').value;
    const nomeEditora = document.getElementById('nomeEditora').value;

    const dadosEnviados = {
        'nomeLivro': nomeLivro,
        'nomeAutor': nomeAutor,
        'nomeBibliografia': nomeBibliografia,
        'edicao': edicao,
        'nomeEditora': nomeEditora
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosEnviados)
        });

        if (response.ok) {
            alert("O livro foi cadastrado com sucesso");
            // Atualizar a tabela de usuários após o cadastro bem-sucedido (opcional)
            getUsuarios();
            // Limpar o formulário após o cadastro bem-sucedido
            document.getElementById('formCadastro').reset();
        } else {
            alert("Erro ao cadastrar o livro. Tente novamente");
        }
    } catch (error) {
        console.log(`O consumo do POST deu ruim: ${error}`);
    }
});

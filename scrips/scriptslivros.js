document.addEventListener("DOMContentLoaded", (e) => {
    const url = "http://localhost:8001/livros";
  
    async function getLivros() {
      try {
        const response = await fetch(url);
        console.log(response);
  
        const dados = await response.json();
        console.log(dados);
  
        dados.forEach((livros) => {
          const listaLivros = document.getElementById("listaLivros");
          const tr = document.createElement("tr");
  
          // Criação das células da tabela
          const nomeLivro = document.createElement("td");
          nomeLivro.textContent = livros.nomeLivro;
          const nomeAutor = document.createElement("td");
          nomeAutor.textContent = livros.nomeAutor;
          const nomeBibliografia = document.createElement("td");
          nomeBibliografia.textContent = livros.nomeBibliografia;
          const edicao = document.createElement("td");
          edicao.textContent = livros.edicao;
          const nomeEditora = document.createElement("td");
          nomeEditora.textContent = livros.nomeEditora;
  
          // Criação dos ícones de editar e deletar
          const tdEdit = document.createElement("img");
          tdEdit.src = "./assets/icons/pencil-fill.svg";
  
          tdEdit.addEventListener("click", () => {
            const id = livros.id;
            alert(id);
  
            // Modifica o título
            document.getElementById("title-form").textContent = "Atualizar Usuário";
            document.getElementById("btnCadastrar").textContent = "Atualizar";
  
            // Preenche os campos com os dados do usuário selecionado
            document.getElementById("nomeLivro").value = livros.nomeLivro;
            document.getElementById("nomeAutor").value = livros.nomeAutor;
            document.getElementById("nomeBibliografia").value = livros.nomeBibliografia;
            document.getElementById("edicao").value = livros.edicao;
            document.getElementById("nomeEditora").value = livros.nomeEditora;
  
            // Condição para confirmar atualização do usuário
            if (window.confirm("Você deseja atualizar o usuário ?")) {
              document.getElementById("btnCadastrar").removeEventListener("click");
              document.getElementById("btnCadastrar").addEventListener("click", () => {
                // Lógica para atualizar o usuário
              });
            }
          });
  
          // Criação do ícone de deletar
          const tdDelete = document.createElement("img");
          tdDelete.src = "./assets/icons/trash-fill.svg";
  
          tdDelete.addEventListener("click", async () => {
            const id = livros.id;
            alert(`Removendo: ${livros.nomeLivro}`);
            if (window.confirm("Você deseja excluir o livro ?")) {
              try {
                const retorno = await fetch(`${url}/${id}`, {
                  method: "DELETE"
                });
  
                if (retorno.ok) {
                  alert("Livro excluído com sucesso!");
                } else {
                  alert(`O livro não pode ser excluído ${retorno.status}`);
                }
  
                // Atualiza a página após a exclusão (opcional)
                // window.location.reload();
              } catch (error) {
                console.log(error);
              }
            }
          });
  
          // Adiciona classes aos ícones
          tdEdit.classList.add("edit");
          tdDelete.classList.add("delete");
  
          // Adiciona as células à linha da tabela
          tr.appendChild(nomeLivro);
          tr.appendChild(nomeAutor);
          tr.appendChild(nomeBibliografia);
          tr.appendChild(edicao);
          tr.appendChild(nomeEditora);
          tr.appendChild(tdEdit);
          tr.appendChild(tdDelete);
  
          // Adiciona a linha à lista de usuários
          listaLivros.appendChild(tr);
        });
      } catch (error) {
        console.error(error);
      }
    }
  

    

    // Logica Pesquisar livros

    async function pesqugeisarLivros() {
      const termo = document.getElementById('pesquisaInput').value;
      const response = await fetch(`http://localhost:8001/livros${termo}`);
      const data = await response.json();
      const livrosDiv = document.getElementById('livros');
      livrosDiv.innerHTML = '';
    
      if (data.length === 0) {
        livrosDiv.innerHTML = 'Nenhum livro encontrado.';
        return;
      }
    
      const table = document.createElement('table');
      const headers = ['Título', 'Autor', 'Biografia', 'Edição', 'Editora'];
    
      const headerRow = document.createElement('tr');
      headers.forEach(headerText => {
        const header = document.createElement('th');
        header.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(header);
      });
      table.appendChild(headerRow);
    
      data.forEach(livro => {
        const row = document.createElement('tr');
        headers.forEach(header => {
          const cell = document.createElement('td');
          cell.appendChild(document.createTextNode(livro[header.toLowerCase()]));
          row.appendChild(cell);
        });
        table.appendChild(row);
      });
    
      livrosDiv.appendChild(table);
    }
    
    

    getLivros();
    pesqugeisarLivros();
  });
  
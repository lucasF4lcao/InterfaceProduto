const apiUrl = "https://product-hub.up.railway.app/produtos";

async function fetchProdutos() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const produtos = await response.json();
    exibirProdutos(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    alert("Não foi possível carregar os produtos.");
  }
}

function exibirProdutos(produtos) {
  const tableBody = document.querySelector("#produtos-table tbody");
  tableBody.innerHTML = "";

  produtos.forEach((produto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${produto.id}</td>
          <td>${produto.nome}</td>
          <td>${produto.descricao}</td>
          <td>R$ ${produto.preco.toFixed(2)}</td>
          <td>${produto.estoque}</td>
          <td>${produto.dataValidade}</td>
          <td>
              <button class="delete-btn" data-id="${
                produto.id
              }">Excluir</button>
          </td>
      `;
    tableBody.appendChild(row);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", excluirProduto);
  });
}

async function cadastrarProduto(event) {
  event.preventDefault();

  const id = document.querySelector("#id").value;
  const nome = document.querySelector("#nome").value;
  const descricao = document.querySelector("#descricao").value;
  const preco = parseFloat(document.querySelector("#preco").value);
  const estoque = parseInt(document.querySelector("#estoque").value, 10);
  const dataValidade = document.querySelector("#dataValidade").value;

  const produto = { id, nome, descricao, preco, estoque, dataValidade };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar produto: ${response.status}`);
    }

    document.querySelector("#produto-form").reset();

    fetchProdutos();
    alert("Produto cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    alert("Não foi possível cadastrar o produto.");
  }
}
async function excluirProduto(event) {
  const produtoId = event.target.getAttribute("data-id");

  if (
    confirm(`Tem certeza que deseja excluir o produto com ID: ${produtoId}?`)
  ) {
    try {
      const response = await fetch(`${apiUrl}/${produtoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir produto: ${response.status}`);
      }

      alert("Produto excluído com sucesso!");
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Não foi possível excluir o produto.");
    }
  }
}
document
  .querySelector("#produto-form")
  .addEventListener("submit", cadastrarProduto);
document.addEventListener("DOMContentLoaded", fetchProdutos);

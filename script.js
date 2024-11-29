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
        `;

    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", fetchProdutos);

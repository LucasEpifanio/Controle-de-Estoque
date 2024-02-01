var quantidadeTotalRececao = 0;
var quantidadeTotalEstoque = 0;
var limiteTotalEstoque = 100;

function obterValorCampo(idCampo) {
  return parseInt(document.getElementById(idCampo).value) || 0;
}

function exibirErro(mensagem) {
  exibirMensagem("error", mensagem);
}

function adicionarQuantidadeRececao() {
  var quantidadeAdicionarRececao = obterValorCampo("quantidadeAdicionarRececao");

  if (quantidadeAdicionarRececao <= 0) {
    exibirErro("Insira uma quantidade válida para adicionar.");
    return;
  }

  if (quantidadeAdicionarRececao + quantidadeTotalRececao > 1000) {
    exibirErro("A quantidade em receção não pode ultrapassar 1.000.");
    return;
  }

  quantidadeTotalRececao += quantidadeAdicionarRececao;
  atualizarTotalRececao();
  exibirMensagem("success", `Quantidade adicionada com sucesso. Total em Receção: ${quantidadeTotalRececao}`);
  document.getElementById("quantidadeAdicionarRececao").value = "";
}

function retirarQuantidadeRececao() {
  var quantidadeRetirarRececao = obterValorCampo("quantidadeRetirarRececao");

  if (quantidadeRetirarRececao <= 0) {
    exibirErro("Insira uma quantidade válida para retirar.");
    return;
  }

  if (quantidadeTotalRececao < quantidadeRetirarRececao) {
    exibirErro("Quantidade insuficiente em receção para retirar.");
    return;
  }

  quantidadeTotalRececao -= quantidadeRetirarRececao;
  atualizarTotalRececao();
  exibirMensagem("success", `Quantidade retirada com sucesso. Total em receção: ${quantidadeTotalRececao}`);
  document.getElementById("quantidadeRetirarRececao").value = "";
}

function enviaraoEstoque() {
  var quantidadeEnviarEstoque = obterValorCampo("enviarparaestoque");

  if (quantidadeEnviarEstoque <= 0) {
    exibirErro("Insira uma quantidade válida para enviar ao estoque.");
    return;
  }

  if (quantidadeEnviarEstoque > quantidadeTotalRececao) {
    exibirErro("A quantidade a enviar é maior que o total em receção.");
    return;
  }

  quantidadeTotalRececao -= quantidadeEnviarEstoque;
  atualizarTotalRececao();

  var recebidoDaRececaoElement = document.getElementById("RecebidodaRececao");
  var quantidadeRecebidaDaRececao = parseInt(recebidoDaRececaoElement.textContent) + quantidadeEnviarEstoque;
  recebidoDaRececaoElement.textContent = quantidadeRecebidaDaRececao;

  exibirMensagem("success", "Quantidade enviada ao estoque com sucesso.");
  document.getElementById("enviarparaestoque").value = "";
}

function adicionarQuantidadeEstoque() {
  var quantidadeAdicionarEstoque = obterValorCampo("quantidadeAdicionarEstoque");

  if (quantidadeAdicionarEstoque <= 0) {
    exibirErro("Insira uma quantidade válida para adicionar ao estoque.");
    return;
  }

  var quantidadeRecebidaDaRececao = parseInt(document.getElementById("RecebidodaRececao").textContent);

  if (quantidadeAdicionarEstoque > quantidadeRecebidaDaRececao) {
    exibirErro("A quantidade adicionada ultrapassa a quantidade recebida da receção.");
    return;
  }

  if (quantidadeTotalEstoque + quantidadeAdicionarEstoque > limiteTotalEstoque) {
    exibirErro("A quantidade adicionada ultrapassará o limite máximo de estoque.");
    return;
  }

  quantidadeTotalEstoque += quantidadeAdicionarEstoque;
  atualizarTotalEstoque();
  exibirMensagem("success", `Quantidade adicionada com sucesso. Total em estoque: ${quantidadeTotalEstoque}`);
  document.getElementById("quantidadeAdicionarEstoque").value = "";

  var quantidadeRestanteNaRececao = quantidadeRecebidaDaRececao - quantidadeAdicionarEstoque;
  document.getElementById("RecebidodaRececao").textContent = Math.max(quantidadeRestanteNaRececao, 0);
}

function retirarQuantidadeEstoque() {
  var quantidadeRetirarEstoque = obterValorCampo("quantidadeRetirar");

  if (quantidadeRetirarEstoque <= 0) {
    exibirErro("Insira uma quantidade válida para retirar do estoque.");
    return;
  }

  if (quantidadeTotalEstoque < quantidadeRetirarEstoque) {
    exibirErro("Quantidade insuficiente em estoque para retirar.");
    return;
  }

  quantidadeTotalEstoque -= quantidadeRetirarEstoque;
  atualizarTotalEstoque();
  exibirMensagem("success", `Quantidade retirada com sucesso. Total em estoque: ${quantidadeTotalEstoque}`);
  document.getElementById("quantidadeRetirar").value = "";
}

function atualizarTotalRececao() {
  document.getElementById("totalRececao").textContent = quantidadeTotalRececao;
}

function atualizarTotalEstoque() {
  document.getElementById("totalEstoque").textContent = quantidadeTotalEstoque;
}

function exibirMensagem(type, message) {
  var messageElement = document.createElement("div");
  messageElement.className = type;
  var icon = type === "success" ? "✅" : "❌";

  messageElement.innerHTML = `
    <div class="background-message">
        <p class="message-container">${icon} ${message}</p>
        <button class="fechar" type="button" onclick="removerMensagem(this)">OK</button>
    </div>`;

  document.body.appendChild(messageElement);
}

function removerMensagem(button) {
  button.parentNode.remove();
}

function atualizarTotalRececao() {
  document.getElementById("totalRececao").textContent = quantidadeTotalRececao;
  var porcentagemRececao = (quantidadeTotalRececao / 1000) * 100;
  document.getElementById("progressRececao").value = porcentagemRececao;
  document.getElementById("porcentagemRececao").textContent = `${porcentagemRececao.toFixed(2)}%`;
}

function atualizarTotalEstoque() {
  document.getElementById("totalEstoque").textContent = quantidadeTotalEstoque;
  var porcentagemEstoque = (quantidadeTotalEstoque / limiteTotalEstoque) * 100;
  document.getElementById("progressEstoque").value = porcentagemEstoque;
  document.getElementById("porcentagemEstoque").textContent = `${porcentagemEstoque.toFixed(2)}%`;
}
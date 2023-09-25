const { ipcRenderer } = require("electron");

const button = document.getElementById("enviar_notificacao");
const form = document.querySelector("form");

button.addEventListener("click", (event) => {
  ipcRenderer.send("enviar-notificacao", "ping");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const corpo = document.getElementById("corpo").value;
  ipcRenderer.send("atualizar-notificacao", {
    titulo: titulo,
    corpo: corpo,
  });
});
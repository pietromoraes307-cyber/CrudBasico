let lista = JSON.parse(localStorage.getItem("dados")) || [];

const form = document.getElementById("form");
const inputId = document.getElementById("id");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const tabela = document.getElementById("lista");
const btnCancelar = document.getElementById("btnCancelar");
const btnSalvar = document.getElementById("btnSalvar");
const feedback = document.getElementById("feedback");

// SUBMIT
form.addEventListener("submit", function(e){
  e.preventDefault();
  const id = inputId.value;
  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();

  if(!nome || !email){
    showFeedback("Preencha todos os campos!", "red");
    return;
  }

  if(id){
    lista = lista.map(item => item.id == id ? {id:Number(id), nome, email} : item);
    showFeedback("Atualizado com sucesso!", "#38a169");
  } else {
    lista.push({id: Date.now(), nome, email});
    showFeedback("Adicionado com sucesso!", "#38a169");
  }

  salvar();
  resetForm();
  render();
});

// CANCELAR
btnCancelar.addEventListener("click", resetForm);

// RENDER
function render(){
  tabela.innerHTML = "";
  lista.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.email}</td>
      <td>
        <button class="editar" onclick="editar(${item.id})">Editar</button>
        <button class="excluir" onclick="remover(${item.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// EDITAR
function editar(id){
  const item = lista.find(i => i.id == id);
  inputId.value = item.id;
  inputNome.value = item.nome;
  inputEmail.value = item.email;
  btnCancelar.style.display = "inline-block";
  btnSalvar.textContent = "Atualizar";
  showFeedback("Modo edição", "#3182ce");
}

// REMOVER
function remover(id){
  if(!confirm("Deseja realmente excluir?")) return;
  lista = lista.filter(i => i.id != id);
  salvar();
  render();
  showFeedback("Item excluído", "#e53e3e");
}

// SALVAR
function salvar(){ localStorage.setItem("dados", JSON.stringify(lista)); }

// RESET
function resetForm(){
  form.reset();
  inputId.value = "";
  btnCancelar.style.display = "none";
  btnSalvar.textContent = "Salvar";
  feedback.style.opacity = 0;
}

// FEEDBACK VISUAL
function showFeedback(msg, color){
  feedback.textContent = msg;
  feedback.style.color = color;
  feedback.style.opacity = 1;
  setTimeout(()=>{ feedback.style.opacity = 0; }, 2000);
}

// INIT
render();
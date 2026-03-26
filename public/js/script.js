const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (id) {
    await fetch(`/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    });
  } else {
    await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    });
  }

  location.reload();
});

function editar(id, nome, email) {
  document.getElementById("id").value = id;
  document.getElementById("nome").value = nome;
  document.getElementById("email").value = email;
}

async function remover(id) {
  if (!confirm("Excluir?")) return;

  await fetch(`/users/${id}`, {
    method: "DELETE"
  });

  location.reload();
}
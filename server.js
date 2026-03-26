const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Aqui está o segredo: a pasta pública precisa estar como root do static
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
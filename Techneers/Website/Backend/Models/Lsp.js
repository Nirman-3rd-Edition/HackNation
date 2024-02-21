const mongoose = require("mongoose");

const lspSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  role: String,
  password: String,
  phoneno: String,
  fileid: String,
});

const Lsp = mongoose.model("LegalSP", lspSchema);

module.exports = Lsp;

const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    ethereumPublicKey: {
        type: String
    },
    ethereumPrivateKey: {
        type: String
    },
    userEmail: {
        type: String,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;


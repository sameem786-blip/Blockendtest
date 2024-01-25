const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const cors = require("cors");

const { connect } = require("./Config/index");

const AuthRoutes = require("./routes/auth")
const WalletRoutes = require("./routes/wallet")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connect();

app.use("/api/auth",AuthRoutes)
app.use("/api/wallets",WalletRoutes)

module.exports = app;

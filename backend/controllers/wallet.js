const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ethers = require("ethers")
const mongoose = require("mongoose")

const User = require("../Schemas/User")
const Wallet = require("../Schemas/Wallet")

const helpers = require("../helpers/index.js");

exports.fetchUserWallets = async(req, res) => {
    try {
        const email = req.userData.email;

        const wallets = await Wallet.find({ userEmail: email });

        res.status(200).json({
            wallets: wallets
        })
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal Server Error")
    }
}

exports.createEtherumWallet = async(req, res) => {
    try {
        const email = req.userData.email;

        const wallet = helpers.generateEthereumWallet();

        const walletObj = {
            ethereumPublicKey: wallet.publicKey,
            ethereumPrivateKey: wallet.privateKey,
            userEmail: email,
        };

        const newWallet = await Wallet.create(walletObj);

        res.status(200).json({
            wallet: newWallet  
        })
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal Server Error")
    }
}


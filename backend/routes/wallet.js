const router = require("express").Router();

const walletController = require("../controllers/wallet");

const checkLogin = require("../middlewares/checkLogin")

router.get("/getWallets",checkLogin, walletController.fetchUserWallets);
router.post("/createWallet",checkLogin, walletController.createEtherumWallet);

module.exports = router;

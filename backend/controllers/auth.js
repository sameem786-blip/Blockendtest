const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ethers = require("ethers")
const mongoose = require("mongoose")

const User = require("../Schemas/User")
const Wallet = require("../Schemas/Wallet")

const helpers = require("../helpers/index.js")

exports.signup = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userObj = {
      email: req.body.email,
      encryptedPassword: req.body.password,
    };

    // Check if the user already exists
    const userResponse = await User.findOne({ email: userObj.email }).session(session);

    if (userResponse) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userObj.encryptedPassword, 10);
    userObj.encryptedPassword = hashedPassword;

    const newUser = await User.create([userObj], { session });

    const wallet = helpers.generateEthereumWallet();

    const walletObj = {
      ethereumPublicKey: wallet.publicKey,
      ethereumPrivateKey: wallet.privateKey,
      userEmail: newUser[0].email,
    };

    const newWallet = await Wallet.create([walletObj], { session });

    // Remove password from the response
    const { encryptedPassword, ...userWithoutPassword } = newUser[0].toObject();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "User Created Successfully",
      user: userWithoutPassword,
      wallet: wallet,
    });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json("Internal Server Error");
  }

};

//login
exports.login = async (req, res) => {
  try {
    //check if user exists
    const userResponse = await User.findOne({ email: req.body.email });

    if (!userResponse) {
      return res.status(404).json("User does not exists");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userResponse.encryptedPassword
    );

    if (!passwordMatch) {
      return res.status(401).json("Incorrect password"); // Unauthorized
    }

    const { encryptedPassword, ...userWithoutPassword } =
      userResponse.toObject();

    const token = jwt.sign(
      { email: userResponse.email },
        process.env.JWT_SECRET,
      { expiresIn: '5d' }
    );

    return res
      .status(200)
      .json({
        message: "Login successful",
        token: token,
        user: userWithoutPassword,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};
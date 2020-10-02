const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
let Account = require('../models/accounts.model');

router.route('/').get((req, res) => {
  Account.find()
    .then(accounts => res.json(account))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/sign-up", async (req, res) => {
  try{
    const { Email, username, password, passwordCheck } = req.body;

    const existingAccount = await Account.findOne({Email: Email})
    if (existingAccount)
      return res
        .status(400)
        .json({ msg: "An account is already exists" });
    
    if (password !== passwordCheck)
      return res
          .status(400)
          .json({ msg: "enter same passeord" });

    const salt = await bcrypt.genSalt();
    const passeordHash = await bcrypt.hash(password, salt);

    const newAccount = new Account({
      Email,
      username,
      password: passeordHash,
    });

    newAccount.save();
    console.log(newAccount);
    return res.json(newAccount);
  }catch (err){
    res.status(500).json({ error: err });
  }
});

router.post("/log-in", async (req, res) => {
  try{
    const { Email, password } = req.body;

    const user = await Account.findOne({Email: Email})
    if (!user)
      return res
        .status(400)
        .json({ msg: "An account is not exists" });

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res
        .status(400)
        .json({ msg: "password dont match"});

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.username
      },
    });
  }catch (err){
    res.status(500).json({ error: err });
  }

});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await Account.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json({ msg: "hey"});

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await Account.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getUser", auth, async (req, res) => {
  const user = await Account.findById(req.user);
  res.json({
    displayName: user.username,
    id: user._id,
  });
});

module.exports = router;
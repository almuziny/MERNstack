const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
let Account = require('../models/accounts.model');
let Product = require("../models/product.model");

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

    //console.log(user);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getUser", auth,  (req, res) => {

  Account.findById(req.user, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
  /*
  const user = Account.findById(req.user);
  console.log(user._id);
  
  res.json({
    displayName: user.username,
    id: user._id,
    cart: user.cart
  });
  */
});

router.get('/addToCart', auth, (req, res) => {


  Account.findOne({ _id: req.user }, (err, userInfo) => {
      let duplicate = false;

    

      userInfo.cart.forEach((item) => {
          if (item.id == req.query.productId) {
              duplicate = true;
          }
      })


      if (duplicate) {
        Account.findOneAndUpdate(
              { _id: req.user, "cart.id": req.query.productId },
              { $inc: { "cart.$.quantity": 1 } },
              { new: true },
              (err, userInfo) => {
                  if (err) return res.json({ success: false, err });
                  res.status(200).json(userInfo.cart)
              }
          )
      } else {
        Account.findOneAndUpdate(
              { _id: req.user },
              {
                  $push: {
                      cart: {
                          id: req.query.productId,
                          quantity: 1,
                          date: Date.now()
                      }
                  }
              },
              { new: true },
              (err, userInfo) => {
                  if (err) return res.json({ success: false, err });
                  res.status(200).json(userInfo.cart)
              }
          )
      }
  })
  
});

router.get('/removeFromCart', auth, (req, res) => {
  //console.log("user:", req.user);
  //console.log("query:",req.query._id);

  /*
  Account.findOneAndUpdate(
      { _id: req.user },
      {
          "$pull":
              { "cart": { "id": req.query._id } }
      },
      { new: true },
      (err, userInfo) => {
          let cart = userInfo.cart;
          let array = cart.map(item => {
              return item.id
          })

          Product.find({ '_id': { $in: array } })
              .populate('writer')
              .exec((err, cartDetail) => {
                  return res.status(200).json({
                      cartDetail,
                      cart
                  })
              })
      }
      
  )
  */

  Account.update(
    { _id : req.user },
    {
      "$pull":
          { "cart": { "id": req.query._id } }
    },
    (err, data) => {
      console.log(err, data);
    }
  )

  
})


module.exports = router;
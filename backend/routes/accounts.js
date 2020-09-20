const router = require('express').Router();
let Account = require('../models/accounts.model');

router.route('/').get((req, res) => {
  Account.find()
    .then(accounts => res.json(account))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sign-up').post((req, res) => {
  const Email = req.body.Email;
  const username = req.body.username;
  const password = req.body.password;

  const newAccount = new Account({
    Email,
    username,
    password,
  });

  newAccount.save()
  .then(() => res.json('account added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
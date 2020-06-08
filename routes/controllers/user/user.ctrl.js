const User = require('../../../db/models/User_schema')

exports.signIn = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    const token = await newUser.generateAuthToken();

    res.status(201).json({ user: newUser.toJSON(), token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).json({ user: user.toJSON(), token })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.edit = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'password', 'avatar'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation)
    return res.status(400).json({ error: 'invalid updates' });

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.status(200).json({ user: req.user.toJSON() })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).json({ user: req.user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

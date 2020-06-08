const router = require('express').Router();
const {
  signIn,
  login,
  logout,
  logoutAll,
  edit,
  deleteUser } = require('./user.ctrl');
const auth = require('../middleware/auth');

router.post('/', signIn); 
router.post('/login', login); 
router.post('/logout', auth, logout); 
router.post('/logoutAll', auth, logoutAll); 

router.get('/me', auth, (req, res) => res.status(200).json({ user: req.user })); 

router.put('/me', auth, edit); 

router.delete('/me', auth, deleteUser); 

module.exports = router;
const router = require('express').Router();
const {
  register,
  login,
  logout,
  editUserDetails,
  deleteUser } = require('./user.ctrl');
const auth = require('../../middleware/auth');

router.post('/', register); 
router.post('/login', login); 
router.post('/logout', auth, logout); 
// router.post('/logoutAll', auth, logoutAll); 

router.get('/me', auth, (req, res) => res.status(200).json({ user: req.user })); 

router.put('/me', auth, editUserDetails); 

router.delete('/me', auth, deleteUser); 

module.exports = router;
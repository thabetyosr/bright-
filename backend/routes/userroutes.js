const express = require('express');

const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { userSchema } = require('../controllers/usercontroller');

const { registerUser, loginUser, getUserProfile } = require('../controllers/usercontroller');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', auth, getUserProfile);
router.post('/register', validate(userSchema), registerUser);
module.exports = router;
const Router = require('express');
const { signInHandle, signUpHandle } = require('./user.controller');

const router = Router();

router.post('/signin', signInHandle);
router.post('/signup', signUpHandle);

module.exports = router;

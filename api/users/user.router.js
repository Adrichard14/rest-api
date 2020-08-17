const { createUser, getUsers, getUserByID, updateUser, deleteUser, login} = require('./user.controller');

const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

router.route('/', checkToken)
.get(checkToken, getUsers)
.post(checkToken, createUser)
.patch(checkToken, updateUser)
.delete(checkToken, deleteUser);
router.get('/:ID', checkToken, getUserByID);
router.post('/login', login);


//Formato "tradicional"
// router.patch('/', updateUser);
// router.delete('/', deleteUser);
// router.post('/', createUser);
// router.get('/', getUsers);


module.exports = router;
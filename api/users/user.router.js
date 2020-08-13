const { createUser, getUsers, getUserByID, updateUser, deleteUser} = require('./user.controller');

const router = require('express').Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:ID', getUserByID);
router.patch('/', updateUser);
router.delete('/', deleteUser);



module.exports = router;
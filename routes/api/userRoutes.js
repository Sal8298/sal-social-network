const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/userController');

// route = /api/users/
router.route('/').get(getAllUsers).post(createUser);

// route = /api/users/:userId
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// route = /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(createFriend).delete(deleteFriend);

module.exports = router;
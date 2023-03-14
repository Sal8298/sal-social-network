const User = require('../models/user');

const userController = {

    //Get all Users
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((error) => res.status(500).json(error));
    },

    //Get one User
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this Id' })
                    : res.json(user)
            )
            .catch((error) => res.status(500).json(error));
    },

    //Create a User
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((error) => res.status(500).json(error));
    },

    //Delete a User
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID exists' })
                    : res.json({ message: 'User was successfully deleted' })
            )
            .catch((eror) => res.status(500).json(error))
    },

    //Update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((userUpdate) =>
                !userUpdate
                    ? res.status(404).json({ message: 'No user with this id was fonud' })
                    : res.json(userUpdate)
            )
            .catch((error) => res.status(500).json(error));
    },

    //Adding a Friend
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((userFriend) =>
                !userFriend
                    ? res.status(404).json({ message: 'No user with this id was found in friends' })
                    : res.json(userFriend)
            )
            .catch((error) => res.status(500).json(error));
    },

    //Deleting a Friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { runValidators: true, new: true, }
        )
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No user with this Id was found' })
                    : res.json({ message: 'Friend deleted sucessfully.' })
            )
            .catch((error) => res.status(500).json(error));
    },

};

module.exports = userController;
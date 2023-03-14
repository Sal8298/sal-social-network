const Thought = require('../models/thought');
const User = require('../models/user');


const thoughtController = {

  //Get All THoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughtData) => res.json(thoughtData))
      .catch((error) => res.status(500).json(error));
  },

  //Get One Thought
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that Id was found. Please try again.' })
          : res.json(thought))
      .catch((error) => res.status(500).json(error))
  },

  //Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'thought created, but found no user with that ID',
          })
          : res.json('Thought has been created sucessfully.')
      )
      .catch((error) => res.status(500).json(error));
  },

  //Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id was found.' })
          : res.json(thought)
      )
      .catch((error) => res.status(500).json(error));
  },

  //Delete a Thouhgt
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought with this id' })
          : res.json({ message: 'Thought was deleted' })
      )
      .catch((error) => res.status(500).json(error));

  },

  //Creating a Reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true },
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No thought with this id' })
          : res.json(reaction)
      )
      .catch((error) => res.status(500).json(error));
  },

  //Deleting a Reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true },
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No thought with this id' })
          : res.json(reaction)
      )
      .catch((error) => res.status(500).json(error));
  },

};

module.exports = thoughtController;
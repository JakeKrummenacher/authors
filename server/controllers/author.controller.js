const { response } = require('express');
const Author = require('../models/author.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    })
}

module.exports.findAllAuthors = (request, response) => {
    Author.find({})
        .then((allAuthors) => {
            response.json({authors: allAuthors})
        })
        .catch((err) => {
            response.json({message: "Something went wrong", error: err})
        })
}

module.exports.findOneSingleAuthor = (req, res) => {
    Author.findOne({_id: req.params.id })
        .then( oneSingleAuthor => {
            res.json({author: oneSingleAuthor})
        })
        .catch((err) => {
            response.json({message: "Something went wrong", error: err})
        })
}

module.exports.createAuthor = (request, response) => {
    Author.create(request.body)
        .then(author => response.json(author))
        .catch(err => {
            response.status(400).json(err);
        });
}


module.exports.updateExistingAuthor = (req, res) => {
    Author.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true}
    )
        .then(updatedAuthor => {
            res.json({ author: updatedAuthor })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}

module.exports.deleteAnExistingAuthor = (req, res) => {
    Author.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err})
        });
}
const { Author, Book } = require("../model/model")
const authorController = {
    //Add author
    addAuthor: async (req, res) => {
        try {
            const newAuthor = new Author(req.body)
            console.log(newAuthor);
            const savedAuthor = await newAuthor.save()
            res.status(200).json(savedAuthor)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllAuthor: async (req, res) => {
        try {
            const authors = await Author.find()
            res.status(200).json(authors)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAnAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate("books")
            res.status(200).json(author)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateAnAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id)
            await Author.updateOne({ $set: req.body })
            res.status(200).json("updated author")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteAnAuthor: async (req, res) => {
        try {
            await Book.updateMany({ author: req.params.id })
            await Author.findByIdAndDelete(req.params.id)
            res.status(200).json("updated author")
        } catch (error) {
            res.status(500).json(error)
        }
    },
}

module.exports = authorController
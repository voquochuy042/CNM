const bookController = require("../controllers/bookController")
const router = require("express").Router()
router.post("/", bookController.addABook)

router.get("/", bookController.getAllBooks)

router.get("/:id", bookController.getABooks)

router.put("/:id", bookController.updateBook)

router.delete("/:id", bookController.deleteBook)
module.exports = router
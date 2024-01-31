const authorController = require("../controllers/authorController")

const router = require("express").Router()
//add
router.post("/", authorController.addAuthor)
//get
router.get("/", authorController.getAllAuthor)
//
router.get("/:id", authorController.getAnAuthor)

router.put("/:id", authorController.updateAnAuthor)

router.delete("/:id", authorController.deleteAnAuthor)
module.exports = router
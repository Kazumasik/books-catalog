const express = require("express");
const { body } = require("express-validator");

const bookController = require("../controllers/book");
const commentController = require("../controllers/comment");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post('/create',  bookController.postBook);

router.post('/:bookId/comment', commentController.createComment);

router.get('/:bookId',  bookController.getBookById);


module.exports = router;

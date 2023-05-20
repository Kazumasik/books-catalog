const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const bookController = require("../controllers/book");
const commentController = require("../controllers/comment");

const router = express.Router();

router.post('/create', isAuth,  bookController.postBook);

router.post('/:bookId/comment', isAuth, commentController.createComment);

router.get('/:bookId/comment', commentController.getComments);

router.put('/:bookId', isAuth,  bookController.updateBook);

router.delete('/:bookId', isAuth,  bookController.deleteBook);

router.get('/:bookId',  bookController.getBookById);

router.get('/',  bookController.getBooks);

module.exports = router;

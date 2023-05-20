const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const bookController = require("../controllers/book");
const commentController = require("../controllers/comment");

const router = express.Router();

router.post("/create", isAuth, bookController.postBook);

router.post(
  "/:bookId/comment",
  isAuth,
  [body("content").trim().not().isEmpty()],
  commentController.createComment
);

router.get("/:bookId/comment", commentController.getComments);

router.delete("/comment/:commentId", isAuth, commentController.deleteComment);

router.put("/comment/:commentId", isAuth, commentController.updateComment);

router.put("/:bookId", isAuth, bookController.updateBook);

router.delete("/:bookId", isAuth, bookController.deleteBook);

router.get("/:bookId", bookController.getBookById);

router.get("/", bookController.getBooks);

module.exports = router;

const Book = require("../models/book");
const Comment = require("../models/comment");

exports.getBooks = (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Номер страницы
  const limit = 30; // Количество книг на странице

  const skip = (page - 1) * limit; // Количество пропускаемых книг

  Book.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("-comments")
    .exec()
    .then((books) => {
      res.send(books);
    })
    .catch((error) => {
      next(error);
    });
};

exports.postBook = (req, res, next) => {
  // const imageUrl = req.file.path;
  const title = req.body.title;
  const origTitle = req.body.origTitle;
  const description = req.body.description;
  const genres = req.body.genres;

  const book = new Book({
    title: title,
    origTitle: origTitle,
    description: description,
    genres: genres,
  });
  book
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateBook = (req, res, next) => {
  const bookId = req.params.bookId;
  const updateData = {
    title: req.body.title,
    origTitle: req.body.origTitle,
    description: req.body.description,
    genres: req.body.genres,
  };

  Book.findByIdAndUpdate(bookId, updateData, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res
          .status(404)
          .json({ error: "Book with this id does not exist" });
      }
      res.send(updatedBook);
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBookById = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .populate("genres")
    .select("-comments")
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 404;
        error.message = "Book with this id does not exist.";
      }
      next(error);
    });
};

exports.deleteBook = (req, res, next) => {
  const bookId = req.params.bookId;

  Comment.deleteMany({ book: bookId })
    .then(() => {
      return Book.findByIdAndDelete(bookId);
    })
    .then((deletedBook) => {
      if (!deletedBook) {
        return res
          .status(404)
          .json({ error: "Book with this id does not exist/" });
      }
      res.send({ message: "Book successfully deleted." });
    })
    .catch((error) => {
      next(error);
    });
};

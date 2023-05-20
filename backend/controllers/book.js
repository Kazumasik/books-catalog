const Book = require("../models/book");
const Comment = require("../models/comment");

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

exports.getBookById = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .populate("genres")
    .select("-comments")
    // .populate({
    //   path: "comments",
    //   select: "-book",
    //   options: { sort: { createdAt: -1 } },
    //   populate: {
    //     path: "user",
    //     model: "User",
    //     select: "-password -email",
    //   },
    // })
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

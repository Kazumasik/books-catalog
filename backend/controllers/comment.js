// commentController.js

const Book = require('../models/book');
const Comment = require('../models/comment');

// Контроллер для создания комментария
exports.createComment = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { user, content } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    const newComment = new Comment({
      book: bookId,
      user,
      content,
    });

    const savedComment = await newComment.save();

    book.comments.push(savedComment._id);
    await book.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Контроллер для редактирования комментария
// exports.updateComment = async (req, res) => {
//   try {
//     const { bookId, commentId } = req.params;
//     const { content } = req.body;

//     // Поиск комментария по идентификатору
//     const comment = await Comment.findById(commentId);

//     // Если комментарий не найден
//     if (!comment) {
//       return res.status(404).json({ error: 'Комментарий не найден' });
//     }

//     // Обновление содержимого комментария
//     comment.content = content;
//     await comment.save();

//     res.status(200).json(comment);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка сервера при редактировании комментария' });
//   }
// };

// Контроллер для удаления комментария
// exports.deleteComment = async (req, res) => {
//   try {
//     const { bookId, commentId } = req.params;

//     // Поиск книги по идентификатору
//     const book = await Book.findById(bookId);

//     // Если книга не найдена
//     if (!book) {
//       return res.status(404).json({ error: 'Книга не найдена' });
//     }

//     // Поиск и удаление комментария
//     await Comment.findByIdAndRemove(commentId);

//     // Удаление комментария из списка комментариев книги
//     book.comments = book.comments.filter((comment) => comment.toString() !== commentId);
//     await book.save();

//     res.status(200).json({ message: 'Комментарий успешно удален' });
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка сервера при удалении комментария' });
//   }
// };
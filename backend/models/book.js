const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    origTitle: {
      type: String,
      required: false,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Book", bookSchema);

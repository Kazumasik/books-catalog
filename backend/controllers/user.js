const User = require("../models/user");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);

  User.findById(userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 404;
        error.message="User with this id does not exist."
      }
      next(error);
    });
};

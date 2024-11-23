const User = require("../models/User.model");
const mongoose = require("mongoose");


module.exports.register = (req, res, next) => {
 res.render("auth/register")
}

module.exports.doRegister = (req, res, next) => {
    User.create(req.body)
      .then((user) => {
        user.checkPassword(req.body.password);
        res.redirect("/login");
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.render("auth/register", {
            user: {
              email: req.body.email,
            },
            errors: err.errors,
          });
        } else {
          next(err);
        }
      });
  };
  
module.exports.login = (req, res, next) => {
    res.render("auth/login");
  };
    module.exports.doLogin = (req, res, next) => {
        const { email, password } = req.body;
      
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              res.redirect("/login");
            } else {
              user.checkPassword(password).then((match) => {
                if (match) {
                  res.redirect("/profile");
                } else {
                  res.redirect("/login");
                }
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      };
      
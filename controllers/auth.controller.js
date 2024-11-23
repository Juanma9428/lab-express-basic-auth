const User = require("../models/User.model");
const mongoose = require("mongoose");


module.exports.register = (req, res, next) => {
 res.render("auth/register")
}

module.exports.doRegister = (req, res, next) => {
  User.create(req.body)
    .then((user) => {
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
      }
        else if (err.code === 11000) {

          res.render("auth/register", {
            user: req.body,
            errors: {
              email: "El correo electrónico ya está registrado.",
            },
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
          if (user) {
            return user.checkPassword(password).then((match) => {
              if (match) {
                req.session.userId = user.id; // genero cookie y session
                res.redirect("/profile");
              } else {
                console.log("Email o contraseña incorrectos"); // contraseña incorrecta
                renderWithErrors();
              }
            });
          } else {
            console.log("Email o contraseña incorrectos"); // no existe usuario con ese email
            renderWithErrors();
          }
        })
        .catch((err) => next(err));
    };
    
      module.exports.logout = (req, res, next) => {
        req.session.destroy();
        res.clearCookie("express-cookie");
        res.redirect("/login");
      };

      
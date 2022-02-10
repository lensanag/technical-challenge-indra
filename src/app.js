if (process.env.NODE_ENV === "local-test") {
  require("dotenv").config();
}

var createError = require("http-errors");
var express = require("express");

var filmsRouter = require("./routes/films");
var peopleRouter = require("./routes/people");
var forceUsersRouter = require("./routes/force-users");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// var swaggerUi = require("swagger-ui-express"),
//   swaggerDocument = require("./swagger.json");
// app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/peliculas", filmsRouter);
app.use("/personas", peopleRouter);
app.use("/usuarios-de-la-fuerza", forceUsersRouter);

// catch 404 and forward to error handler
app.use(function (_, __, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

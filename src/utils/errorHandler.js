var errorHandler = (res, err) => {
  res.status(404);
  return res.json({ ...err });
};

module.exports = errorHandler;

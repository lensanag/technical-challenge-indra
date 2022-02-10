var errorHandler = (res, err) => {
  if (err.response.status === 404) return res.status(404).json({ ...err });
  else return res.status(500).json({ ...err });
};

module.exports = errorHandler;

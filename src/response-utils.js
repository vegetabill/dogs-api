const createNotAllowedHandler = (allowedMethods = ['GET']) => {
  return (req, res) => {
    res
      .status(405)
      .set('Allowed', allowedMethods.join(', '))
      .end();
  };
};

module.exports = { createNotAllowedHandler };

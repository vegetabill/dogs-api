const { camelize } = require('./utils');

const createNotAllowedHandler = (allowedMethods = ['GET']) => {
  return (req, res) => {
    res
      .status(405)
      .set('Allowed', allowedMethods.join(', '))
      .end();
  };
};

const sendData = (res, data) => {
  res.send(camelize(data));
};

module.exports = { createNotAllowedHandler, sendData };

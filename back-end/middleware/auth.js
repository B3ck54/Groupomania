// vérifie le token envoyé par l'application front-end avac sa requête, vérifie si :
// - s'il s'agit d'un token valable
// - l'userId correspond bien à celui qui est encodé dans le token

const { exists } = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // récupére le token dans le header autorization
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
});  }
};
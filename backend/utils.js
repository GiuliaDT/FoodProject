import jwt, { decode } from 'jsonwebtoken';

export const getAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      isAdmin: user.isAdmin,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );
};

export const checkAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // getting just the token and not the Bearer
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Authorization Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

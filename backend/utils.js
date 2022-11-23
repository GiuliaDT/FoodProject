import jwt from 'jsonwebtoken';

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

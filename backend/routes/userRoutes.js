import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { getAccessToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          isAdmin: user.isAdmin,
          token: getAccessToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Wrong email or password. Acess denied' });
  })
);

export default userRouter;

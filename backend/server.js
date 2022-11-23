import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedDBrouter from './routes/seed.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connection ready');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedDBrouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

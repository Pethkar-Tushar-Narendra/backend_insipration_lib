import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoute.js';
import userRouter from './routes/userRoutes.js';
import fieldRouter from './routes/fieldRoute.js';

dotenv.config();

mongoose
  .connect(process.env.Mongodb_Url)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed/', seedRouter);
app.use('/api/', userRouter);
app.use('/api/fields/', fieldRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

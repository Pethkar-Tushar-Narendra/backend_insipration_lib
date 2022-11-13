import express from 'express';
import RegisteredUser from '../models/RegisteredUser.js';
import Study_fields from '../models/Study_fields.js';
import data from '../data.js';
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Study_fields.remove({});
  const createStudyFields = await Study_fields.insertMany(data.Study_Fields);
  await RegisteredUser.remove({});
  const createUser = await RegisteredUser.insertMany(data.registered_users);
  res.send({ createUser, createStudyFields });
});

export default seedRouter;

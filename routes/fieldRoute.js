import express from 'express';
import Study_fields from '../models/Study_fields.js';
const fieldRouter = express.Router();

fieldRouter.get('/', async (req, res) => {
  const fields = await Study_fields.find();
  if (fields.length > 0) {
    res.send(fields);
  } else {
    res
      .status(404)
      .send({ message: 'No fields Available. Please add Fields first' });
  }
});

export default fieldRouter;

import express from 'express';
import RegisteredUser from '../models/RegisteredUser.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth } from '../utils.js';
const userRouter = express.Router();

userRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const members = await RegisteredUser.aggregate([
      {
        $group: { _id: null, numMembers: { $sum: 1 } },
      },
    ]);
    const studyCategories = await RegisteredUser.aggregate([
      {
        $group: {
          _id: '$study_field',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    const dailyAdmissions = await RegisteredUser.aggregate([
      {
        $group: {
          _id: '$admission_date',
          admissions: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const dailySubOver = await RegisteredUser.aggregate([
      {
        $group: {
          _id: '$subscription_end_date',
          admissions: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.send({ members, studyCategories, dailyAdmissions, dailySubOver });
  })
);
userRouter.get(
  '/registered_users',
  expressAsyncHandler(async (req, res) => {
    const registered_users = await RegisteredUser.find().populate(
      'study_field',
      'field'
    );
    if (registered_users.length > 0) {
      res.send({
        registered_users,
      });
    } else {
      res.status(404).send({ message: 'No Users Found' });
    }
  })
);
userRouter.post(
  '/new_registeration',
  expressAsyncHandler(async (req, res) => {
    const newReg = new RegisteredUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobNo: req.body.mobNo,
      study_field: req.body.study_field,
      password: bcrypt.hashSync(req.body.password),
    });
    const registartion = await newReg.save();
    res.status(201).send();
  })
);

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await RegisteredUser.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobNo: user.mobNo,
          study_field: user.study_field,
          isAdmin: user.isadmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid Email or Password' });
  })
);

userRouter.put(
  '/user/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await RegisteredUser.findById(req.params.id);
    if (user) {
      user.admission_date = req.body.admission_date;
      user.subscription_end_date = req.body.subscription_end_date;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;

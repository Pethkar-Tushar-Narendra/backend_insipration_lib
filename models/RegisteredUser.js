import mongoose from 'mongoose';

const RegisteredUserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobNo: { type: Number, required: true },
    admission_date: { type: Date },
    subscription_end_date: { type: Date },
    password: {
      type: String,
    },
    isadmin: { type: Boolean, required: true, default: false },
    profile_pic: { type: String },
    id_details: {
      id_image: { type: String },
      id_type: { type: String },
      id_number: { type: String },
    },
    study_field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Study_fields',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RegisteredUser = mongoose.model('Registered Users', RegisteredUserSchema);
export default RegisteredUser;

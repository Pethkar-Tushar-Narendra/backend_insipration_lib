import mongoose from 'mongoose';

const studyFieldsSchema = new mongoose.Schema({
  field: { type: String, required: true },
});

const Study_fields = mongoose.model('Study_fields', studyFieldsSchema);
export default Study_fields;

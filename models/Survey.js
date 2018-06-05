const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  // _user just convention for relationships
  // this is how we reference user model in survey
  // ref used to tell mongoose it belongs to user collection
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);

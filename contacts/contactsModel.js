const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});
contactSchema.plugin(mongoosePaginate);
const contactsModel = mongoose.model('contact', contactSchema);
module.exports = contactsModel;

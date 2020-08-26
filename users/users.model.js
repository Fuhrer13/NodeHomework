const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  subscription: {
    type: { type: String, required: false },
    enum: ['free', 'pro', 'premium'],
    default: { type: String, default: 'free' },
  },
  token: { type: String, required: false },
});
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateToken = updateToken;

async function findUserByEmail(email) {
  return this.findOne({ email });
}
async function updateToken(id, newToken) {
  return this.findByIdAndUpdate(id, { token: newToken });
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

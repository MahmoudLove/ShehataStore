import mongoose, { Schema } from 'mongoose';
import OrdersModel from './ordersModel';
import bcrypt from 'bcrypt';

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'user must have a email'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'user must have a name'],
    },
    phone: {
      type: String,
      required: [true, 'user must have a phone'],
    },
    password: {
      type: String,
      required: [true, 'Provide a password'],
      minlength: 8,
      select: false,
    },

    location: {
      type: String,
      required: [true, 'add Location'],
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'mahmoud', 'brandOwner'],
    },
    verificationPin: {
      type: Number,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Orders',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// usersSchema.virtual('orders', {
//   ref: 'Orders', //model
//   localField: '_id', //key on this schema
//   foreignField: 'user', //key on the searced schema
// });
usersSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
usersSchema.pre('save', async function (next) {
  if (!this.isModified('email')) return next();
  this.verified = false;
  next();
});
usersSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
usersSchema.pre(/^find/, function (next) {
  console.log('hi');
  this.populate({
    path: 'orders',
  });
  next();
});

const UsersModel =
  mongoose.models.Users || mongoose.model('Users', usersSchema);

export default UsersModel;

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UsersModel from '@/DB/models/usersModel';
import { dbConnect } from '@/utils/DB';
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const userData = req.body.orderData;
    // SIGNING UP USER
    if (userData.logState === 'signup') {
      const user = await UsersModel.create({
        email: userData.email,
        password: userData.password,
        location: userData.location,
        name: userData.name,
        phone: userData.phone,
      });
      const cookie = createSendToken(user);
      return res.status(200).json({ user, cookie });
    }
    // OTHER CASE (LOGGING IN USERS)
    const user = await UsersModel.findOne({ email: userData.email }).select(
      '+password'
    );

    if (!user || !(await correctPassword(userData.password, user.password)))
      return res.status(404).json({
        status: 'fail',
        message: 'Email or Password not Correct',
      });
    const cookie = createSendToken(user);
    return res.status(200).json({ status: 'success', user, cookie });
  }
  return res
    .status(200)
    .json({ message: 'STOP SEING USELESS REQUESTS YA KOSOMK' });
}

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  return token;
};
const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

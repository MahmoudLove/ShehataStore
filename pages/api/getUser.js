import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

import UsersModel from '@/DB/models/usersModel';
import { dbConnect } from '@/utils/DB';

export default async function handler(req, res) {
  await dbConnect();
  // HANDLING GETTING USER FROM JWT
  if (req.method === 'POST') {
    const decode = await promisify(jwt.verify)(
      req.body.jwt,
      process.env.JWT_SECRET
    );
    const user = await UsersModel.findById(decode.id).populate('');
    return res.status(200).json({ user });
  }
  // HANDLING UPDATING USER INFO (NOT PASSWORD)
  else if (req.method === 'PUT') {
    const { location, email, name } = req.body.userData;
    const user = await UsersModel.findByIdAndUpdate(
      req.body.userData.id,
      { location, email, name },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ status: 'success', user });
  }
  // HANDLING UPDATING PASSWORD
  else if (req.method === 'PATCH') {
    const { oldPassword, newPassword, id } = req.body.passwordData;
    const user = await UsersModel.findById(id).select('+password');
    if (!user || !(await correctPassword(oldPassword, user.password)))
      return res.status(404).json({ message: 'password in correct' });
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ message: 'password changed Successfully' });
  }
}
const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

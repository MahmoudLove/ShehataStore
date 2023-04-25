import UsersModel from '@/DB/models/usersModel';
import { dbConnect } from '@/utils/DB';
import sendEmail from '@/utils/EMAIL';
export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    const user = await UsersModel.findById(req.body.userData.id);
    const pin = generateRandomNumber();
    user.verificationPin = pin;
    const details = {
      email: user.email,
      subject: 'verification pin',
      text: `Hallo ${user.name} The PIN is ${pin} Please write in the field in The browser`,
    };
    sendEmail(details);
    await user.save();
    return res.status(200).json({ message: 'PIN Sent' });
  } else if (req.method === 'PATCH') {
    const user = await UsersModel.findById(req.body.userData.id);

    if (parseInt(req.body.userData.pin) === user.verificationPin) {
      user.verified = true;
      user.verificationPin = undefined;
      user.save();
      return res
        .status(200)
        .json({ status: 'success', message: 'Email verified' });
    }

    return res
      .status(400)
      .json({ status: 'fail', message: 'PIN is Incorrect' });
  }
}

function generateRandomNumber() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

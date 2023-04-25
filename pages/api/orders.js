import { dbConnect } from '@/utils/DB';
import OrdersModel from '@/DB/models/ordersModel';
import sendEmail from '@/utils/EMAIL';
import UsersModel from '@/DB/models/usersModel';
import mongoose from 'mongoose';
export default async function handler(req, res) {
  await dbConnect();
  try {
    const order = await OrdersModel.create({
      details: req.body.userData.items,
      user: req.body.userData.id,
      location: req.body.userData.location,
    });
    const user = await UsersModel.findById(req.body.userData.id);
    user.orders.push(new mongoose.Types.ObjectId(order._id));
    await user.save();
    const details = {
      email: process.env.OWNER_EMAIL,
      subject: 'ORDER HAS BEEN MADE',
      text: `items: ${JSON.stringify(req.body.userData.items)} \nTotal price:${
        req.body.userData.totalPrice
      } \nOrder ID : ${order.id}`,
    };
    sendEmail(details);
    return res.status(200).json({ status: 'succes', message: 'order placed' });
  } catch (err) {
    res.status(404).json({ status: 'fail' });
  }
}

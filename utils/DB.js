import mongoose from 'mongoose';

// export default catchAsync = (fn) => {
//   return (req, res, next) => fn(req, res, next).catch(next);
// };
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

export async function dbConnect() {
  if (mongoose.connection.readyState === 1) return;
  try {
    const con = await mongoose.connect(DB);
    console.log('DB connected succesfuly');
  } catch (error) {
    console.log(error);
  }
}

import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema(
  {
    details: {
      type: [Object],
      required: [true, 'Add deTails'],
    },

    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    location: {
      type: String,
      required: [true, 'oreder must have a location'],
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'deliverd', 'cancelled'],
      default: 'pending',
    },
    orderTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrdersModel =
  mongoose.models.Orders || mongoose.model('Orders', ordersSchema);
export default OrdersModel;

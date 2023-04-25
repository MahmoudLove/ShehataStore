import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product must have a Name'],
      unique: true,
      trim: true,
      minlength: [5, 'Product name must be atleast 5 characters'],
      maxlength: [40, 'Product name must be at most 30 characters'],
      match: [
        /^[a-zA-Z0-9\s]+$/,
        '{VALUE} is not valid. Please use only letters',
      ],
    },

    productType: {
      type: String,
      required: [true, 'Product must have a type'],
      enum: {
        values: ['Cream', 'Sun Screen', 'Vitamin', 'Lightning Cream'],
        message: [
          'product type must be Cream, Sun Screen, Vitamin, Lightning Cream only',
        ],
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be higher than 1.0'],
      max: [5, 'rating must be lower than 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    company: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Product must have a price'],
    },
    priceDiscount: {
      type: Number,
      default: 0,
      validate: {
        validator: function (val) {
          return val <= 100;
        },
        message: "Discount can't be more than 100%",
      },
    },
    productImage: {
      type: String,
      required: [true, 'Product must have a Main Image'],
    },
    amountAvailable: {
      type: Number,
      select: false,
    },
    productDescprition: {
      type: String,
    },
    variations: {
      type: [String],
      required: [true, 'at least every product must has one variation'],
    },
    belongsTo: {
      type: String,

      default: 'Shehata Pharmacy',
    },
    nameSlug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// productSchema.pre(/^find/, function (next) {
//   this.select('-__v');
//   next();
// });
// productSchema.pre('aggregate', function (next) {
//   console.log(this.pipeline());
//   next();
// });
productSchema.virtual('slug').get(function () {
  return slugify(this.productType);
});
productSchema.pre('save', function (next) {
  this.nameSlug = slugify(this.name);

  next();
});

const productsModel =
  mongoose.models.Products || mongoose.model('Products', productSchema);

module.exports = productsModel;

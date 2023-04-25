import mongoose from 'mongoose';
import slugify from 'slugify';
const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category must have a Name'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categoriesSchema.virtual('slug').get(function () {
  return slugify(this.name);
});
//still needs aggregation to count num of products in each category

const CategoriesModel =
  mongoose.models.Categories || mongoose.model('Categories', categoriesSchema);

module.exports = CategoriesModel;

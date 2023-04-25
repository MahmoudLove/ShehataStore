import Product from '../models/productsModel';

export const getAllproducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    data: { products },
  });
};

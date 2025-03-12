const Product = require('../../models/Product/ProductData');

const GetProduct = async (req, res) => {
  try {
    const products = await Product.find()   
      .populate({ path: 'reviews' })
      // console.log(products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = { GetProduct };

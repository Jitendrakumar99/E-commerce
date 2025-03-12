const mongoose = require('mongoose');
const Product = require('../../models/Product/ProductData');

exports.getProductData = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $project: {
          createdAt: 1,
		  _id:1,
			title:1,
			description:1,
			category:1,
			price:1,
			discountPercentage:1,
			rating:1,
			stock:1,
			brand:1,
			sku:1,
			weight:1,
			warrantyInformation:1,
			shippingInformation:1,
			availabilityStatus:1,
			returnPolicy:1,
			tags:1,
			dimensions:1,
			images:1
        },
      },
    ]);

    if (!data || data.length === 0) {
      return res.status(400).json({ message: 'No product data found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ message: 'Error fetching product data' });
  }
};

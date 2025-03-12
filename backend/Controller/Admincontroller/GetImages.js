const Image = require('../../models/Product/imagegallarySchema');

exports.GetImagedata = async (req, res) => {
  try {
	const images=await Image.find();
	if (!images) {
	  return res.status(400).json({ message: 'Invalid or missing image data' });
	}
	res.status(200).json(images);
  } catch (error) {
	console.log('Error:', error);
	res.status(500).json({ message: 'Error saving images', error: error.message });
  }
};

const Image = require('../../models/Product/imagegallarySchema');

exports.Imagehandle = async (req, res) => {
  try {
    const { image } = req.body;
     console.log(image);
     
    if (!image) {
      return res.status(400).json({ message: 'Invalid or missing image data' });
    }

    const newImages = new Image({
      images: image
    });

    await newImages.save();

    res.status(200).json({ message: 'Images saved successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Error saving images', error: error.message });
  }
};

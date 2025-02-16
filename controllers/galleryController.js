const Gallery = require('../models/Gallery');

const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({ createdAt: -1 });
        res.json(gallery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createGalleryImage = async (req, res) => {
    try {
        // Ensure an image is provided
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'gallery' // Optional: Set a folder in Cloudinary
        });

        // Save the Cloudinary URL in the database
        const newImage = new Gallery({ imageUrl: result.secure_url });
        await newImage.save();

        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteGalleryImage = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

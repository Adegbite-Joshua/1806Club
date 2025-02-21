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

exports.createGalleryImages = async (req, res) => {
    try {
        // Ensure images are provided
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No image files uploaded' });
        }

        const uploadedImages = [];

        for (const file of req.files) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'gallery' // Optional: Set a folder in Cloudinary
            });

            // Save each Cloudinary URL in the database
            const newImage = new Gallery({ imageUrl: result.secure_url });
            await newImage.save();

            uploadedImages.push(newImage);
        }

        res.status(201).json({ images: uploadedImages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteGalleryImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        // Find the gallery document by imageUrl
        const imageDoc = await Gallery.findOne({ imageUrl });
        if (!imageDoc) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Extract public_id from Cloudinary URL
        const parts = imageUrl.split('/');
        const publicIdWithExtension = parts[parts.length - 1]; // Get the last part (e.g., "image123.jpg")
        const publicId = `gallery/${publicIdWithExtension.split('.')[0]}`; // Remove extension

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Delete the document from database
        await Gallery.findByIdAndDelete(imageDoc._id);

        res.json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


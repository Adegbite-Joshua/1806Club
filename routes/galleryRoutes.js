const express = require('express');
const { createGalleryImages, deleteGalleryImage, getGallery } = require('../controllers/galleryController');

const multer = require('multer');
const storage = multer.diskStorage({}); // Store files in memory for Cloudinary
const upload = multer({ storage });
const router = express.Router();

router.get('/', getGallery);
router.post('/', upload.array('images', 10), createGalleryImages);
router.delete('/', deleteGalleryImage);

module.exports = router;

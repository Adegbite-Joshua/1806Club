const express = require('express');
const { createGalleryImage, deleteGalleryImage, getGallery } = require('../controllers/galleryController');

const multer = require('multer');
const storage = multer.diskStorage({}); // Store files in memory for Cloudinary
const upload = multer({ storage });
const router = express.Router();

router.get('/', getGallery);
router.post('/', upload.single('image'), createGalleryImage);
router.delete('/:id', deleteGalleryImage);

module.exports = router;

const express = require('express')
const Featured = require('../models/featured')
const Blog = require('../models/blog')

const router = express.Router()

//To post featured blog
router.post('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the blog by its ID and update the 'featured' field to true
        const featuredBlog = await Blog.findByIdAndUpdate(id, { featured: true }, { new: true });

        if (!featuredBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // If successfully updated, return the updated blog as featured
        res.status(200).json(featuredBlog);
    } catch (error) {
        console.error('Error creating featured blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//To find blog by id
router.get('/blog', async (req, res) => {
    try {
        // Find all featured blogs and sort them by creation date in descending order
        const featuredBlogs = await Blog.find({ featured: true }).sort({ updatedAt: -1 });
        
        if (!featuredBlogs || featuredBlogs.length === 0) {
            return res.status(404).json({ error: "Featured blogs not found" });
        }

        // If found, return the featured blogs
        return res.status(200).json(featuredBlogs);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error fetching featured blogs:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router
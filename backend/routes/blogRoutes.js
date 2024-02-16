const express = require('express')

const multer = require('multer')
const Blog = require('../models/blog')
const router = express.Router()

//require auth for all blogs
// router.use(requireAuth)

//storage and filename setting
let storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb)=>{
        // cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage
})

//create a blog
router.post('/', upload.single('uploaded_file'),  async (req, res) => {
    const { category, blogHead, contentHead, contentDesc, likes} = req.body;
    const contentImage = req.file.filename; // assuming multer stores filename in req.file
    
    try {
      const blog = await Blog.create({
        category,
        blogHead,
        contentHead,
        contentDesc,
        contentImage,
        likes
      });
  
      res.status(201).json(blog);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// router.put('/likes', async (req, res)=>{
//     Blog.findOneAndUpdate(req.body.blogId, {
//         $push: {likes:req.blog._id}
//     })
// })


//add a comment
router.post('/:id/comment', async (req, res) => {
    const {id} = req.params
    const { comment } = req.body;

    try {
        // Find the corresponding blog by ID
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Add the comment to the blog's comments array
        blog.comments.push(comment);

        // Save the updated blog document
        const updatedBlog = await blog.save();

        // Respond with the updated blog document
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


//get all blogs
router.get('/', async(req, res)=>{
    const blogs = await Blog.find({}).sort({createdAt: -1})
    res.status(200).json(blogs)
})

//get one blog
router.get('/:id', async(req, res)=>{
    const {id} = req.params
    const blog = await Blog.findById(id)

    if(!blog){
        return res.status(404).json({error: "No such Blog"})
    }

    res.status(200).json(blog)
})

//get all blogs by likes
//get all blogs by likes
router.get('/byLikes', async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ "likes": -1 }); // Sort by the length of the likes array in descending order
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//delete a blog
router.delete('/:id', async(req, res)=>{
    const {id} = req.params
    const blog = await Blog.findOneAndDelete({_id: id})

    if(!blog){
        return res.status(404).json({error: "No such Blog"})
    }

    res.status(200).json(blog)
})

router.patch('/:id', upload.single('uploaded_file'), async(req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };
        
        // Check if a file was uploaded
        if (req.file) {
            updateData.contentImage = req.file.filename; // Assuming you're storing the filename in the database
        }

        const blog = await Blog.findOneAndUpdate({ _id: id }, updateData, { new: true });

        if (!blog) {
            return res.status(404).json({ error: "No such Blog" });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error("Error updating blog post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// To check whether user has liked the blog or not 
router.post('/:blogId/like', async (req, res) => {
    const { blogId } = req.params;
    const { userId } = req.body;

    try {
        // Find the blog
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the user has liked the blog
        const hasLiked = blog.likes.includes(userId); // Error occurs here

        if (hasLiked) {
            // User has liked the blog, remove the like
            blog.likes.pull(userId);
            await blog.save();
            res.json({ message: 'Like removed successfully' });
        } else {
            // User has not liked the blog, add the like
            blog.likes.push(userId);
            await blog.save();
            res.json({ message: 'Blog liked successfully' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//To get all likes
router.get('/:id/likes', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the blog by id
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the blog has likes property and it's an array
        if (!Array.isArray(blog.likes)) {
            return res.json({ likes: 0 }); // Assuming default value is 0
        }

        // Respond with the likes count
        
        res.json({ likes: blog.likes.length });
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router
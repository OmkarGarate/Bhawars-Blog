const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    blogHead: {
        type: String,
        required: true
    },
    contentHead: {
        type: String,
        required: true
    },
    contentDesc: {
        type: String,
        required: true
    },
    contentImage: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }],
    comments: [
        {
            type:String
            
        }
    ],
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Method to check if a user has liked the blog
blogSchema.methods.hasLiked = function(userId) {
    return this.likes.some(like => like.equals(userId));
};

// Method to add a like
blogSchema.methods.addLike = function(userId) {
    if (!this.hasLiked(userId)) {
        this.likes.push(userId);
        return this.save();
    }
};

// Method to remove a like
blogSchema.methods.removeLike = function(userId) {
    if (this.hasLiked(userId)) {
        this.likes = this.likes.filter(like => !like.equals(userId));
        return this.save();
    }
};

module.exports = mongoose.model('Blog', blogSchema);

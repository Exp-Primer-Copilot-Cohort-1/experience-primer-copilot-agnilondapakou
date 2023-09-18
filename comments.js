// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route to get comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create route to post comments
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    // Get comments array for post
    const comments = commentsByPostId[req.params.id] || [];
    // Add new comment to comments array
    comments.push({ id: commentId, content });
    // Add updated comments array to comments object
    commentsByPostId[req.params.id] = comments;
    // Send back updated comments array
    res.status(201).send(comments);
});

// Start server on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});
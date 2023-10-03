// Create a web server that can respond to requests for comments
// to specific articles. For example, if you navigate to
// http://localhost:3000/comments/1, it should display the comments
// for article 1. If you navigate to http://localhost:3000/comments/2,
// it should display the comments for article 2. If you navigate to
// http://localhost:3000/comments/3, it should display the comments
// for article 3.

import express from 'express';
import comments from '../data/comments.js';

const router = express.Router();

// GET /comments - responds with a json array of comments
router.get('/', (req, res) => {
  res.json(comments);
});

// GET /comments/:id - responds with a single comment from the id in the path
router.get('/:id', (req, res) => {
  const found = comments.some(comment => comment.id === parseInt(req.params.id));
  if (found) {
    res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
  }
});

// POST /comments - creates a new comment for an article
router.post('/', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    text: req.body.text,
    articleId: req.body.articleId
  };
  if (!newComment.text || !newComment.articleId) {
    return res.status(400).json({ msg: 'Please include a text and articleId' });
  }
  comments.push(newComment);
  res.json(comments);
});

// PUT /comments/:id - updates a single comment by :id
router.put('/:id', (req, res) => {
  const found = comments.some(comment => comment.id === parseInt(req.params.id));
  if (found) {
    const updComment = req.body;
    comments.forEach(comment => {
      if (comment.id === parseInt(req.params.id)) {
        comment.text = updComment.text ? updComment.text : comment.text;
        comment.articleId = updComment.articleId ? updComment.articleId : comment.articleId;
        res.json({ msg: 'Comment updated', comment });
      }
    });
  } else {
    res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
  }
});

export default router;

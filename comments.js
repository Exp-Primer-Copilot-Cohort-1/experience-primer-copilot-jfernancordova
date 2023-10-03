// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Parse request of content-type: application/json
app.use(bodyParser.json());

// Parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

// Set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// Path: comments.js
// Create a new comment
app.post('/comments', (req, res) => {
  if (!req.body.name || !req.body.comment) {
    return res.status(400).json({
      message: 'Please provide all required fields.'
    });
  }

  const comment = {
    name: req.body.name,
    comment: req.body.comment
  };

  db.collection('comments').insertOne(comment, (err) => {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }

    res.json({
      message: 'Your comment has been submitted successfully.'
    });
  });
});

// Path: comments.js
// Retrieve all comments
app.get('/comments', (req, res) => {
  db.collection('comments').find({}).toArray((err, comments) => {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }

    res.json(comments);
  });
});

// Path: comments.js
// Retrieve a single comment
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;

  db.collection('comments').findOne({ _id: new ObjectID(id) }, (err, comment) => {
    if (err) {
      return res.status(500).json({
        message: err
      });
    }

    res.json(comment);
  });
});

// Path: comments.js
// Update a comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;

  db.collection('comments').updateOne(
    { _id: new ObjectID(id) },
    { $set: { name: req.body.name, comment: req.body.comment } },    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err
        });
      }

      res.json({
        message: 'Comment updated successfully.'
      });
    }
  );
});

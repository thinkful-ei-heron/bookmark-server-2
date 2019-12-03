// get bookmarks
const express = require('express');
const {isWebUri} = require('valid-url');
const bookmarkRouter = express.Router();
const logger = require('../logger');
const store = require('../dataStore');
const uuid = require ('uuid/v4'); 
const bodyParser = express.json()


bookmarkRouter

//GET ALL
.route('/bookmark')
.get( (req, res) => {
    res 
      .json(store.bookmarks);
  })
  
  //POST
  .post(bodyParser, (req, res) => {
    for (const field of ['title', 'url', 'rating']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send(`'${field}' is required`)
      }
    }
    const { title, url, description, rating } = req.body

    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`)
      return res.status(400).send(`'rating' must be a number between 0 and 5`)
    }

    if (!isWebUri(url)) {
      logger.error(`Invalid url '${url}' supplied`)
      return res.status(400).send(`'url' must be a valid URL`)
    }

    const bookmark = { id: uuid(), title, url, description, rating }

    store.bookmarks.push(bookmark)

    logger.info(`Bookmark with id ${bookmark.id} created`)
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark)
  })
  //GET BY ID
  bookmarkRouter
  .route('/bookmark/:id')
  .get( (req,res) => {
    const { id } = req.params;
    const bookmark = store.bookmarks.find( b => b.id == id);
  
    //make sure we find a card
    if(!bookmark) {
      logger.error(`bookmark with id ${id} was not found!`);
      return res
        .status(404).send(`bookmark not found`);
    
    }
    res.json(bookmark) 
  })
  
  //DELETE
  .delete((req, res) => {
    const { id } = req.params;
  
    const bookmarkIndex = store.bookmarks.findIndex( li => li.id === id)
  
    if(bookmarkIndex === -1) {
      logger.error(`bookmark with id ${id} was not found.`);
      return res 
      .status(404).send(`item was not found for deletion`)
    }
  
    store.bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark with id ${id} has been deleted`);
    res 
      .status(204).end()
  });

  module.exports = bookmarkRouter; 
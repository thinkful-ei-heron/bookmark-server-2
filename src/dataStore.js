
const uuid = require('uuid/v4')

const bookmarks = [{
        id: uuid(),
        title: 'Animal Farm',
        url: 'https://en.wikipedia.org/wiki/Animal_Farm',
        description: 'Animal famr is about animals that battle other animals in a farm.',
        rating: 5},

        {
        id: uuid(),
        title: 'Abby Road',
        url: 'https://Abbyroad.com',
        description: 'About a Road',
        rating: 5},

            {
            id: uuid(),
            title: 'Cat Things',
            url: 'https://en.wikipedia.org/wiki/Meow Meow',
            description: 'About some crazy cats',
            rating: 5},


];

  module.exports = {bookmarks}
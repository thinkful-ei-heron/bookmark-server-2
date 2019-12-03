require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./errorHandler')
const bookmarksRouter = require('./bookmarks/bookmarksRouter')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(validateBearerToken)
app.use(helmet()) // helmet must come before cors
app.use(cors())
app.use(bookmarksRouter)

app.get('/', (req, res) => {
       res.send('Hello, world!')
     }) // app, get root path, respond  with msge hello world 

app.use(errorHandler)

    //  app.use(function errorHandler(error, req, res, next) {
    //     let response
    //     console.log(`error`)
    //     if (NODE_ENV === 'production') {
    //         response = { error: { message: 'server error' } }
    //        } else {
    //         console.error(error)
    //         response = { message: error.message, error }
    //          }
    //        res.status(500).json(response)
    //     })

        //error handeling middlewware put atff the end . We also put in 4 params .
        // if argument length === 4 , treat this as hadnleing middlewear. if it less than 1 and less than 4, then treat as normal 
        // should get error in json format, but for some reason is didnt
module.exports = app;
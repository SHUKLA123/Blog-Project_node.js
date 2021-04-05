const { Console } = require('console');
const express = require('express');
const bodyParser= require('body-parser')
const port = process.env.PORT || 8000;
const app = express();
const MongoClient = require('mongodb').MongoClient
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static(path.join(__dirname,"../public")));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
// // app.set('view engine', 'hbs');
app.get('/',(req,res)=>{res.render('index');})
app.get('/blog',(req,res)=>{
    res.render('blog');
    // Console.log(req.body);
})

const connectionString = 'mongodb+srv://Sonu:Sonu@12345@cluster0.sjzkk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('blog-project-quotes')
    const titleCollection = db.collection('title')
    app.post('/blog',(req,res)=>{
        titleCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/post')
        })
        .catch(error => console.error(error))
    })
    app.get('/post', (req, res) => {
        db.collection('title').find().toArray()
          .then(results => {
            // console.log(results)
            res.render('post.ejs', {quotes: results})
          })
          .catch(error => console.error(error))
          
      })
      app.put('/post', (req, res) => {
        titleCollection.findOneAndUpdate(
          
          { 
            'title': `${req.body.title}`, 
          },
          {
            $set: {
              'title': 'updated',
              'tags': 'updated tags',
              'description': 'updated description'
            }
          },
          {
            upsert: true
          }
        )
          .then(result => {
            return res.redirect("\post")
            if (res.ok) return res.json()
           })
          .catch(error => console.error(error))
      })
      app.delete('/post', (req, res) => {
        titleCollection.deleteOne(
          { 'title': `${req.body.title}` }
        )
        .then(result => {
          res.json(`${'deleted value'}`)
        })
        .catch(error => console.error(error))
      })
      // app.get('*',(req,res)=>{res.send("404error");})
  })
  

app.listen(port, () => {
  console.log('');
})
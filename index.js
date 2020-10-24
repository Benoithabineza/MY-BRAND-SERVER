import express from 'express';
import mongoose from 'mongoose';
import Blog from './blogModel.js';
import morgan from 'morgan';
import Comment from './commentModel.js';
import expressUpload from 'express-fileupload';
//import uploader from './cloudinary.js';
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(expressUpload({ useTempFiles: true }));

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Database connected'));

//ctreate a post

/*app.post("/createArticle", (req, res) => {  
      const newArticle = new Blog({        
          title: req.body.title,        
          time: Date.now(),
          picture:"",               
          body: req.body.body,       
           Likes: 0,
           views:0    });    
          newArticle.save((err) => {      
                if (err) {          
      console.log(err);        } else {          
            res.send("Article Added successfully");        }    })});*/

//GET ALL ARTICLES

// app.get('/fetchArticles', (req, res) => {
//   Blog.find((err, articles) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(articles);
//     }
//   });
// });

//delete all articles

/*app.delete("/deleteArticles" , (req,res) => {   
                          Blog.deleteMany((err) => {        
                              if(err){           
                               console.log(err);        }
                               else{            res.send("All articles deleted successfully");        }    })})*/

// create post

app.post('/createArticle', async(req, res) => {
//   const imagePath = req.files.picture.tempFilePath;
// console.log(imagePath);


try {
  // const result =await uploader
  //   .upload(imagePath, (error, result) => {
  //     return result
  //   })
    
      const post =await Blog.create({
        title: req.body.title,
        body: req.body.body,
        // picture: result.url,
        time: Date.now(),
      })
       res.status(201).json({
            success: true,
            post: post,
          });
} catch (error) {
  console.log(error)

  res.status(500).json({
    success: false,
    error  
  });
  
}
})


// fetch all posts

app.get('/fetchArticles', (req, res) => {
  Blog.find()
    .then((posts) => {
      res.status(200).json({
        message: 'successfully get all posts',
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          message: 'failed to get al posts',
          error: error,
        });
    });
});

//delete post

app.delete('/deleteArticle/:articleID', (req, res) => {
  Blog.deleteOne({ _id: req.params.articleID })
    .then((result) => {
      res.status(200).json({
        message: 'deleted succesfully',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'there is error in deleting a post',
      });
    });
  //     (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send('Article Deleted successfully');
  //     }
  //   }
});

//updating articles

app.patch('/updateArticle/:articleID', (req, res) => {
  Blog.updateOne({ _id: req.params.articleID }, { $set: req.body }, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'failed to update  posts',
        error: err,
      });
    } else {
      // res.send('Article Updated successfully')
      res.status(200).json({
        message: 'Article Updated successfully',
      });
    }
  });
});

// fetch one post

app.get('/fetchArticles/:articleID', (req, res) => {
  Blog.findById(req.params.articleID)
    .then((post) => {
      res.status(200).json({
        message: ':To fetche one article successfully',
        post: post,
      });
      post.views += 1;
      post.save();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'there error fetching post',
        error: err,
      });
    });
});

// COMMENT

app.post('/fetchArticles/:articleID/comment', (req, res) => {
  Comment.create({
    name: req.body.name,
    email: req.body.email,
    time: Date.now(),
    message: req.body.message,
  })
    .then((comment) => {
      res.status(201).json({
        success: true,
        message: 'comment sent',
        comment: comment,
      });
      Blog.findById(req.params.articleID).then((foundPost) => {
        foundPost.comments.push(comment._id);
        foundPost.commentsCount += 1;
        foundPost.save();
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'fail to create comment',
      });
    });
});

// like a post

app.put('/fetchArticles/:articleID/like', (req, res) => {
  Blog.findById(req.params.articleID)
    .then((post) => {
      res.status(200).json({
        message: 'you liked this post',
      });
      post.likes += 1;
      post.save();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'failed to like',
      });
    });
});

app.listen(process.env.PORT, console.log('server is on port 3000'));

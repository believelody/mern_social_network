const express =require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

//  Validation
const validatePostInput = require('../../validations/postHandler');

//  Post Model
const Post = require('../../models/Post');
//  Profile Model
const Profile = require('../../models/Profile');

//  @routes GET api/posts
//  @desc Fetch All Posts
//  @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: 'No posts found' }));
});

//  @routes GET api/post:id
//  @desc Post by id
//  @access Private
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopost: 'No post found' }));
});

//  @routes POST api/posts
//  @desc Create Post
//  @access Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const { text, name, avatar } = req.body;
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    //  If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newPost = new Post({ text, name, avatar, user: req.user.id });
  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.status(400).json(err));
});

//  @routes DELETE api/posts/:id
//  @desc Delete Post
//  @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //  Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'Not authorized'});
          }

          //  Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ nopost: 'No post found'}));
    });
});

//  @routes POST api/posts/like/:id
//  @desc Like Post
//  @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            //  Remove user id from array
            let likes = post.likes.filter(like => like.user.toString() !== req.user.id);
            post.likes = likes;


            /**** Another way to remove user id from likes array
            //  Get remove index
            let removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

            //  Remove user id to likes array
            post.likes.splice(removeIndex, 1);  *****/
          }
          else {
            //  Add user id to likes array
            post.likes.unshift({ user: req.user.id });
          }

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopost: 'No post found'}));
    });
});

//  @routes POST api/posts/unlike/:id
//  @desc Unlike Post
//  @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this post' });
          }
          //  Get remove index
          let removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

          //  Remove user id to likes array
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopost: 'No post found'}));
    });
});

//  @routes POST api/posts/comment/:id
//  @desc comment to Post
//  @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    //  If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  console.log(req.params.id);

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      //  Add to comments array
      post.comments.unshift(newComment);
      //  Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ nopost: 'No post found'}));
});

//  @routes DELETE api/posts/comment/:id/:comment_id
//  @desc delete comment from Post
//  @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

  Post.findById(req.params.id)
    .then(post => {
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ nocomment: "Comment doesn't exist" });
      }
      //  Get remove index
      let removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

      //  Remove user id to likes array
      post.comments.splice(removeIndex, 1);
      //  Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ nopost: 'No post found'}));
});

module.exports = router;

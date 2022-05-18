const PostModel = require('../model/post');

exports.postRegister = async (req, res, next) =>  {
  console.log(req.decode, 'req.body')
  
  const postData = {
    title: req.body.title,
    content: req.body.content,
  }
  const postRegister = await PostModel.create(postData);
  if(postRegister) {
    res.json({post: postRegister})
  } else {
    res.json({err: "Create post error"})
  }
}

exports.postList = async (req, res) => {
  try {
    const posts = await PostModel.find();
    console.log(posts, 'posts')
    res.render('listpost', { posts: posts });
  } catch (err) {
    console.log(err)
  }
}

exports.postDetail = async (req, res) => {
  console.log("aaaaaaaaaaaaa")
  try {
    const post = await PostModel.findOne({id: req.query.id});
    console.log(post, 'posts')
    res.render('detailPost', { post: post });
  } catch (err) {
    console.log(err)
  }
}

exports.postDelete = async (req, res) => {
  try {
    const post = await PostModel.findOne({id: req.query.id});
    if(post) {
      await post.remove();
      res.json({status: 200, message: "delete success"});
    }
  } catch (err) {
    console.log(err)
  }
}
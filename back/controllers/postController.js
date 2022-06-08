const db = require("../models/index");
const postModel = db.Post;
const userModel = db.User;
const Sequelize = require("sequelize");
const ObjectId = require("mongodb").ObjectId;
const fileSystem = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.getAllPosts = (req, res) => {
  postModel
    .findAll({
      order: Sequelize.literal("createdAt DESC"),
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        !req.file.detectedMimeType !== "image/jpg" &&
        !req.file.detectedMimeType !== "image/jpeg" &&
        !req.file.detectedMimeType !== "image/png"
      )
        throw new Error("Only jpg, jpeg and png files are allowed");

      if (req.file.size > 5000000) throw new Error("File size is too big");
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
    const fileName = req.body.posterId + Date.now() + "jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }
  const newPost = new postModel({
    posterId: req.body.posterId,
    posterPseudo: req.body.posterPseudo,
    Text: req.body.Text,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  const post = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.body.picture,
    video: req.body.video,
    likers: req.body.likers,
    comments: req.body.comments,
  });
  post.save((err, doc) => {
    if (!err) res.send(doc);
    else res.send(err);
  });
};

module.exports.updatePost = (req, res) => {
  postModel.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if (!err) res.send(doc);
    else res.send(err);
  });
};
module.exports.deletePost = (req, res) => {
  postModel.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else res.send(err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  try {
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.likerId },
      },
      { new: true }
    );
    (err, docs) => {
      if (err) res.status(400).send(err);
    };
    await userModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    );
    (err, docs) => {
      if (!err) res.send(docs);
      else return res.status(400).send(err);
    };
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  await postModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likers: req.body.likerId },
    },
    { new: true }
  );
  (err, docs) => {
    if (err) res.status(400).send(err);
  };
};

module.exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("id unknown :" + req.params.id);
  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            Text: req.body.Text,
            timestamped: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else res.status(400).send(err);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.editComment = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("id unknown :" + req.params.id);
  try {
    return postModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) => {
        comment._id.equals(req.params.commentId);
      });
      if (!theComment) {
        return res.status(404).send("comment not found");
        theComment.Text = req.body.Text;

        return docs.save((err, doc) => {
          if (!err) res.send(doc);
          else res.status(500).send(err);
        });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.deleteComment = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("id unknown :" + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: { _id: req.body.commentId },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else res.status(400).send(err);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

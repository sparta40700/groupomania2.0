const userModel = require("../models/user.model");
const fileSystem = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadError } = require("../utils/error.utils");

module.exports.uploadProfilePicture = async (req, res, next) => {
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
  const fileName = req.body.name + "jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profile/${fileName}`
    )
  );

  try {
    await userModel.findByIdAndUpdate(
      req.body.userid,
      { $set: { picture: "/uploads/profile/" + fileName } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    message: "File uploaded",
    file: `/uploads/profile/${fileName}`,
  });
};

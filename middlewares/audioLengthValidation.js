const { userHasActiveSubscription } = require("../repositories/userRepository");
const mm = require("music-metadata");

const audioLengthValidation = async (req, res, next) => {
  if (req.file === undefined) {
    res.status(403).json({
      message: "audio file is required",
    });
    return;
  }
  const userId = req.user.id;
  const hasSubscription = await userHasActiveSubscription(userId);
  const max_length = hasSubscription ? 5000 : 2000;
  const audio_path = req.file.path;

  try {
    const audio_metadata = await mm.parseFile(audio_path);
    const audio_duration = audio_metadata.format.duration;
    if (audio_duration === undefined) {
      throw new Error("the audio was undefined");
    }
    if (audio_duration > max_length) {
      res.status(403).json({
        message: `based on your subscription status the max length of audio allowed is ${max_length / 1000} minutes `,
      });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({
      message: "something went wrong trying to parse the audio",
      error: err.message,
    });
  }
};

module.exports = audioLengthValidation
const mongoose = require('mongoose');
const { sanitizeMongoFields } = require('../utils/sanitizeModel');

const QuizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'This field is required'],
      trim: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    quizmaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Quiz must belong to a quizmaster'],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

// ************************ VIRTUALS ************************ //

// ************************ DOCUMENT MIDDLEWARE ************************ //
QuizSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'quizmaster',
    select: 'displayName username',
  });

  next();
});

// ************************ INSTANCE METHODS ************************ //

// ************************ STATIC METHODS ************************ //

QuizSchema.plugin(sanitizeMongoFields);

module.exports = mongoose.model('Quiz', QuizSchema);

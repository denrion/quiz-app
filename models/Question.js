const mongoose = require('mongoose');
const { sanitizeMongoFields } = require('../utils/sanitizeModel');

const questionTypes = ['MULTIPLE_CHOICE', 'TEXT'];
const questionCategories = [
  'TRASH',
  'HISTORY',
  'MUSIC',
  'SPORT',
  'GEOGRAPHY',
  'SCIENCE',
  'OTHER',
];

const QuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: questionCategories,
      default: 'OTHER',
      required: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: questionTypes,
      default: 'TEXT',
      required: true,
      uppercase: true,
    },
    question: {
      type: String,
      required: [true, 'This field is required'],
      trim: true,
    },
    maxPoints: Number,
    answer: {
      type: String,
      trim: true,
      default: undefined,
    },
    answerA: {
      type: String,
      trim: true,
      default: undefined,
    },
    answerB: {
      type: String,
      trim: true,
      default: undefined,
    },
    answerC: {
      type: String,
      trim: true,
      default: undefined,
    },
    answerD: {
      type: String,
      trim: true,
      default: undefined,
    },
    correctAnswer: {
      type: String,
      trim: true,
      default: undefined,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

// ************************ VIRTUALS ************************ //

// ************************ DOCUMENT MIDDLEWARE ************************ //
QuestionSchema.pre('validate', function (next) {
  if (this.type === 'TEXT') return next();

  const answers = [this.answerA, this.answerB, this.answerC, this.answerD];
  const message = 'Answers cannot be repeated';

  if (answers.includes(this.answerA)) this.invalidate('answerA', message);
  if (answers.includes(this.answerB)) this.invalidate('answerB', message);
  if (answers.includes(this.answerC)) this.invalidate('answerC', message);
  if (answers.includes(this.answerD)) this.invalidate('answerD', message);

  next();
});

// ************************ INSTANCE METHODS ************************ //

// ************************ STATIC METHODS ************************ //

QuestionSchema.plugin(sanitizeMongoFields);

module.exports = mongoose.model('Question', QuestionSchema);

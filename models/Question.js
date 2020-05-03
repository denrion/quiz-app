const mongoose = require('mongoose');
const { sanitizeMongoFields } = require('../utils/sanitizeModel');

const questionTypes = ['MULTIPLE_CHOICE', 'TEXT'];
const questionCategories = [
  'TRASH',
  'ART & CULTURE',
  'BIOLOGY',
  'ECONOMY',
  'FILM & TV',
  'FOOD & DRINKS',
  'LITERATURE',
  'LANGUAGE',
  'POLITICS',
  'HISTORY',
  'MUSIC',
  'SPORT',
  'GEOGRAPHY',
  'SCIENCE',
  'MISCELLANEOUS',
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
    questionText: {
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

  const message = 'Answers cannot be repeated';

  if (
    this.answerA === this.answerB ||
    this.answerA === this.answerC ||
    this.answerA === this.answerD
  )
    this.invalidate('answerA', message);
  if (
    this.answerB === this.answerA ||
    this.answerB === this.answerC ||
    this.answerB === this.answerD
  )
    this.invalidate('answerB', message);
  if (
    this.answerC === this.answerA ||
    this.answerC === this.answerB ||
    this.answerC === this.answerD
  )
    this.invalidate('answerC', message);
  if (
    this.answerD === this.answerA ||
    this.answerD === this.answerB ||
    this.answerD === this.answerC
  )
    this.invalidate('answerD', message);

  next();
});

QuestionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'displayName',
  });

  next();
});

// ************************ INSTANCE METHODS ************************ //

// ************************ STATIC METHODS ************************ //

QuestionSchema.plugin(sanitizeMongoFields);

module.exports = mongoose.model('Question', QuestionSchema);

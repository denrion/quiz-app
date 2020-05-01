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
    submittedBy: {
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

// ************************ INSTANCE METHODS ************************ //

// ************************ STATIC METHODS ************************ //

QuestionSchema.plugin(sanitizeMongoFields);

module.exports = mongoose.model('Question', QuestionSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  sanitizeMongoFields,
  sanitizeSpecifiedFields,
} = require('../utils/sanitizeModel');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: [2, 'First name must contain at least 2 characters'],
      maxlength: [30, 'First name must not contain more than 30 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      minlength: [2, 'Last name must contain at least 2 characters'],
      maxlength: [30, 'Last name must not contain more than 50 characters'],
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Display name must contain at least 2 characters'],
      maxlength: [30, 'Display name must not contain more than 30 characters'],
    },
    username: {
      type: String,
      required: [true, 'Please provide your username'],
      unique: true,
      trim: true,
      minlength: [2, 'Username must contain at least 2 characters'],
      maxlength: [30, 'Username must not contain more than 30 characters'],
    },
    role: {
      type: String,
      enum: ['PLAYER', 'QUIZZ_MASTER'],
      default: 'PLAYER',
      required: true,
      uppercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must contain at least 8 characters'],
      maxlength: [50, 'Password must not contain more than 50 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

// ************************ VIRTUALS ************************ //
UserSchema.virtual('fullName').get(function () {
  return !this.firstName || !this.lastName
    ? undefined
    : `${this.firstName} ${this.lastName}`;
});

// ************************ DOCUMENT MIDDLEWARE ************************ //
UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Don't store passwordConfirm field in DB
  this.passwordConfirm = undefined;

  next();
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// ************************ INSTANCE METHODS ************************ //
UserSchema.methods.isCorrectPassword = async (
  candidatePassword,
  userPassword
) => await bcrypt.compare(candidatePassword, userPassword);

// Check if password was changed after the JWT token was sent
UserSchema.methods.isPasswordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = +this.passwordChangedAt.getTime() / 1000;
    return JWTTimestamp < new Date(changedTimeStamp);
  }

  return false;
};

UserSchema.methods.signToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ************************ STATIC METHODS ************************ //
UserSchema.static('findByUsername', function (username) {
  return this.findOne({ username });
});

UserSchema.plugin(sanitizeMongoFields);
UserSchema.plugin(sanitizeSpecifiedFields, [
  'password',
  'passwordConfirm',
  'passwordChangedAt',
]);

module.exports = mongoose.model('User', UserSchema);

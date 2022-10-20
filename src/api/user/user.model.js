const { Schema, model, models } = require('mongoose');

const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;

// eslint-disable-next-line no-useless-escape
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Please fill a valid email address'],
      validate: [
        {
          async validator(value) {
            try {
              const user = await models.User.findOne({ email: value });
              return !user;
            } catch {
              return false;
            }
          },
          message: 'It is already exist a user with this email',
        },
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Password too short'],
      match: [passwordRegex, 'Special character, number and capital letter'],
    },
    lists: {
      type: [{ type: Schema.Types.ObjectId, ref: 'List' }],
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model('User', userSchema);

module.exports = User;

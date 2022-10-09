const { Schema, model } = require('mongoose');

const favSchema = new Schema(
  {
    name: {
      type: Array,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Fav = model('Fav', favSchema);

module.exports = Fav;

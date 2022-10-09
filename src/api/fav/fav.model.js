const { Schema, model } = require('mongoose');

const favSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    list: {
      type: Array,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Fav = model('Fav', favSchema);

module.exports = Fav;

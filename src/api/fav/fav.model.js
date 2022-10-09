const { Schema, model } = require('mongoose');

const favSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: 'List',
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Fav = model('Fav', favSchema);

module.exports = Fav;

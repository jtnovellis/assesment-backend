const { Schema, model } = require('mongoose');

const favSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'This field is required'],
    },
    description: {
      type: String,
    },
    link: {
      type: String,
      required: [true, 'This field is required'],
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: 'List',
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

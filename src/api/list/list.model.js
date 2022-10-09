const { Schema, model } = require('mongoose');

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    favs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Fav' }],
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const List = model('List', listSchema);

module.exports = List;

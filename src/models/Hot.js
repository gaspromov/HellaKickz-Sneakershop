import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    link: String
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default mongoose.model('Hot', schema)

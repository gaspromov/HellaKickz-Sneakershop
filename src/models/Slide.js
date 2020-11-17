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
    link: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default mongoose.model('Slide', schema)

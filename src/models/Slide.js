import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    photo: {
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

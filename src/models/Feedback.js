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
    name: {
      type: String,
      required: true
    },
    subs: {
      type: String,
      required: true
    },
    feedback: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Feedback', schema)

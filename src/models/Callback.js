import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false
    },
    link: String,
    brand: String,
    model: String,
    size: String,
    color: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Callback', schema)

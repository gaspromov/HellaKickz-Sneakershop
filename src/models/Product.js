import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    photos: {
      type: [String],
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    color: String,
    code: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    sizes: {
      type: [String],
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['sneakers', 'clothes', 'accessory', 'childish']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Product', schema)

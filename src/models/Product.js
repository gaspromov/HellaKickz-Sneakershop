import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['sneakers', 'clothes', 'accessory', 'childish']
  },
  sizes: {
    type: [String],
    required: true
  },
  photos: {
    type: [String],
    required: true
  }
})

export default mongoose.model('Product', schema)

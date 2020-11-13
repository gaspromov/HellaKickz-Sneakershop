import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  slides: {
    type: [String],
    required: true,
    default: []
  },
  hots: {
    type: [
      {
        photo: {
          type: String,
          required: true
        },
        link: {
          type: String,
          required: true
        }
      }
    ],
    required: true,
    default: []
  },
  feedbacks: {
    type: [
      {
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
      }
    ],
    required: true,
    default: []
  }
})

export default mongoose.model('Landing', schema)

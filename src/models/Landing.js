import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    slides: {
      type: [String],
      required: true,
      default: Array(3).fill('')
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
      default: Array(4).fill({ photo: '', link: '' })
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
      default: Array(6).fill({ photo: '', name: '', subs: '', feedback: '' })
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Landing', schema)

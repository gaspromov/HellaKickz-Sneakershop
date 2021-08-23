import server from './server.js'
import mongodb from './mongodb.js'
import config from './config/config.js'
import updateXml from './jobs.js'

const start = async () => {
  try {
    await mongodb()
    server.listen(config.PORT, () =>
      console.log(`Server is running on port ${config.PORT}`)
    )
    updateXml.start()
  } catch (e) {
    console.log(e)
  }
}

start()

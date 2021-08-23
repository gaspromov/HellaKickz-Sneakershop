import { CronJob } from 'cron'
import convert from 'xml-js'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import Product from './models/Product.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const updateXml = new CronJob(
  '0 0 */12 * * *',
  async () => {
    if (fs.existsSync(path.resolve(__dirname, 'products.xml'))) {
      fs.unlinkSync(path.resolve(__dirname, 'products.xml'))
    }

    const products = await Product.find().sort('-createdAt')

    const items = products.map(product => {
      const color = product.color ? product.color : ''
      const result = {
        'g:id': product._id.toString(),
        'g:title': product.model,
        'g:description': `${product.brand} ${product.model} ${color}`,
        'g:availability': 'in stock',
        'g:condition': 'new',
        'g:price': `${product.price}.00 RUB`,
        'g:link': `https://hellakickz.ru/product/${product._id}`,
        'g:image_link': `https://hellakickz.ru${product.photos[0]}`,
        'g:brand': product.brand
      }
      if (color) {
        result['g:color'] = color
      }
      return result
    })

    const xml = {
      _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
      rss: {
        _attributes: {
          'xmlns:g': 'http://base.google.com/ns/1.0',
          version: '2.0'
        },
        channel: {
          title: 'Hellakickz',
          link: 'https://hellakickz.ru',
          description:
            'HellaKickz – это не только о лимитированных кросcовках, но и о стритвир-культуре в целом.',
          item: [...items]
        }
      }
    }

    const result = convert.js2xml(xml, {
      compact: true,
      ignoreComment: true,
      spaces: 4
    })

    fs.writeFileSync(path.resolve(__dirname, 'products.xml'), result)
    console.log(`XML was created at ${new Date().toLocaleString()}`)
  },
  null,
  false,
  null,
  null,
  true
)

export default updateXml

import { Sequelize } from 'sequelize'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, 'allfiles.db')
})

export default sequelize
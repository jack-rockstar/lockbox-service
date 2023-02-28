import express from 'express'
import cors from 'cors'
import routes from './src/routes/lockbox.js'
import { logInfo } from './src/utils/logs.js'

const app = express()
const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Service working correctly' })
})
app.use('/lockbox/', routes)

const port = 3001 || process.env.port

app.listen(port, () => {
  logInfo(`Server is running in ${port}`)
})

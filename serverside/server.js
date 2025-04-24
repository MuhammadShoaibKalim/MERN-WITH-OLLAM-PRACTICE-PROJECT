// serverside/server.js
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import ConnectDb from './config/db.js'
import recommendRoute from './routes/recommendation.route.js'

dotenv.config()
const PORT = process.env.PORT || 11000
const app = express()

ConnectDb()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))

app.use('/api/get-recommendation', recommendRoute)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

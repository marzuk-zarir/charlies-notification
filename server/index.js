const redis = require('./db')
const app = require('./src/app')

const PORT = process.env.PORT || 3000

redis.on('connect', () => {
    console.log('Redis client connected successfully')
    app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🔥`))
})

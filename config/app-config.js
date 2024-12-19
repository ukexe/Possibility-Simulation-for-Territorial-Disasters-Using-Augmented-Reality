const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    weatherApiKey: process.env.OPENWEATHER_API_KEY,
    database: {
      url: process.env.DB_URL || 'mongodb://localhost:27017/disaster-sim'
    },
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  },
  production: {
    apiUrl: process.env.API_URL,
    weatherApiKey: process.env.OPENWEATHER_API_KEY,
    database: {
      url: process.env.DB_URL
    },
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];

require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const AuthRoute = require('./router/auth-router');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error-middleware');
const app = express();
const AdminRoute = require('./router/admin-router');

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome To User Authentication System' });
});

app.use('/api/auth', AuthRoute);

// ADMIN ROUTES
app.use('/api/admin', AdminRoute);

app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`listening to the port ${port}`);
  });
});

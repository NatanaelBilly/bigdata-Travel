const express = require('express');
const cors = require('cors');

const userRouter =  require('./routes/userRoutes');
// const kuponRouter = require('./routes/kuponRoutes');
// const pesawatRouter = require('./routes/pesawatRoutes');
// const historyRouter = require('./routes/historyRoutes');
const hotelRouter = require('./routes/hotelRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/users',userRouter);
// app.use('/api/v1/kupon',kuponRouter);
// app.use('/api/v1/pesawat', pesawatRouter)
// app.use('/api/v1/history',historyRouter);
app.use('/api/v1/hotel',hotelRouter);

module.exports = app;

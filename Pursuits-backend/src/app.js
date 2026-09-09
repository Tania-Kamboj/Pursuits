const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitizer = require('./middlewares/sanitizer');
const streamRoutes = require('./routes/streamRoutes');
const errorHandler = require('./middlewares/errorHandler');
const ApiError = require('./utils/apiError');
const degreeCategoryRoutes = require('./routes/degreeCategoryRoutes');
const degreeRoutes = require('./routes/degreeRoutes');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const examRoutes = require('./routes/examRoutes');

const app = express();

// 1. Security Middlewares
app.use(helmet());
app.use(cors({
  origin: [
    'https://pursuits-05.web.app',         
    'http://localhost:5173',                  
    'https://pursuits.onrender.com'          
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

const authLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, 
     max: 20, 
     message: { success: false, message: 'Too many login attempts, please try again after 15 minutes' },
   });

app.use(express.json({ limit: '10kb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sanitizer());

// 5. Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/v1/streams', require('./routes/streamRoutes'));
app.use('/api/v1/degree-categories', require('./routes/degreeCategoryRoutes'));
app.use('/api/v1/degrees', require('./routes/degreeRoutes'));
app.use('/api/v1/colleges', collegeRoutes);
app.use('/api/v1/diplomas', require('./routes/diplomaRoutes'));
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/feedback', require('./routes/feedbackRoutes'));
app.use('/api/v1/contact', require('./routes/contactRoutes'));
app.use('/api/v1/search', require('./routes/searchRoutes'));

// 6. Handle 404
app.use((req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 7. Global Error Handler
app.use(errorHandler);

module.exports = app;
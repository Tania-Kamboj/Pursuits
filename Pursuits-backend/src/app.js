const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const sanitizer = require('./middlewares/sanitizer');
const errorHandler = require('./middlewares/errorHandler');

const ApiError = require('./utils/apiError');
const apiCache = require('./utils/apiCache');

const streamRoutes = require('./routes/streamRoutes');
const degreeCategoryRoutes = require('./routes/degreeCategoryRoutes');
const degreeRoutes = require('./routes/degreeRoutes');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const examRoutes = require('./routes/examRoutes');
const diplomaRoutes = require('./routes/diplomaRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes')
const contactRoutes = require('./routes/contactRoutes')

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
app.use('/api/v1/auth', authRoutes, apiCache());
app.use('/api/v1/wishlist', wishlistRoutes, apiCache());
app.use('/api/v1/streams', streamRoutes, apiCache());
app.use('/api/v1/degree-categories', degreeCategoryRoutes, apiCache());
app.use('/api/v1/degrees', degreeRoutes, apiCache());
app.use('/api/v1/colleges', collegeRoutes, apiCache());
app.use('/api/v1/diplomas', diplomaRoutes, apiCache());
app.use('/api/v1/exams', examRoutes, apiCache());
app.use('/api/v1/feedback', feedbackRoutes, apiCache());
app.use('/api/v1/contact', contactRoutes, apiCache());

// 6. Handle 404
app.use((req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 7. Global Error Handler
app.use(errorHandler);

module.exports = app;
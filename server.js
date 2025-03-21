require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Initialize express app
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes for form submissions
app.post('/api/appointments', (req, res) => {
  // This would typically save to a database
  console.log('Appointment request received:', req.body);
  // For now, just return success
  res.json({ success: true, message: 'Appointment request received' });
});

app.post('/api/contact', (req, res) => {
  // This would typically save to a database and send an email
  console.log('Contact form submission received:', req.body);
  // For now, just return success
  res.json({ success: true, message: 'Message received' });
});

// Main Route - Single page application approach
app.get('/', (req, res) => {
  res.render('index', { title: 'AlHussain Health - Leading Healthcare Provider' });
});

// Route for appointment page (this remains a separate page)
app.get('/appointment', (req, res) => {
  res.render('appointment', { title: 'Book an Appointment - AlHussain Health' });
});

// Supporting routes for backward compatibility - these redirect to home page with hash
app.get('/about', (req, res) => {
  res.redirect('/#about-section');
});

app.get('/departments', (req, res) => {
  res.redirect('/#departments-section');
});

app.get('/doctors', (req, res) => {
  res.redirect('/#doctors-section');
});

app.get('/gallery', (req, res) => {
  res.redirect('/#gallery-section');
});

app.get('/contact', (req, res) => {
  res.redirect('/#contact-section');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Define port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
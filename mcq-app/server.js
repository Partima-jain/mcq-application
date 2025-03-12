const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// connecting with mongo db (i have declared mongo uri in .env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));


const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');


app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'MCQ App' });
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


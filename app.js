const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const dbURI = 'mongodb+srv://tempuser:123@cluster0.f9d6o.gcp.mongodb.net/Exams23002';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

const examRecordSchema = new mongoose.Schema({
  name: String, 
  sid: String 
});

const ExamRecord = mongoose.model('ExamRecord', examRecordSchema);

app.get('/', async (req, res) => {
  try {
    
    const newExamRecord = new ExamRecord({
      name: 'Ghazal Ekram', 
      sid: '300368606' 
    });
    await newExamRecord.save();
    res.send('Document added successfully to the "examrecords" collection.');
  } catch (err) {
    console.error('Error creating exam record:', err);
    res.status(500).send('An error occurred while creating the exam record.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connects to your local MongoDB (No Auth)
mongoose.connect('mongodb://localhost:27017/studentNotesDB');

const Note = mongoose.model('Note', {
    title: String,
    subject: String,
    description: String,
    created_date: { type: String, default: '2026-03-05' }
});

// Routes
app.get('/notes', async (req, res) => res.json(await Note.find()));

app.post('/notes', async (req, res) => {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
});

app.put('/notes/:id', async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
});

app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.listen(3000, () => console.log('Server is live at http://localhost:3000'));
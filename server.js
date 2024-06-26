//Variables//

const express = require('express');

const port = process.env.PORT || 4040;

const fs = require('fs');

const path = require('path');

const uuid = require('uuid');



//Initialize//

const app = express();

//static files//

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

//Parse JSON data//

app.use(express.json());

//This will start the server on the assigned port//

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//Routes//

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.post('/api/notes', (req, res) => {
console.log(req.body);
    let notes = fs.readFileSync('db/db.json', 'utf8');
    notes = JSON.parse(notes);
    req.body.id = uuid.v4();
    notes.push(req.body);
    notes = JSON.stringify(notes);
    fs.writeFileSync('db/db.json', notes);
    res.json(JSON.parse(notes));
});

app.get('/api/notes', (req, res) => {
    let notes = fs.readFileSync('db/db.json', 'utf8');
    notes = JSON.parse(notes);
    res.json(notes);
});

//Delete function//
app.delete('/api/notes/:id', (req, res) => {
    let notes = fs.readFileSync('db/db.json', 'utf8');
    notes = JSON.parse(notes);
    notes = notes.filter(note => note.id !== req.params.id);
    notes = JSON.stringify(notes);
    fs.writeFileSync('./db/db.json', notes, 'utf8');
    res.json(JSON.parse(notes));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
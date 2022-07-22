const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./loggerMiddleware');

const cors = require('cors');

const notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true
      },
      {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "date": "2019-05-30T18:39:34.091Z",
        "important": false
      },
      {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2019-05-30T19:20:14.298Z",
        "important": true
      }
]


//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(logger)




app.get('/api/notes', (req, res) => {
    //res.send('<h1>Hello World</h1>');
    res.send(notes);

})

app.get('/api/notes/:id', (req, res) => {   
    const id = req.params.id
    const note = notes.find(note => note.id === +id)
    res.send(note);
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === +id)
    notes.splice(notes.indexOf(note), 1)
    res.send(note);
})

app.post('/api/notes', (req, res) => {
    const note = {
        id: notes.length + 1,
        ...req.body
    }
    notes.push(note)
    res.send(note)
})

app.use((req, res) => {
    const rute = req.path;
    res.status(404).json({
        error: 'Patch not found',
        Patch: rute,
        status_code: res.statusCode
    })
    
})
    
    
    

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})




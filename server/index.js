const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

let gists = []

app.get('/gists', (req, res) => {
    res.json(gists);
})

app.get('/gists/:id', (req, res) => {
    const gist = gists.find(g => g.id === (req.params.id))
    if (gist) {
        res.json(gist);
    } else {
        res.status(404).json({message: "Gist not found"})
    }
});

app.post('/gists', (req, res) => {
    const {title, desciption, code, language} = req.body;

    const newGist = {
       id: generateRandomId(10),
       title,
       desciption,
       code,
       language,
       createdAt: new Date(),
    };
    gists.push(newGist);
    res.status(201).json(newGist);
})

app.put('/gists/:id', (req, res) => {
    const { title, desciption, code, language } = req.body;
    const gistIndex = gists.findIndex(g => g.id === req.params.id)
    if (gistIndex) {
    const editedGist = {
        id: req.params.id,
        title,
        desciption,
        code,
        language,
        createdAt: new Date(),
    };
    gists[gistIndex] = editedGist;
    res.json(editedGist);
} else {
    res.status(404).json({ message: "Gist not found"});
}
})

app.delete('/gists/:id', (req, res) => {
    const gistIndex = gists.findIndex(g => g.id === req.params.id);
    console.log(gistIndex)

    if (gistIndex) {
        gists.splice(gistIndex, 1);
        res.json({ message: `${req.params.id} deleted`})
    } else {
        res.status(404).json({ message: "gist not found"})
    }
})


app.listen(3000)
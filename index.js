const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const validUrl = require('valid-url');

const app = express();

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

let obj = {};

app.use(bodyParser.json());

app.post("/short", (req, res) => {
    const { longUrl } = req.body;

    if(!validUrl.isUri(longUrl)){
        return res.status(400).json('Invalid URL');
    }

    const urlCode = shortid.generate();
    const shortURL = `${baseURL}/${urlCode}`;

    obj[urlCode] = longUrl;

    res.json({ shortURL });
});


app.get('/:code', (req, res) => {   
    const { code } = req.params;
    const longUrl = obj[code];

    if(longUrl){
        return res.redirect(longUrl);
    }else {
        return res.status(404).json('No Url Found');
    }
});


app.listen(PORT, () => {
    console.log('app is running');
});
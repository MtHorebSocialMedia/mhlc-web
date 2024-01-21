require('dotenv').config();
const express = require('express');
const { getMenuItems, getContentPages } = require('./contentService');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/api/menu-items', (req, res) => {
    (async function() {
        try {
            const items = await getMenuItems();
            res.send(items);
        } catch(err) {
            console.error(err);
            res.sendStatus(500);
        }

    })();
});

app.get('/api/content-pages', (req, res) => {
    (async function() {
        try {
            const items = await getContentPages();
            res.send(items);
        } catch(err) {
            console.error(err);
            res.sendStatus(500);
        }

    })();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

import express from 'express';
import { Block, nextBlock, getBlockchain } from './blockchain';
import * as bodyParser from 'body-parser';


console.log("Starting server...");

const app = express();
const port = 3000;

app.get('/blocks', (req, res) => {
    res.send(getBlockchain());
});

app.post('/mintBlock', (req, res) => {
    const newBlock: Block = nextBlock(req.body.data);
    res.send(newBlock);
});
app.listen(port, () => {
    console.log('Listening http on port: ' + port);
});
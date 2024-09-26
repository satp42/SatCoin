import express from 'express';
import { Block, nextBlock, getBlockchain } from './blockchain';
import * as bodyParser from 'body-parser';

const initHTTPServer = (myHttpNumber: number) => {
    const app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => {
        res.send(getBlockchain());
    });
    app.post('/mintBlock', (req, res) => {
        const newBlock: Block = nextBlock(req.body.data);
        res.send(newBlock);
    });
    app.listen(myHttpNumber, () => {
        console.log('Listening http on port: ' + myHttpNumber);
    });
}
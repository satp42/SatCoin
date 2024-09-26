"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blockchain_1 = require("./blockchain");
console.log("Starting server...");
const app = (0, express_1.default)();
const port = 3000;
app.get('/blocks', (req, res) => {
    res.send((0, blockchain_1.getBlockchain)());
});
app.post('/mintBlock', (req, res) => {
    const newBlock = (0, blockchain_1.nextBlock)(req.body.data);
    res.send(newBlock);
});
app.listen(port, () => {
    console.log('Listening http on port: ' + port);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockchain = exports.nextBlock = exports.Block = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
class Block {
    constructor(index, hash, data, timestamp, previousHash) {
        this.index = index;
        this.hash = hash;
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
    }
}
exports.Block = Block;
const calculateHash = (index, data, timestamp, previousHash) => {
    return crypto_js_1.default.SHA256(index + previousHash + data + timestamp).toString();
};
const genesisBlock = new Block(0, 'a06236e8ab60bfb620fab932fd38addcabac37c5a4234e81e3929d0e8fd98495 fdd22ec1eecc8a3ca1cfd999f5237a832868b92dc7d09d34d6a975b8023cdd81 91d1753acf361e286448d750032e5952948b1ae3aca82acd0fd4500aacf068f9 3318ef1a9828ea076d6d2290b887a5bd4435e8259a055b406041d162d6f89dab 9f516dd03dcc5a16c92ae8037259a3de6b8697a8f045eced5d9589de5b092389 63c687cd68ca9b8930d982e3a2e534ee491a6e8623010d1ee65693b6dd9c7a72 00647293dbafe67e190172ace616bc6a93d4620542f970db3bff268e08e68da8 8b579c5a4dd0b215be4cab0ee6eea25f5abaa4479b2542d76049e18844fe7364 03acf449c6a78f9dc63b43e817cd8ec7c5fcc92aace779188b4a7cfa609932a8 177fa5afc8b3331897138adee56a2d412bf82bc02843e01d73537e0e4fda8dc1', "Satwik!!", new Date('2024-09-25T23:12:00'), "");
let blockchain = [genesisBlock];
const getLatestBlock = () => {
    return blockchain[blockchain.length - 1];
};
const getBlockchain = () => {
    return blockchain;
};
exports.getBlockchain = getBlockchain;
const nextBlock = (data) => {
    const previousHash = getLatestBlock().hash;
    const index = getLatestBlock().index + 1;
    const timestamp = new Date();
    const hash = calculateHash(index, data, timestamp, previousHash);
    const newBlock = new Block(index, hash, data, timestamp, previousHash);
    return newBlock;
};
exports.nextBlock = nextBlock;
const isValidNewBlock = (newBlock) => {
    const previousBlock = getLatestBlock();
    if (newBlock.index != previousBlock.index + 1 || newBlock.previousHash != previousBlock.hash || calculateHash(newBlock.index, newBlock.data, newBlock.timestamp, newBlock.previousHash) != newBlock.hash) {
        console.log("New block is not valid due to one of the following reasons: previousHash does not match up the chain history, it has an invalid index, or the hash is invalid (it should be " + calculateHash(newBlock.index, newBlock.data, newBlock.timestamp, newBlock.previousHash));
    }
    return true;
};
const isValidBlockStructure = (newBlock) => {
    return typeof newBlock.index == "number"
        && typeof newBlock.data == "string"
        && typeof newBlock.hash == "string"
        && newBlock.timestamp instanceof Date
        && typeof newBlock.previousHash == "string";
};
const isValidChain = (chain) => {
    const isValidGenesis = (block) => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };
    if (!isValidGenesis(chain[0])) {
        return false;
    }
    for (let i = 0; i < chain.length; i++) {
        if (!isValidNewBlock(chain[i + 1]) && isValidBlockStructure(chain[i + 1])) {
            return false;
        }
    }
    return true;
};
const consensus = (newChain) => {
    if (isValidChain(newChain) && newChain.length > getBlockchain().length) {
        console.log("Chain is valid! New chain is replacing the other chain due to length");
        blockchain = newChain;
    }
    else {
        console.log('Received blockchain invalid');
    }
};

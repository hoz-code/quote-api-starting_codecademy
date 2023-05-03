const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => { console.log(`Server are listening by ${PORT} port`); });

const quoteInfoToFlatArr = (quote)=>{
    const objQuoteToArr = Object.entries(quote);
    const justQuoteInfo = (objQuoteToArr.filter(item => item[0] === 'quote')).flat();
    return justQuoteInfo
}

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    const justQuoteInfo = quoteInfoToFlatArr(quote)
    const keyObj = justQuoteInfo[0]
    const quoteInfo = justQuoteInfo[1]
    const quoteRes = {[keyObj]: {quoteInfo}};
    res.send(quoteRes);
});

app.get('/api/quotes', (req, res, next)=>{
    const autorQuotes = []
    if(Object.keys(req.query).length != 0){
        quotes.forEach(quote=>{
            if(quote[Object.keys(req.query)] === req.query[Object.keys(req.query)]){
                autorQuotes.push(quote['quote'])
            }
        })
        const keyObj = 'quotes'
        const quoteResAutor = {[keyObj]: autorQuotes};
        res.send(quoteResAutor)
    }else{
        res.send(quotes)
    }
})

app.put('/api/quotes',(req,res,next)=>{
    const arrQuery = Object.keys(req.query)
    if(arrQuery.length != 0){
        if(arrQuery[0] === 'quote' && arrQuery[1] === 'person'){
            quotes.push(req.query)
            res.status(202).send()
        }else{
            res.status(400).send()
        }
    }else{
        res.status(400).send()
    }
})
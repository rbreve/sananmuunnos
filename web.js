
const { response } = require('express');
const express = require('express')
const app = express()
const port = process.env.PORT || 80


app.use((req, res, next) => {
    req['rawBody'] = '';
    req.on('data', (chunk) => (req['rawBody'] += chunk));
    req.on('end', () => {
        rawBody = req['rawBody'];
        if(rawBody) {
          try {
            req.body = JSON.parse(rawBody);
          } catch(e) {
            req.body = {}
          }
         }
        next();
    });
});

// POST /login gets urlencoded bodies
app.post('/', function (req, res) {
  if (req.body) {
    console.log(req.body);
    words = req.body.split(/(\S+\s+)/).filter(function(n) {return n});

    firstPart=""
    secondPart=""
    results=[]
  
    pairs = words.reduce(function(result, value, index, array) {
        if (index % 2 === 0)
          result.push(array.slice(index, index + 2));
        return result;
      }, []);
  
  
    pairs.forEach(wordPair => {
        part1 = wordPair[0].match(/[^aeiouyåäö]*[aeiouyåäö]+/i)[0];
        if (wordPair[1]) {
            part2 =wordPair[1].match(/[^aeiouyåäö]*[aeiouyåäö]+/i)[0];
            results.push(wordPair[0].replace(part1,part2));
            results.push(wordPair[1].replace(part2,part1));
        }
        else {
            results.push(wordPair[0]);
        }
    });
    solution = results.join("")
    res.send(JSON.stringify(solution))
  }else {
    res.send(JSON.stringify("no data"))
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


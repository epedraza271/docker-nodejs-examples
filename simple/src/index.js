const newrelic = require('newrelic');
const express = require('express');
const app = express();
const port = 3000;

// Track the number of requests
var total = 1;


// Instrument an custom non web transaction
const transaction = newrelic.startBackgroundTransaction('customTransaction', customTransaction);

function customTransaction() {
  total = total + 1;
  // Gain more visibility into transaction by using startSegment
  const result = newrelic.startSegment('factorial',false, () => { return factorial(total); });
  return result;
};


// Recursive version of factorial function
function factorial(x) {

    if (x == 0) {
        return 1;
    }

    else {
        return x * factorial(x - 1);
    }
}



app.get('/', (req, res) => {
    const factorial = customTransaction();
    res.send('Hello World!' + '\nTotal:' + factorial);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

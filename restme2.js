

var fetch = require('whatwg-fetch');

fetch('http://localhost:8080/api/items')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })

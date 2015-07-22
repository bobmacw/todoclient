var rest, mime, client;

rest = require('rest'),
mime = require('rest/interceptor/mime');

client = rest.wrap(mime);
client({ path: 'http://localhost:8080/api/items' }).then(function(response) {
    console.log('response: ', response);
});

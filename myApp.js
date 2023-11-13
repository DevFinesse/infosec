const express = require('express');
const helmet = require('helmet')
const app = express();
helmet.hidePoweredBy()





module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Infosec App Started on ${PORT}`)
});

const express = require('express');
const helmet = require('helmet')
const app = express();
//hide powereby by Express header
app.use(helmet.hidePoweredBy())
//Mitigate the Risk of Clickjacking with helmet.frameguard()
app.use(helmet.frameguard({action: 'deny'}))
//Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter() 
app.use(helmet.xssFilter({}))
//Avoid Inferring the Response MIME Type with helmet.noSniff() 
app.use(helmet.noSniff())
//Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()
app.use(helmet.ieNoOpen())
//Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()
let ninetyDaysInSeconds = 90*24*60*60
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}))
//Disable DNS Prefetching with helmet.dnsPrefetchControl()
app.use(helmet.dnsPrefetchControl())



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

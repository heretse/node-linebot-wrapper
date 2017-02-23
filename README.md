# node-linebot-wrapper
Create your own Line bot with registering a RegExp to test against an incomming text message

## Installation
```sh
npm install node-linebot-wapper --save
```

## Usage

### Example
```js
var LineBotWrapper = require('node-linebot-wrapper');

...

var lineBot = new LineBotWrapper(
	'Your channel id',
    'Your channel secret',
    'Your channel access token',
    {onlyFirstMatch: true});

app.post('/', lineBot.getParser());
app.get('/', function(req, res) {
    res.send("Server is running");
});

...

lineBot.onText(/\/cal (.+)/, function(eventOrMsg, match) {
    var regex = /\/cal (.+)/;
    var respMsg = match[1].replace(/[^-()\d/*+.]/g, '');
    respMsg = 'result: ' + eval(respMsg);

    replyMessage(eventOrMsg, respMsg);
});

...

```


'use strict';

var LineBot = require('linebot');

module.exports = class LineBotWrapper {

    constructor(_channelId, _channelSecret, _channelAccessToken, options = {}) {
        //super();
        // Init line bot
        this.lineBot = LineBot({
            channelId: _channelId,
            channelSecret: _channelSecret,
            channelAccessToken: _channelAccessToken,
        });
        this._textRegexpCallbacks = [];
        this._imageCallback = null;

        this.startListening();
    }

    getParser() {
        return this.lineBot.parser();
    }

    onText(regexp, callback) {
        this._textRegexpCallbacks.push({ regexp, callback });
    }

    onImage(callback) {
        this._imageCallback = callback;
    }

    startListening() {
        this.lineBot.on('message', (event) => {
            console.log("\n" + JSON.stringify(event) + "\n");
            if (event.message.type === 'text') {
                this._textRegexpCallbacks.some(reg => {
                    console.log('Matching ' + event.message.text + ' with ' + reg.regexp);
                    const result = reg.regexp.exec(event.message.text);
                    if (!result) {
                        return false;
                    }
                    console.log('Matches ' + reg.regexp);
                    reg.callback(event, result);
                    // returning truthy value exits .some
                    //return this.options.onlyFirstMatch;
                    return true;
                });
            } else if (event.message.type === 'image') {
                if (this._imageCallback) {
                    this._imageCallback(event);
                }
            }
        });
    }

    push(to, message) {
        return this.lineBot.push(to, message);
    }
}
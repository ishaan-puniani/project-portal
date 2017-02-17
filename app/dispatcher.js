var guid = require('guid');
var listeners = {};

module.exports = {
    /*Register Listeners*/
    register: function (cb) {
        var id = guid.raw();
        listeners[id] = cb;
        return id;
    },
    /*Dispatch Event*/
    dispatch: function (payload) {
        console.info("Dispatching...", payload);
        for (var id in listeners) {
            var listener = listeners[id];
            listener(payload);
        }
    }
}
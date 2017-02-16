var dispatcher = require('./../dispatcher.js');

module.exports = {
    add: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "project-item:add"
        })
    },
    delete: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "project-item:delete"
        })
    },
    buy: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "project-item:buy"
        })
    },
    unbuy: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "project-item:unbuy"
        })
    },

    give: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "project-item:give"
        })
    },
    validDonation: function (donation, item) {
        dispatcher.dispatch({
            payload: {donation: donation, item: item},
            type: "project-item:validate"
        })
    }
}
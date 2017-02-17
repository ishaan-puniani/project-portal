var dispatcher = require('./../dispatcher.js');

module.exports = {
    /*Dispatched the donation*/
    give: function (item) {
        dispatcher.dispatch({
            payload: item,
            type: "project-item:give"
        })
    },
    /*Dispatched the validation for donation*/
    validDonation: function (donation, item) {
        dispatcher.dispatch({
            payload: {donation: donation, item: item},
            type: "project-item:validate"
        })
    }
}
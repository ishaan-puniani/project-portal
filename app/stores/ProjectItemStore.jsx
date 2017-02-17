var dispatcher = require('./../dispatcher.js');

function ProjectItemStore() {
/* Dummy Data */
    var items = [{
        name: "Project XXX",
        image: "https://it.sheridancollege.ca/images/project-puzzle-pieces.jpg",
        daysLeft: 3,
        donors: 11,
        donated: 320,
        amount: 500
    }, {
        name: "Project YYY",
        image: "http://www.itbusinessedge.com/imagesvr_ce/6630/VirtusaITProjectDelivery01.jpg",
        daysLeft: 12,
        donors: 6,
        donated: 160,
        amount: 500
    }, {
        name: "Project ZZZ",
        image: "http://www.planwallpaper.com/static/images/background-gmail-google-images_FG2XwaO.jpg",
        daysLeft: 3,
        donors: 9,
        donated: 600,
        amount: 500
    }, {
        name: "Project PPP",
        image: "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAYBAAAAJGI4ZjY1NGViLTRkZjgtNDExMy04ZDFiLTkwMDgwOTdkMmM0Zg.jpg",
        daysLeft: 3,
        donors: 18,
        donated: 500,
        amount: 500
    }];

    var listeners = [];

    /*Gets all items*/
    function getItems() {
        return items;
    }

    /* Basic validation for donation*/
    function validateDonation(donation, item) {
        item.invalid = isNaN(donation)
        if (!item.invalid) {
            item.amtToDonate = parseInt(donation);
        } else {
            item.amtToDonate = 0;
        }
        triggerListeners();
    }

    /* Submit donation*/
    function donate(item) {
        if (item.amtToDonate > 0) {
            item.donors++;
            item.donated += item.amtToDonate;
            triggerListeners();
        }
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    /* Triger listeners to update*/
    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(items);
        })
    };

    /* Register listeners */
    dispatcher.register(function (event) {
        var split = event.type.split(':');
        if (split[0] === 'project-item') {
            switch (split[1]) {
                case "validate": {
                    validateDonation(event.payload.donation, event.payload.item);
                    break;
                }
                case "give":
                    donate(event.payload, false);
                    break;
            }
        }
    });

    return {
        getItems: getItems,
        onChange: onChange
    }
}

module.exports = new ProjectItemStore();
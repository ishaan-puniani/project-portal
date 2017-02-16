var dispatcher = require('./../dispatcher.js');

function ProjectItemStore() {
    var items = [{
        name: "Project XXX",
        image: "http://www.planwallpaper.com/static/images/background-gmail-google-images_FG2XwaO.jpg",
        daysLeft: 3,
        donors: 11,
        donated: 320,
        amount: 500
    }, {
        name: "Project YYY",
        image: "http://www.planwallpaper.com/static/images/background-gmail-google-images_FG2XwaO.jpg",
        daysLeft: 3,
        donors: 11,
        donated: 320,
        amount: 500
    }, {
        name: "Project ZZZ",
        image: "http://www.planwallpaper.com/static/images/background-gmail-google-images_FG2XwaO.jpg",
        daysLeft: 3,
        donors: 11,
        donated: 600,
        amount: 500
    }, {
        name: "Project PPP",
        image: "http://www.planwallpaper.com/static/images/background-gmail-google-images_FG2XwaO.jpg",
        daysLeft: 3,
        donors: 11,
        donated: 500,
        amount: 500
    }];

    var listeners = [];

    function getItems() {
        return items;
    }

    function addProjectItem(item) {
        items.push(item);
        triggerListeners();
    }

    function deleteProjectItem(item) {
        var index;
        items.filter(function (_item, _index) {
            if (_item.name == item.name) {
                index = _index;
            }
        });

        items.splice(index, 1);
        triggerListeners();

    }

    function setProjectItemBought(item, isBought) {
        var _item = items.filter(function (a) {
            return a.name == item.name
        })[0];
        item.purchased = isBought || false;
        triggerListeners();
    }

    function validateDonation(donation, item) {
        item.invalid = isNaN(donation)
        if (!item.invalid) {
            item.amtToDonate = parseInt(donation);
        } else {
            item.amtToDonate = 0;
        }
        triggerListeners();
    }

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

    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(items);
        })
    };

    dispatcher.register(function (event) {
        var split = event.type.split(':');
        if (split[0] === 'project-item') {
            switch (split[1]) {
                case "add":
                    addProjectItem(event.payload);
                    break;
                case "delete":
                    deleteProjectItem(event.payload);
                    break;
                case "buy":
                    setProjectItemBought(event.payload, true);
                    break;
                case "unbuy":
                    setProjectItemBought(event.payload, false);
                    break;
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
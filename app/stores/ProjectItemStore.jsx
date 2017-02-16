var dispatcher = require('./../dispatcher.js');

function ProjectItemStore(){
    var items = [{
        name:"Project XXX",
        image:"",
        timeLeft:3,
        donor:11,
        donated:320,
        goal:400,
        amount:500
    },{
        name:"Project YYY",
        timeLeft:3,
        donor:11,
        donated:320,
        goal:400,
        amount:500
    },{
        name:"Project ZZZ",
        timeLeft:3,
        donor:11,
        donated:320,
        goal:400,
        amount:500
    },{
        name:"Project PPP",
        timeLeft:3,
        donor:11,
        donated:320,
        goal:400,
        amount:500
    }];
    
    var listeners = [];
    
    function getItems(){
        return items;
    }
    
    function addProjectItem(item) {
        debugger;
        items.push(item);
        triggerListeners();
    }
    
    function deleteProjectItem(item){
        var index;
        items.filter(function(_item, _index){
            if (_item.name == item.name) {
                index = _index;
            }
        });
        
        items.splice(index,1);
        triggerListeners();
    
    }
    
    function setProjectItemBought(item, isBought){
        var _item = items.filter(function(a){ return a.name == item.name})[0];
        item.purchased = isBought || false;
        triggerListeners();
    }
    
    function onChange(listener){
        listeners.push(listener);
    }
    
    function triggerListeners(){
		listeners.forEach(function(listener){
			listener(items)	;
		})
	};
    
    dispatcher.register(function(event){
        var split = event.type.split(':');
        if (split[0]==='project-item'){
            switch(split[1]){
                case "add":
                    addProjectItem(event.payload);
                    break;
                case "delete":
                    deleteProjectItem(event.payload);
                    break;
                case "buy":
                    setProjectItemBought(event.payload,true);
                    break;
                case "unbuy":
                    setProjectItemBought(event.payload,false);
                    break;
            }
        }
    });
    
    return {
        getItems:getItems,
        onChange:onChange
    }
    
    

}

module.exports = new ProjectItemStore();
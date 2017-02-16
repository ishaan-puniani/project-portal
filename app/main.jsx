var React = require('react');
var ReactDOM = require('react-dom');
console.log("Hello from JSX!");

var ProjectItemList = require('./components/ProjectItemList.jsx');

var projectItemStore = require('./stores/ProjectItemStore.jsx');
var initial = projectItemStore.getItems();
function render() {
    ReactDOM.render(<ProjectItemList items={initial}/>, app)
}

projectItemStore.onChange(function (items) {
    initial = items;
    render();
})

render();
var React = require('react');
var ProjectItem = require('./ProjectItem.jsx');
var ProjectListAddItem = require('./ProjectListAddItem.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Projects</h1>
                <div>
                    {
                        this.props.items.map(function (item, index) {
                        return (
                            <ProjectItem item={item} key={"item" + index}/>
                        )
                    })
                    }
                </div>
                <ProjectListAddItem />
            </div>
        )
    }
})
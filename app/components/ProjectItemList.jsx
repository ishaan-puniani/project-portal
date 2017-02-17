var React = require('react');
var ProjectItem = require('./ProjectItem.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <h1 className="header">Projects</h1>
                <div>
                    {
                        this.props.items.map(function (item, index) {
                        return (
                            <ProjectItem item={item} key={"item" + index}/>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
})
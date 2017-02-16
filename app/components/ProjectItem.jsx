var React = require('react');
var action = require('./../actions/ProjectItemActionCreator.jsx')

var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
    togglePurchased: function (e) {
        e.preventDefault();

        if (this.props.item.purchased) {
            action.unbuy(this.props.item);
        } else {
            action.buy(this.props.item);
        }
    },
    delete: function (e) {
        e.preventDefault();
        action.delete(this.props.item);

    },
    render: function () {

        var tooltip = (
            <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
        );

        return (
            <div className="project-item row">
                <OverlayTrigger placement="left" overlay={tooltip}>
                    <Button bsStyle="default">Holy guacamole!</Button>
                </OverlayTrigger>


                <div className="six columns">
                    <h4 className={this.props.item.purchased ? "strikethrough" : "" }>
                        {this.props.item.name}
                    </h4>
                </div>
                <form onSubmit={this.togglePurchased} className="three columns">
                    <button
                        className={this.props.item.purchased ? "" : "button-primary"}>{this.props.item.purchased ? "unbuy" : "buy"}</button>
                </form>
                <form className="three columns" onSubmit={this.delete}>
                    <button>&times;</button>
                </form>
            </div>
        )
    }
})
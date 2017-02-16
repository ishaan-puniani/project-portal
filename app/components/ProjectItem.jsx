var React = require('react');
var action = require('./../actions/ProjectItemActionCreator.jsx')
var utils = require('./../utils/utils')
var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var ProgressBar = require('react-bootstrap').ProgressBar;
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
    donate: function (e) {
        e.preventDefault();
        action.give(this.props.item);
    },
    handleChange: function (e) {
        e.preventDefault();
        action.validDonation(e.target.value, this.props.item);
    },
    render: function () {

        var tooltip = (
            <Tooltip id="tooltip"><strong>{this.props.item.amount - this.props.item.donated} </strong> still needed for
                this project.</Tooltip>
        );
        var preogressBar = (<ProgressBar now={utils.getPercentage(this.props.item.donated, this.props.item.amount)}
                                         bsStyle={this.props.item.donated < this.props.item.amount ? "warning" : "success"}/>);
        var progressBarContainer = (<div>
            {this.props.item.donated < this.props.item.amount ? (
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        {preogressBar}
                    </OverlayTrigger>
                ) : (preogressBar)
            }
        </div>);

        return (
            <div className="project-item row">
                <div className="col-md-12">
                    <img src={this.props.item.image}></img>
                    <h1>{this.props.item.name}</h1>
                    {progressBarContainer}
                    <div><span>Only {this.props.item.daysLeft} days left</span> to fund this project.</div>
                    <div>Join the <span>{this.props.item.donors}</span> other who have donated
                        <span>{this.props.item.donated}</span>.
                    </div>

                    <div className="six columns">

                        <h4 className={this.props.item.purchased ? "strikethrough" : "" }>
                            {this.props.item.name}
                        </h4>
                    </div>
                    <form onSubmit={this.donate} className="three columns">
                        <div>
                            <input type="text" onChange={this.handleChange} value={this.props.item.amt}/>
                            <Button type="submit" bsStyle={this.props.item.invalid ? "default" : "success"}>Donate</Button>
                        </div>
                    </form>
                    <form className="three columns" onSubmit={this.delete}>
                        <button>&times;</button>
                    </form>
                </div>
            </div>
        )
    }
})
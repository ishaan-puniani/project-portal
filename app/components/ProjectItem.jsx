var React = require('react');
var action = require('./../actions/ProjectItemActionCreator.jsx')
var utils = require('./../utils/utils')
var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var ProgressBar = require('react-bootstrap').ProgressBar;
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
    /* Triggers Donation submition*/
    donate: function (e) {
        e.preventDefault();
        action.give(this.props.item);
    },
    /* Triggers Donation validation on text change on the textbox */
    handleChange: function (e) {
        e.preventDefault();
        action.validDonation(e.target.value, this.props.item);
    },

    /* Renders the project item on UI */
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
            <div className="project-item">
                <div className="col-md-6">
                    <div className="text-center">
                        <img src={this.props.item.image}></img>
                        <h1>{this.props.item.name}</h1>
                    </div>
                    <div className="panel panel-default">
                        {progressBarContainer}
                        <div className="pnlBody">
                            <div><span className="daysLeft">Only {this.props.item.daysLeft} days left</span> to fund
                                this project.
                            </div>
                            <div>Join the <span className="donorsCount">{this.props.item.donors}</span> other who have
                                donated
                                <span className="amtDonated"> ${this.props.item.donated}</span>.
                            </div>
                            <form onSubmit={this.donate} className="form-inline">

                                <div className="donateForm">
                                    <input type="text" className="form-control" onChange={this.handleChange}
                                           placeholder="Amount"/>
                                    <Button type="submit"
                                            bsStyle={this.props.item.invalid ? "default" : "success"}>Donate</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
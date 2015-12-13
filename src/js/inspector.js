var Inspector = React.createClass({
	getInitialState: function() {
        return {
            inspectStyle: {
                right: this.props.style.right + 155 + 'px',
                top: this.props.style.top + 5 + 'px',
            }
        }
    },
    render: function() {
    	return (
    		<div className="inspect" style={this.state.inspectStyle}>
                <p>{this.props.details}</p>
            </div>
    	);
    }
});

module.exports = Inspector;
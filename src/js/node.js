var Node = React.createClass({
    getInitialState: function() {
        return {
            editing: false,
            proliferated: false,
            parent: null,
        }
    },
    componentWillMount: function() {
        this.style = {
            //right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            //top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            //transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
            right: this.props.style.right + 'px',
            top: this.props.style.top + 'px',
        };
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
    },
    randomBetween: function(min, max) {
        return (min + Math.ceil(Math.random() * max));
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    proliferate: function() {
        if(!this.state.proliferated) {
            console.log(this.props.index);
            console.log(this.props.style);
            this.props.onProliferate(this.props.index, this.style);
            this.setState({ proliferated: !this.state.proliferated});
        }
        else {
            console.log("already proliferated");
        }
    },
    renderDisplay: function() {
        return (
            <div className="node"
                style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                    <button onClick={this.proliferate}
                            className="btn btn-success glyphicon glyphicon-zoom-in"/>        
                </span>
            </div>
            );
    },
    renderForm: function() {
        return (
            <div className="node" style={this.style}>
            <textarea ref="newText" defaultValue={this.props.children} 
            className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    },
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});

module.exports = Node;














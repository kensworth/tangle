var Node = React.createClass({
    getInitialState: function() {
        return {
            editing: false,
            proliferated: false,
            parent: null,
            /*style: {
                right: this.props.style.right + 'px',
                top: this.props.style.top + 'px',
            },*/
        }
    },
    componentWillMount: function() {
        this.style = {
            right: this.props.style.right + 'px',
            top: this.props.style.top + 'px',
        };
        this.setState({parent: this.props.parent});
        console.log(this.style);

        this.imageStyle={
            //testing hard-coded background
            right: this.props.style.right + 'px',
            top: this.props.style.top + 'px',
            backgroundImage: 'url(' + this.props.image + ')',
            backgroundSize: 'cover',
            opacity: '0.3',
        }
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
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
            this.props.onProliferate(this.props.node, this.state.parent, 3); //test number before hooking into backend
            this.setState({ proliferated: !this.state.proliferated});
            //this.setState({ style: {}})
        }
        else {
            console.log('already proliferated');
        }
    },
    renderDisplay: function() {
        return (
            <div>
                <div className="node" style={this.imageStyle}></div>
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

var Node = React.createClass({
    getInitialState: function() {
        return {
            editing: false,
            proliferated: false,
            parent: null,
            style: {
                right: this.props.style.right + 'px',
                top: this.props.style.top + 'px',
            },
            imageStyle: {
                //testing hard-coded background
                right: this.props.style.right + 'px',
                top: this.props.style.top + 'px',
                backgroundImage: 'url(' + this.props.image + ')',
                backgroundSize: 'cover',
                opacity: '0.3',
            }
        }
    },
    componentWillMount: function() {
        /*this.style = {
            right: this.props.style.right + 'px',
            top: this.props.style.top + 'px',
        };*/
        this.setState({parent: this.props.parent});
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
            //pre-backend hardcode
            this.props.onProliferate(this.props.node, this.state.parent, 3);
            this.setState({ proliferated: !this.state.proliferated});

            //goal is to travel 300px in the vector of the node and parent and proliferate in PI radians
            if(this.state.parent != null) {
                this.setState({
                    imageStyle: {
                        right: this.props.style.right + 100 + 'px',
                        top: this.props.style.top + 100 + 'px',
                        backgroundImage: 'url(' + this.props.image + ')',
                        backgroundSize: 'cover',
                        opacity: '0.3',
                    },
                    style: {
                        right: this.props.style.right + 100 + 'px',
                        top: this.props.style.top + 100 + 'px',
                    },
                });
            }
        }
        else {
            console.log('already proliferated');
        }
    },
    renderDisplay: function() {
        return (
            <div>
                <div className="node" style={this.state.imageStyle}></div>
                <div className="node"
                    style={this.state.style}>
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

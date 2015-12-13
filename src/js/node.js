var Node = React.createClass({
    getInitialState: function() {
        return {
            proliferated: false,
            parent: null,
            details: null,
            style: {
                height: 150 + 'px',
                width: 150 + 'px',
                right: this.props.style.right + 'px',
                top: this.props.style.top + 'px',
            },
            imageStyle: {
                height: 150 + 'px',
                width: 150 + 'px',
                right: this.props.style.right + 'px',
                top: this.props.style.top + 'px',
                backgroundImage: 'url(' + this.props.image + ')',
                backgroundSize: 'cover',
                opacity: '0.25',
            },
        }
    },
    componentWillMount: function() {
        this.setState({parent: this.props.parent});
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
    },
    inspect: function() {
        console.log(this.props.details);
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    proliferate: function() {
        if(!this.state.proliferated) {
            var right = null;
            var top = null;

            if(this.state.parent != null) {
                //displace 300 px away from the node in the angle formed by the node and its parent
                this.setState({
                    imageStyle: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: this.props.style.right - 15 + 300 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                        top: this.props.style.top - 15 + 300 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
                        backgroundImage: 'url(' + this.props.image + ')',
                        backgroundSize: 'cover',
                        opacity: '0.5',
                    },
                    style: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: this.props.style.right - 15 + 300 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                        top: this.props.style.top - 15 + 300 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
                    },
                });
                //fired to proliferate before rerender
                right = this.props.style.right + 300 * this.props.displacement(this.props.node, this.state.parent).x;
                top = this.props.style.top + 300 * this.props.displacement(this.props.node, this.state.parent).y;

                $("#slate").animate({
                    //right: right + 'px',
                    //top: top + 'px',
                    left: '+=' + 600 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                    top: '-=' + 600 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
                }, 1000, function() {
                    // Animation complete.
                });

            }
            else {
                this.setState({
                    style: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: this.props.style.right - 15 + 'px',
                        top: this.props.style.top - 15 + 'px',
                    },
                    imageStyle: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: this.props.style.right - 15 + 'px',
                        top: this.props.style.top - 15 + 'px',
                        backgroundImage: 'url(' + this.props.image + ')',
                        backgroundSize: 'cover',
                        opacity: '0.65',
                    }
                });
            }

            //pre-backend hardcode
            //when backend is hooked up, each JSON object returned will be stored in an array, the length of which is the amount of nodes to be created, the text inside which being the information to be contained within
            //this object will be inserted into proliferate, the function will be changed to accommodate for the dynamism
            this.props.onProliferate({right: right, top: top}, this.props.node, this.state.parent, 3);
            this.setState({ proliferated: !this.state.proliferated});
        }
        else {
            console.log('already proliferated');
        }
    },
    render: function() {
        return (
            <div>
                <div className="nodeImage" style={this.state.imageStyle}></div>
                <div className="node"
                    onDoubleClick={this.proliferate} 
                    style={this.state.style}>
                    <p>{this.props.children}</p>
                    <span style={this.state.buttonStyle}>
                        <button onClick={this.inspect}
                                className="btn btn-success glyphicon glyphicon-zoom-in"/>
                        <button onClick={this.remove}
                                className="btn btn-danger glyphicon glyphicon-trash"/>        
                    </span>
                </div>
            </div>
            );
    }
});

module.exports = Node;

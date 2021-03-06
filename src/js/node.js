var Node = React.createClass({
    getInitialState: function() {
        return {
            proliferated: false,
            inspecting: false,
            parent: null,
            details: null,
            location: {
                right: this.props.style.right + 155,
                top: this.props.style.top + 5,
            },
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
            inspectStyle: {
                right: null,
                top: null,
                opacity: '0',
            },
        }
    },
    componentWillMount: function() {
        this.setState({parent: this.props.parent});
    },
    inspect: function() {
        this.setState({inspecting: !this.state.inspecting});
        var inspecting = !this.state.inspecting;
        if(inspecting) {
            this.setState({
                inspectStyle: {
                    right: this.state.location.right + 'px',
                    top: this.state.location.top + 'px',
                    opacity: '1',
                },
            });
        }
        else {
            this.setState({
                inspectStyle: {
                    right: this.state.location.right + 155 + 'px',
                    top: this.state.location.top + 155 + 'px',
                    opacity: '0',
                },
            });
        }
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
                var displacement = this.props.displacement(this.props.node, this.state.parent);
                var style = this.props.style;
                this.setState({
                    location: {
                        right: this.props.style.right + 170 + 300 * displacement.x,
                        top: this.props.style.top - 5 + 300 * displacement.y,
                    },
                    inspectStyle: {
                        right: this.props.style.right + 170 + 300 * displacement.x,
                        top: this.props.style.top - 5 + 300 * displacement.y,
                    },
                    imageStyle: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: style.right - 15 + 300 * displacement.x + 'px',
                        top: style.top - 15 + 300 * displacement.y + 'px',
                        backgroundImage: 'url(' + this.props.image + ')',
                        backgroundSize: 'cover',
                        opacity: '0.5',
                    },
                    style: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: style.right - 15 + 300 * displacement.x + 'px',
                        top: style.top - 15 + 300 * displacement.y + 'px',
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
                    location: {
                        right: this.props.style.right + 170,
                        top: this.props.style.top - 5,
                    },
                    inspectStyle: {
                        right: this.props.style.right + 170,
                        top: this.props.style.top - 5,
                    },
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
                    },
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
                <div className="inspect" style={this.state.inspectStyle}>
                    <p>{this.props.details}</p>
                </div>
            </div>
        );
    }
});

module.exports = Node;

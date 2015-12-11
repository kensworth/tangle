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
        this.setState({parent: this.props.parent});
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
        /*var delay = 200, clicks = 0, timer = null;
        $(this.getDOMNode()).on("click", function(e){
            clicks++;  //count clicks
            if(clicks === 1) {
                timer = setTimeout(function() { 
                    console.log('click');
                    view();
                    //view
                    clicks = 0; //after action performed, reset counter
                }, delay);
            } else {
                clearTimeout(timer); //prevent single-click action
                clicks = 0; //after action performed, reset counter
                console.log('double click');
                focus();
            }
        })
        .on("dblclick", function(e){
            e.preventDefault(); //cancel system double-click event
        });
        function view() {
            console.log('view');
        }
        function focus() {
            console.log('focus');
        }*/
    },
    handleClick: function(event) {
        console.log('click');
    },
    handleDoubleClick: function(event) {
        console.log('double click');
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
            var right = null;
            var top = null;

            if(this.state.parent != null) {
                //displace 300 px away from the node in the angle formed by the node and its parent
                this.setState({
                    imageStyle: {
                        right: this.props.style.right + 300 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                        top: this.props.style.top + 300 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
                        backgroundImage: 'url(' + this.props.image + ')',
                        backgroundSize: 'cover',
                        opacity: '0.3',
                    },
                    style: {
                        right: this.props.style.right + 300 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                        top: this.props.style.top + 300 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
                    },
                });
                //fired to proliferate before rerender
                right = this.props.style.right + 300 * this.props.displacement(this.props.node, this.state.parent).x;
                top = this.props.style.top + 300 * this.props.displacement(this.props.node, this.state.parent).y;
            }
            //pre-backend hardcode
            //this.props.node is not the current node
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
                <div className="node" style={this.state.imageStyle}></div>
                <div className="node"
                    onClick={this.handleClick}
                    ondblclick={this.handleDoubleClick} 
                    style={this.state.style}>
                    <p>{this.props.children}</p>
                    <span>
                        <button onClick={this.proliferate}
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

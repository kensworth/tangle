var Node = require('./node');

var Slate = React.createClass({
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " nodes is ridiculous");
            }
        }
    },
    getInitialState: function() {
        return {
            nodes: []
        };
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    add: function(text, node, parent, number) {
        var arr = this.state.nodes;
        if(node == null && parent == null) {
            console.log('node and parent null');
            console.log('-------------------------------');
            arr.push({
                id: this.nextId(),
                text: text,
                style: {
                    right: window.innerWidth / 2,
                    top: window.innerHeight / 2,
                },
            });
        } 
        else if(parent == null) {
            console.log('node not null, parent null');
            console.log('-------------------------------');
            for(i = 0; i < number; i++) {
                arr.push({
                    id: this.nextId(),
                    text: text,
                    style: {
                        right: window.innerWidth / 2 + 250 * Math.sin((i / number) * 2 * Math.PI),
                        top: window.innerHeight / 2 + 250 * Math.cos((i / number) * 2 * Math.PI),
                    },
                    parent: node
                });
            }
        }
        else {
            console.log('both not null');
            console.log('-------------------------------');
            for(i = 0; i < number; i++) {
                arr.push({
                    id: this.nextId(),
                    text: text,
                    style: {
                        right: 0,
                        top: 0,
                    },
                    parent: node
                });
            }
        }
        this.setState({nodes: arr});
    },
    proliferate: function(node, parent, number) {
        //proliferate needs to take in a number parameter later when hooking to the backend
        //node math needed
        console.log('node:');
        console.dir(node);
        console.log('parent:');
        console.dir(parent);
        this.add('node', node, parent, number);
    },
    update: function(newText, i) {
        var arr = this.state.nodes;
        arr[i].text = newText;
        this.setState({nodes:arr});
    },
    remove: function(i) {
        var arr = this.state.nodes;
        arr.splice(i, 1);
        this.setState({nodes: arr});
    },
    eachNode: function(node, i) {
        return (
                <Node key={node.id}
                    index={i}
                    onChange={this.update}
                    onRemove={this.remove}
                    onProliferate={this.proliferate}
                    style={this.state.nodes[i].style}
                    node={this.state.nodes[i]}
                    parent={this.state.nodes[i].parent}
                >{node.text}</Node>
            );
    },
    render: function() {
        return (<div className="slate">
                    {this.state.nodes.map(this.eachNode)}
                    <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                            onClick={this.add.bind(null, "node", null, null, 1)}/>
            </div>

        );
    }
});

module.exports = Slate;

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
            //put in store
        };
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    add: function(text, node, parent) {
        //method takes in nodes? or parent? someway to differentiate between first add and subsequent proliferates
        var arr = this.state.nodes;
        //if parent == null
        //parent.parent == null
        if(node == null) {
            console.log('node null');
            arr.push({
                id: this.nextId(),
                node: text,
                style: {
                    right: window.innerWidth / 2,
                    top: window.innerHeight / 2,
                },
            });
        } 
        else if(parent == null) {
            console.log('node not null, parent null');
        }
        else {
            console.log('both not null');
        }
        this.setState({nodes: arr});
    },
    proliferate: function(node, parent) {
        var responses = 2; //testing
        //node math needed
        console.log('node:');
        console.dir(node);
        console.log('parent:');
        console.dir(parent);
        for(i = 0; i < responses; i++) {
            console.log('requested');
            this.add('node' + i, node, parent);
        }
    },
    update: function(newText, i) {
        var arr = this.state.nodes;
        arr[i].node = newText;
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
                >{node.node}</Node>
            );
    },
    render: function() {
        return (<div className="slate">
                    {this.state.nodes.map(this.eachNode)}
                    <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                            onClick={this.add.bind(null, "node", null)}/>
            </div>

        );
    }
});

module.exports = Slate;

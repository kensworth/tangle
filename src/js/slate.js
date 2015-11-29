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
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    add: function(text) {
        var arr = this.state.nodes;
        arr.push({
            id: this.nextId(),
            node: text
        });
        this.setState({nodes: arr});
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
    eachnode: function(node, i) {
        return (
                <Node key={node.id}
                    index={i}
                    onChange={this.update}
                    onRemove={this.remove}
                >{node.node}</Node>
            );
    },
    render: function() {
        return (<div className="slate">
                    {this.state.nodes.map(this.eachnode)}
                    <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                            onClick={this.add.bind(null, "node")}/>
            </div>

        );
    }
});

module.exports = Slate;

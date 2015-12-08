(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js":[function(require,module,exports){
var Slate = require('./slate');

React.render(React.createElement(Slate, {count: 10}), 
    document.getElementById('app'));

},{"./slate":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js"}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js":[function(require,module,exports){
var Node = React.createClass({displayName: "Node",
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
    renderDisplay: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "node", style: this.state.imageStyle}), 
                React.createElement("div", {className: "node", 
                    style: this.state.style}, 
                    React.createElement("p", null, this.props.children), 
                    React.createElement("span", null, 
                        React.createElement("button", {onClick: this.edit, 
                                className: "btn btn-primary glyphicon glyphicon-pencil"}), 
                        React.createElement("button", {onClick: this.remove, 
                                className: "btn btn-danger glyphicon glyphicon-trash"}), 
                        React.createElement("button", {onClick: this.proliferate, 
                                className: "btn btn-success glyphicon glyphicon-zoom-in"})
                    )
                )
            )
            );
    },
    renderForm: function() {
        return (
            React.createElement("div", {className: "node", style: this.style}, 
                React.createElement("textarea", {ref: "newText", defaultValue: this.props.children, 
                className: "form-control"}), 
                React.createElement("button", {onClick: this.save, className: "btn btn-success btn-sm glyphicon glyphicon-floppy-disk"})
            )
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

},{}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js":[function(require,module,exports){
var Node = require('./node');

var Slate = React.createClass({displayName: "Slate",
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
            nodes: [],
            //hardcode until backend can be hooked up
            images: [
                'http://ontherealny.com/wp-content/uploads/2013/01/washington_arch_1899.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/b/be/NYC_-_Washington_Square_Park.JPG',
                'http://static01.nyt.com/images/2009/08/05/books/garner-600.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/f/f7/Washington_Square_Park_Chess_Players_by_David_Shankbone.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Washington_Square_northeast_entrance.jpg/325px-Washington_Square_northeast_entrance.jpg',
                'http://onthesetofnewyork.com/locations/iamlegend/iamlegend04.jpg',
            ]
        };
    },
    componentDidMount: function(){
        //add parallax tangl logo
        $(this.getDOMNode()).draggable();
        this.height = $("#slate").height();
        this.width = $("#slate").width();
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    add: function(text, location, node, parent, number) {
        var arr = this.state.nodes;
        if(node == null && parent == null) {
            arr.push({
                id: this.nextId(),
                text: text,
                style: {
                    right: this.width / 2,
                    top: this.height / 2,
                },
            });
        } 
        else if(parent == null) {
            for(i = 0; i < number; i++) {
                arr.push({
                    id: this.nextId(),
                    text: text,
                    style: {
                        right: this.width / 2 + 300 * Math.sin((i / number) * 2 * Math.PI),
                        top: this.height / 2 + 300 * Math.cos((i / number) * 2 * Math.PI),
                    },
                    parent: node,
                });
            }
        }
        else {
            var right = location.right;
            var top = location.top;
            console.log(right + ' ' + top);

            for(i = 0; i < number; i++) {
                arr.push({
                    id: this.nextId(),
                    text: text,
                    style: {
                        right: right + 300 * Math.sin((i / number) * 2 * Math.PI),
                        top: top + 300 * Math.cos((i / number) * 2 * Math.PI),
                    },
                    parent: node
                });
            }
        }
        this.setState({nodes: arr});
    },
    displace: function(node, parent) {
        var reference = {
            style: {
                right: node.style.right,
                top: node.style.top - 10,
            }
        }
        var angle = this.findAngle(parent, node, reference);
        var displacement = {
            y: Math.cos(angle),
            x: Math.sin(angle),
        }

        return displacement;
    },
    proliferate: function(location, node, parent, number) {
        //proliferate needs to take in a number parameter later when hooking to the backend
        this.add('node', location, node, parent, number);
    },
    findAngle(p0,p1,p2) {
        var a = Math.pow(p1.style.right-p0.style.right,2) + Math.pow(p1.style.top-p0.style.top,2),
        b = Math.pow(p1.style.right-p2.style.right,2) + Math.pow(p1.style.top-p2.style.top,2),
        c = Math.pow(p2.style.right-p0.style.right,2) + Math.pow(p2.style.top-p0.style.top,2);
        if(p1.style.right < p0.style.right) {
            return 2 * Math.PI - Math.acos((a+b-c) / Math.sqrt(4 * a * b));
        }
        else {
            return Math.acos((a + b - c) / Math.sqrt(4 * a * b));
        }
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
                React.createElement(Node, {key: node.id, 
                    index: i, 
                    onChange: this.update, 
                    onRemove: this.remove, 
                    onProliferate: this.proliferate, 
                    style: this.state.nodes[i].style, 
                    node: this.state.nodes[i], 
                    parent: this.state.nodes[i].parent, 
                    image: this.state.images[i % 6], 
                    displacement: this.displace
                }, node.text)
            );
    },
    render: function() {
        return (
            React.createElement("div", {className: "slate", id: "slate"}, 
                this.state.nodes.map(this.eachNode), 
                React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", 
                    onClick: this.add.bind(null, "node", null, null, null, 1)})
            )

        );
    }
});

module.exports = Slate;

},{"./node":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js"}]},{},["/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTtnQkFDcEMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJO2FBQ25DO0FBQ2IsWUFBWSxVQUFVLEVBQUU7O2dCQUVSLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTtnQkFDcEMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJO2dCQUNoQyxlQUFlLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUc7Z0JBQ2hELGNBQWMsRUFBRSxPQUFPO2dCQUN2QixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKO0tBQ0o7SUFDRCxrQkFBa0IsRUFBRSxXQUFXO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsaUJBQWlCLEVBQUUsVUFBVTtRQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDcEM7SUFDRCxJQUFJLEVBQUUsV0FBVztRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNsQztJQUNELElBQUksRUFBRSxXQUFXO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsTUFBTSxFQUFFLFdBQVc7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pDO0lBQ0QsV0FBVyxFQUFFLFdBQVc7UUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUM3QixZQUFZLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7QUFFM0IsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTs7Z0JBRTFCLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsVUFBVSxFQUFFO3dCQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUk7d0JBQzFHLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUk7d0JBQ3RHLGVBQWUsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRzt3QkFDaEQsY0FBYyxFQUFFLE9BQU87d0JBQ3ZCLE9BQU8sRUFBRSxLQUFLO3FCQUNqQjtvQkFDRCxLQUFLLEVBQUU7d0JBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSTt3QkFDMUcsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSTtxQkFDekc7QUFDckIsaUJBQWlCLENBQUMsQ0FBQzs7Z0JBRUgsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pILGFBQWE7QUFDYjs7WUFFWSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFGLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDNUQ7YUFDSTtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUN2QztLQUNKO0lBQ0QsYUFBYSxFQUFFLFdBQVc7UUFDdEI7WUFDSSxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO2dCQUNELG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsTUFBQSxFQUFNLENBQUMsS0FBQSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFZLENBQU0sQ0FBQSxFQUFBO2dCQUMxRCxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLE1BQUEsRUFBTTtvQkFDakIsS0FBQSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFPLENBQUEsRUFBQTtvQkFDekIsb0JBQUEsR0FBRSxFQUFBLElBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQWEsQ0FBQSxFQUFBO29CQUM1QixvQkFBQSxNQUFLLEVBQUEsSUFBQyxFQUFBO3dCQUNGLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLElBQUksRUFBQztnQ0FDbkIsU0FBQSxFQUFTLENBQUMsNENBQTRDLENBQUUsQ0FBQSxFQUFBO3dCQUNoRSxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxNQUFNLEVBQUM7Z0NBQ3JCLFNBQUEsRUFBUyxDQUFDLDBDQUEwQyxDQUFFLENBQUEsRUFBQTt3QkFDOUQsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsV0FBVyxFQUFDO2dDQUMxQixTQUFBLEVBQVMsQ0FBQyw2Q0FBNkMsQ0FBRSxDQUFBO29CQUM5RCxDQUFBO2dCQUNMLENBQUE7WUFDSixDQUFBO2NBQ0o7S0FDVDtJQUNELFVBQVUsRUFBRSxXQUFXO1FBQ25CO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxNQUFBLEVBQU0sQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBTyxDQUFBLEVBQUE7Z0JBQ3JDLG9CQUFBLFVBQVMsRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBQSxFQUFZLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUM7Z0JBQzFELFNBQUEsRUFBUyxDQUFDLGNBQWUsQ0FBVyxDQUFBLEVBQUE7Z0JBQ3BDLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLFNBQUEsRUFBUyxDQUFDLHdEQUF3RCxDQUFBLENBQUcsQ0FBQTtZQUMvRixDQUFBO2FBQ0w7S0FDUjtJQUNELE1BQU0sRUFBRSxXQUFXO1FBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QjthQUNJO1lBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDL0I7S0FDSjtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzs7QUMzR3RCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFN0IsSUFBSSwyQkFBMkIscUJBQUE7SUFDM0IsU0FBUyxFQUFFO1FBQ1AsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFLFFBQVEsRUFBRTtZQUM3QixJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFFBQVEsQ0FBQztnQkFDcEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFO2dCQUN2QixPQUFPLElBQUksS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsc0JBQXNCLENBQUMsQ0FBQzthQUM1RTtTQUNKO0tBQ0o7SUFDRCxlQUFlLEVBQUUsV0FBVztRQUN4QixPQUFPO0FBQ2YsWUFBWSxLQUFLLEVBQUUsRUFBRTs7WUFFVCxNQUFNLEVBQUU7Z0JBQ0osNEVBQTRFO2dCQUM1RSxzRkFBc0Y7Z0JBQ3RGLGdFQUFnRTtnQkFDaEUsaUhBQWlIO2dCQUNqSCxtSkFBbUo7Z0JBQ25KLGtFQUFrRTthQUNyRTtTQUNKLENBQUM7S0FDTDtBQUNMLElBQUksaUJBQWlCLEVBQUUsVUFBVTs7UUFFekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3BDO0lBQ0QsTUFBTSxFQUFFLFdBQVc7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzFCO0lBQ0QsR0FBRyxFQUFFLFNBQVMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtRQUNoRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMzQixHQUFHLElBQUksSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNqQixJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztvQkFDckIsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztpQkFDdkI7YUFDSixDQUFDLENBQUM7U0FDTjthQUNJLEdBQUcsTUFBTSxJQUFJLElBQUksRUFBRTtZQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDTCxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDakIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsS0FBSyxFQUFFO3dCQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ2xFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQ3BFO29CQUNELE1BQU0sRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQzthQUNOO1NBQ0o7YUFDSTtZQUNELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztBQUNuQyxZQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQzs7WUFFL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ0wsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxJQUFJO29CQUNWLEtBQUssRUFBRTt3QkFDSCxLQUFLLEVBQUUsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDekQsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQ3hEO29CQUNELE1BQU0sRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0I7SUFDRCxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQzdCLElBQUksU0FBUyxHQUFHO1lBQ1osS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQ3ZCLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxZQUFZLEdBQUc7WUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQzlCLFNBQVM7O1FBRUQsT0FBTyxZQUFZLENBQUM7S0FDdkI7QUFDTCxJQUFJLFdBQVcsRUFBRSxTQUFTLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTs7UUFFbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDcEQ7SUFDRCxTQUFTLFdBQVc7UUFDaEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FB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QUMsT0FBUSxDQUFBLEVBQUE7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUM7Z0JBQ3JDLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsaURBQUEsRUFBaUQ7b0JBQy9ELE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQTtBQUNoRixZQUFrQixDQUFBOztVQUVSO0tBQ0w7QUFDTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFNsYXRlID0gcmVxdWlyZSgnLi9zbGF0ZScpO1xuXG5SZWFjdC5yZW5kZXIoPFNsYXRlIGNvdW50PXsxMH0vPiwgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiLCJ2YXIgTm9kZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgICBwcm9saWZlcmF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1hZ2VTdHlsZToge1xuICAgICAgICAgICAgICAgIC8vdGVzdGluZyBoYXJkLWNvZGVkIGJhY2tncm91bmRcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjMnLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYXJlbnQ6IHRoaXMucHJvcHMucGFyZW50fSk7XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuZHJhZ2dhYmxlKCk7XG4gICAgfSxcbiAgICBlZGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogdHJ1ZX0pO1xuICAgIH0sXG4gICAgc2F2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5yZWZzLm5ld1RleHQuZ2V0RE9NTm9kZSgpLnZhbHVlLCB0aGlzLnByb3BzLmluZGV4KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZCkge1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBudWxsO1xuXG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9kaXNwbGFjZSAzMDAgcHggYXdheSBmcm9tIHRoZSBub2RlIGluIHRoZSBhbmdsZSBmb3JtZWQgYnkgdGhlIG5vZGUgYW5kIGl0cyBwYXJlbnRcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS54ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuMycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vZmlyZWQgdG8gcHJvbGlmZXJhdGUgYmVmb3JlIHJlcmVuZGVyXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMzAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueDtcbiAgICAgICAgICAgICAgICB0b3AgPSB0aGlzLnByb3BzLnN0eWxlLnRvcCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3ByZS1iYWNrZW5kIGhhcmRjb2RlXG4gICAgICAgICAgICAvL3RoaXMucHJvcHMubm9kZSBpcyBub3QgdGhlIGN1cnJlbnQgbm9kZVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblByb2xpZmVyYXRlKHtyaWdodDogcmlnaHQsIHRvcDogdG9wfSwgdGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCwgMyk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJvbGlmZXJhdGVkOiAhdGhpcy5zdGF0ZS5wcm9saWZlcmF0ZWR9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbHJlYWR5IHByb2xpZmVyYXRlZCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXJEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlXCIgc3R5bGU9e3RoaXMuc3RhdGUuaW1hZ2VTdHlsZX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUuc3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmVkaXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBnbHlwaGljb24gZ2x5cGhpY29uLXBlbmNpbFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIGdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvbGlmZXJhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cIi8+ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyRm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIiBzdHlsZT17dGhpcy5zdHlsZX0+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHJlZj1cIm5ld1RleHRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuY2hpbGRyZW59IFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNhdmV9IGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBidG4tc20gZ2x5cGhpY29uIGdseXBoaWNvbi1mbG9wcHktZGlza1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRpc3BsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iLCJ2YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG52YXIgU2xhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvdW50OiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHNbcHJvcE5hbWVdICE9PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdUaGUgY291bnQgcHJvcGVydHkgbXVzdCBiZSBhIG51bWJlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJDcmVhdGluZyBcIiArIHByb3BzW3Byb3BOYW1lXSArIFwiIG5vZGVzIGlzIHJpZGljdWxvdXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub2RlczogW10sXG4gICAgICAgICAgICAvL2hhcmRjb2RlIHVudGlsIGJhY2tlbmQgY2FuIGJlIGhvb2tlZCB1cFxuICAgICAgICAgICAgaW1hZ2VzOiBbXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9vbnRoZXJlYWxueS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDEvd2FzaGluZ3Rvbl9hcmNoXzE4OTkuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9iL2JlL05ZQ18tX1dhc2hpbmd0b25fU3F1YXJlX1BhcmsuSlBHJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3N0YXRpYzAxLm55dC5jb20vaW1hZ2VzLzIwMDkvMDgvMDUvYm9va3MvZ2FybmVyLTYwMC5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2YvZjcvV2FzaGluZ3Rvbl9TcXVhcmVfUGFya19DaGVzc19QbGF5ZXJzX2J5X0RhdmlkX1NoYW5rYm9uZS5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL3RodW1iL2IvYjgvV2FzaGluZ3Rvbl9TcXVhcmVfbm9ydGhlYXN0X2VudHJhbmNlLmpwZy8zMjVweC1XYXNoaW5ndG9uX1NxdWFyZV9ub3J0aGVhc3RfZW50cmFuY2UuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL29udGhlc2V0b2ZuZXd5b3JrLmNvbS9sb2NhdGlvbnMvaWFtbGVnZW5kL2lhbWxlZ2VuZDA0LmpwZycsXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hZGQgcGFyYWxsYXggdGFuZ2wgbG9nb1xuICAgICAgICAkKHRoaXMuZ2V0RE9NTm9kZSgpKS5kcmFnZ2FibGUoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAkKFwiI3NsYXRlXCIpLmhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gJChcIiNzbGF0ZVwiKS53aWR0aCgpO1xuICAgIH0sXG4gICAgbmV4dElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHRoaXMudW5pcXVlSWQgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlSWQrKztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24odGV4dCwgbG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBpZihub2RlID09IG51bGwgJiYgcGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy53aWR0aCAvIDIgKyAzMDAgKiBNYXRoLnNpbigoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuaGVpZ2h0IC8gMiArIDMwMCAqIE1hdGguY29zKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbG9jYXRpb24ucmlnaHQ7XG4gICAgICAgICAgICB2YXIgdG9wID0gbG9jYXRpb24udG9wO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmlnaHQgKyAnICcgKyB0b3ApO1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogcmlnaHQgKyAzMDAgKiBNYXRoLnNpbigoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArIDMwMCAqIE1hdGguY29zKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZGlzcGxhY2U6IGZ1bmN0aW9uKG5vZGUsIHBhcmVudCkge1xuICAgICAgICB2YXIgcmVmZXJlbmNlID0ge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICByaWdodDogbm9kZS5zdHlsZS5yaWdodCxcbiAgICAgICAgICAgICAgICB0b3A6IG5vZGUuc3R5bGUudG9wIC0gMTAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuZ2xlID0gdGhpcy5maW5kQW5nbGUocGFyZW50LCBub2RlLCByZWZlcmVuY2UpO1xuICAgICAgICB2YXIgZGlzcGxhY2VtZW50ID0ge1xuICAgICAgICAgICAgeTogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICAgICAgeDogTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpc3BsYWNlbWVudDtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbihsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgLy9wcm9saWZlcmF0ZSBuZWVkcyB0byB0YWtlIGluIGEgbnVtYmVyIHBhcmFtZXRlciBsYXRlciB3aGVuIGhvb2tpbmcgdG8gdGhlIGJhY2tlbmRcbiAgICAgICAgdGhpcy5hZGQoJ25vZGUnLCBsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpO1xuICAgIH0sXG4gICAgZmluZEFuZ2xlKHAwLHAxLHAyKSB7XG4gICAgICAgIHZhciBhID0gTWF0aC5wb3cocDEuc3R5bGUucmlnaHQtcDAuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMS5zdHlsZS50b3AtcDAuc3R5bGUudG9wLDIpLFxuICAgICAgICBiID0gTWF0aC5wb3cocDEuc3R5bGUucmlnaHQtcDIuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMS5zdHlsZS50b3AtcDIuc3R5bGUudG9wLDIpLFxuICAgICAgICBjID0gTWF0aC5wb3cocDIuc3R5bGUucmlnaHQtcDAuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMi5zdHlsZS50b3AtcDAuc3R5bGUudG9wLDIpO1xuICAgICAgICBpZihwMS5zdHlsZS5yaWdodCA8IHAwLnN0eWxlLnJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gMiAqIE1hdGguUEkgLSBNYXRoLmFjb3MoKGErYi1jKSAvIE1hdGguc3FydCg0ICogYSAqIGIpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFjb3MoKGEgKyBiIC0gYykgLyBNYXRoLnNxcnQoNCAqIGEgKiBiKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3VGV4dCwgaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyW2ldLnRleHQgPSBuZXdUZXh0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczphcnJ9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZWFjaE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Tm9kZSBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGV9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgb25Qcm9saWZlcmF0ZT17dGhpcy5wcm9saWZlcmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUubm9kZXNbaV0uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIG5vZGU9e3RoaXMuc3RhdGUubm9kZXNbaV19XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudD17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5wYXJlbnR9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlPXt0aGlzLnN0YXRlLmltYWdlc1tpICUgNl19XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudD17dGhpcy5kaXNwbGFjZX1cbiAgICAgICAgICAgICAgICA+e25vZGUudGV4dH08L05vZGU+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xhdGVcIiBpZD1cInNsYXRlXCI+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubm9kZXMubWFwKHRoaXMuZWFjaE5vZGUpfVxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmFkZC5iaW5kKG51bGwsIFwibm9kZVwiLCBudWxsLCBudWxsLCBudWxsLCAxKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbGF0ZTsiXX0=

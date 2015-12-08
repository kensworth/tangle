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
        }
    },
    componentWillMount: function() {
        this.style = {
            right: this.props.style.right + 'px',
            top: this.props.style.top + 'px',
        };
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
            this.props.onProliferate(this.props.node, this.state.parent, 5); //test number before hooking into backend
            this.setState({ proliferated: !this.state.proliferated});
        }
        else {
            console.log('already proliferated');
        }
    },
    renderDisplay: function() {
        return (
            React.createElement("div", {className: "node", 
                style: this.style}, 
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
            nodes: []
        };
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
        console.log(document.getElementsByClassName("slate").style.width);
        console.log(document.getElementsByClassName("slate").style.height);
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
                    //document.getElementsByClassName("mystyle").style.height
                    right: document.getElementsByClassName("slate").style.width / 2,
                    top: document.getElementsByClassName("slate").style.height / 2,
                    //right: window.innerWidth / 2,
                    //top: window.innerHeight / 2,
                    //right: window.outerWidth / 2,
                    //top: window.outerHeight / 2,
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
            var reference = {
                style: {
                    right: node.style.right,
                    top: node.style.top - 10,
                }
            }
            var angle = this.findAngle(parent, node, reference);
            console.log(angle * 57.29);
            /*for(i = 0; i < number; i++) {
                arr.push({
                    id: this.nextId(),
                    text: text,
                    style: {
                        right: 0,
                        top: 0,
                    },
                    parent: node
                });
            }*/
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
    findAngle(p0,p1,p2) {
        var a = Math.pow(p1.style.right-p0.style.right,2) + Math.pow(p1.style.top-p0.style.top,2),
        b = Math.pow(p1.style.right-p2.style.right,2) + Math.pow(p1.style.top-p2.style.top,2),
        c = Math.pow(p2.style.right-p0.style.right,2) + Math.pow(p2.style.top-p0.style.top,2);
        if(p1.style.right < p0.style.right) {
            return 2 * Math.PI - Math.acos((a+b-c) / Math.sqrt(4*a*b));
        }
        else {
            return Math.acos((a+b-c) / Math.sqrt(4*a*b));
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
                    parent: this.state.nodes[i].parent
                }, node.text)
            );
    },
    render: function() {
        return (React.createElement("div", {className: "slate"}, 
                    this.state.nodes.map(this.eachNode), 
                    React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", 
                            onClick: this.add.bind(null, "node", null, null, 1)})
            )

        );
    }
});

module.exports = Slate;

},{"./node":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js"}]},{},["/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7S0FDSjtJQUNELGtCQUFrQixFQUFFLFdBQVc7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTtZQUNwQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUk7U0FDbkMsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsaUJBQWlCLEVBQUUsVUFBVTtRQUN6QixDQUFDLENBQUMsSUFBSSxD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Y2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgU2xhdGUgPSByZXF1aXJlKCcuL3NsYXRlJyk7XG5cblJlYWN0LnJlbmRlcig8U2xhdGUgY291bnQ9ezEwfS8+LCBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyIsInZhciBOb2RlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHByb2xpZmVyYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGFyZW50OiB0aGlzLnByb3BzLnBhcmVudH0pO1xuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcy5nZXRET01Ob2RlKCkpLmRyYWdnYWJsZSgpO1xuICAgIH0sXG4gICAgZWRpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IHRydWV9KTtcbiAgICB9LFxuICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucmVmcy5uZXdUZXh0LmdldERPTU5vZGUoKS52YWx1ZSwgdGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IGZhbHNlfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uUmVtb3ZlKHRoaXMucHJvcHMuaW5kZXgpO1xuICAgIH0sXG4gICAgcHJvbGlmZXJhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighdGhpcy5zdGF0ZS5wcm9saWZlcmF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Qcm9saWZlcmF0ZSh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50LCA1KTsgLy90ZXN0IG51bWJlciBiZWZvcmUgaG9va2luZyBpbnRvIGJhY2tlbmRcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcm9saWZlcmF0ZWQ6ICF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FscmVhZHkgcHJvbGlmZXJhdGVkJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlckRpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdHlsZX0+XG4gICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9wPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuZWRpdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgZ2x5cGhpY29uIGdseXBoaWNvbi1wZW5jaWxcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb2xpZmVyYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cIi8+ICAgICAgICBcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgfSxcbiAgICByZW5kZXJGb3JtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZVwiIHN0eWxlPXt0aGlzLnN0eWxlfT5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSByZWY9XCJuZXdUZXh0XCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmNoaWxkcmVufSBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2F2ZX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbSBnbHlwaGljb24gZ2x5cGhpY29uLWZsb3BweS1kaXNrXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZWRpdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRGlzcGxheSgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcblxudmFyIFNsYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb3VudDogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BzW3Byb3BOYW1lXSAhPT0gXCJudW1iZXJcIil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignVGhlIGNvdW50IHByb3BlcnR5IG11c3QgYmUgYSBudW1iZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPiAxMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiQ3JlYXRpbmcgXCIgKyBwcm9wc1twcm9wTmFtZV0gKyBcIiBub2RlcyBpcyByaWRpY3Vsb3VzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9kZXM6IFtdXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuZHJhZ2dhYmxlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGF0ZVwiKS5zdHlsZS53aWR0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGF0ZVwiKS5zdHlsZS5oZWlnaHQpO1xuICAgIH0sXG4gICAgbmV4dElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHRoaXMudW5pcXVlSWQgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlSWQrKztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24odGV4dCwgbm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGlmKG5vZGUgPT0gbnVsbCAmJiBwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vZGUgYW5kIHBhcmVudCBudWxsJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLm5leHRJZCgpLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgLy9kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibXlzdHlsZVwiKS5zdHlsZS5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGF0ZVwiKS5zdHlsZS53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsYXRlXCIpLnN0eWxlLmhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIC8vcmlnaHQ6IHdpbmRvdy5pbm5lcldpZHRoIC8gMixcbiAgICAgICAgICAgICAgICAgICAgLy90b3A6IHdpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIC8vcmlnaHQ6IHdpbmRvdy5vdXRlcldpZHRoIC8gMixcbiAgICAgICAgICAgICAgICAgICAgLy90b3A6IHdpbmRvdy5vdXRlckhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm9kZSBub3QgbnVsbCwgcGFyZW50IG51bGwnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogd2luZG93LmlubmVyV2lkdGggLyAyICsgMjUwICogTWF0aC5zaW4oKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyICsgMjUwICogTWF0aC5jb3MoKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdib3RoIG5vdCBudWxsJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuICAgICAgICAgICAgdmFyIHJlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogbm9kZS5zdHlsZS5yaWdodCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBub2RlLnN0eWxlLnRvcCAtIDEwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhbmdsZSA9IHRoaXMuZmluZEFuZ2xlKHBhcmVudCwgbm9kZSwgcmVmZXJlbmNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFuZ2xlICogNTcuMjkpO1xuICAgICAgICAgICAgLypmb3IoaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24obm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgLy9wcm9saWZlcmF0ZSBuZWVkcyB0byB0YWtlIGluIGEgbnVtYmVyIHBhcmFtZXRlciBsYXRlciB3aGVuIGhvb2tpbmcgdG8gdGhlIGJhY2tlbmRcbiAgICAgICAgLy9ub2RlIG1hdGggbmVlZGVkXG4gICAgICAgIGNvbnNvbGUubG9nKCdub2RlOicpO1xuICAgICAgICBjb25zb2xlLmRpcihub2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3BhcmVudDonKTtcbiAgICAgICAgY29uc29sZS5kaXIocGFyZW50KTtcbiAgICAgICAgdGhpcy5hZGQoJ25vZGUnLCBub2RlLCBwYXJlbnQsIG51bWJlcik7XG4gICAgfSxcbiAgICBmaW5kQW5nbGUocDAscDEscDIpIHtcbiAgICAgICAgdmFyIGEgPSBNYXRoLnBvdyhwMS5zdHlsZS5yaWdodC1wMC5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAxLnN0eWxlLnRvcC1wMC5zdHlsZS50b3AsMiksXG4gICAgICAgIGIgPSBNYXRoLnBvdyhwMS5zdHlsZS5yaWdodC1wMi5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAxLnN0eWxlLnRvcC1wMi5zdHlsZS50b3AsMiksXG4gICAgICAgIGMgPSBNYXRoLnBvdyhwMi5zdHlsZS5yaWdodC1wMC5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAyLnN0eWxlLnRvcC1wMC5zdHlsZS50b3AsMik7XG4gICAgICAgIGlmKHAxLnN0eWxlLnJpZ2h0IDwgcDAuc3R5bGUucmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiAyICogTWF0aC5QSSAtIE1hdGguYWNvcygoYStiLWMpIC8gTWF0aC5zcXJ0KDQqYSpiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hY29zKChhK2ItYykgLyBNYXRoLnNxcnQoNCphKmIpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihuZXdUZXh0LCBpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnJbaV0udGV4dCA9IG5ld1RleHQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOmFycn0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBlYWNoTm9kZTogZnVuY3Rpb24obm9kZSwgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxOb2RlIGtleT17bm9kZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICBvblByb2xpZmVyYXRlPXt0aGlzLnByb2xpZmVyYXRlfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgbm9kZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXX1cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50PXt0aGlzLnN0YXRlLm5vZGVzW2ldLnBhcmVudH1cbiAgICAgICAgICAgICAgICA+e25vZGUudGV4dH08L05vZGU+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInNsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5vZGVzLm1hcCh0aGlzLmVhY2hOb2RlKX1cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5hZGQuYmluZChudWxsLCBcIm5vZGVcIiwgbnVsbCwgbnVsbCwgMSl9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2xhdGU7XG4iXX0=

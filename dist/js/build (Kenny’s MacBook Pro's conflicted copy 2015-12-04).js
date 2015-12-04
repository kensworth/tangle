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
            //right: this.props.style.right + 'px',
            //top: this.props.style.top + 'px',
            right: this.props.style.right + 'px',
            top: this.props.style.top + 'px',
            //dont worry about setState style because nodes won't move
        };
        //this.state.parent: FIGURE THIS PART OUT WHEN YOU GET BACK
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
            //methods
            //pass parent, if null, then generic center screen add
            this.props.onProliferate(this.props.node, this.state.parent, 5); //test number before hooking into backend
            this.setState({ proliferated: !this.state.proliferated});
            //endmethods
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
    eachNode: function(node, i) {
        return (
                React.createElement(Node, {key: node.id, 
                    index: i, 
                    onChange: this.update, 
                    onRemove: this.remove
                }, node.node)
            );
    },
    render: function() {
        return (React.createElement("div", {className: "slate"}, 
                    this.state.nodes.map(this.eachNode), 
                    React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", 
                            onClick: this.add.bind(null, "node")})
            )

        );
    }
});

module.exports = Slate;

},{"./node":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js"}]},{},["/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7S0FDSjtJQUNELGtCQUFrQixFQUFFLFdBQVc7QUFDbkMsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHO0FBQ3JCOztZQUVZLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTtBQUNoRCxZQUFZLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSTs7QUFFNUMsU0FBUyxDQUFDOztLQUVMO0lBQ0QsaUJBQWlCLEVBQUUsVUFBVTtBQUNqQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFekMsS0FBSzs7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QUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQztvQkFDckMsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxpREFBQSxFQUFpRDs0QkFDM0QsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBRSxDQUFFLENBQUE7QUFDbkUsWUFBa0IsQ0FBQTs7VUFFUjtLQUNMO0FBQ0wsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFNsYXRlID0gcmVxdWlyZSgnLi9zbGF0ZScpO1xuXG5SZWFjdC5yZW5kZXIoPFNsYXRlIGNvdW50PXsxMH0vPiwgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiLCJ2YXIgTm9kZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgICBwcm9saWZlcmF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgLy9yaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAvL3RvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICAvL2RvbnQgd29ycnkgYWJvdXQgc2V0U3RhdGUgc3R5bGUgYmVjYXVzZSBub2RlcyB3b24ndCBtb3ZlXG4gICAgICAgIH07XG4gICAgICAgIC8vdGhpcy5zdGF0ZS5wYXJlbnQ6IEZJR1VSRSBUSElTIFBBUlQgT1VUIFdIRU4gWU9VIEdFVCBCQUNLXG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuZHJhZ2dhYmxlKCk7XG5cbiAgICB9LFxuXG4gICAgZWRpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IHRydWV9KTtcbiAgICB9LFxuICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucmVmcy5uZXdUZXh0LmdldERPTU5vZGUoKS52YWx1ZSwgdGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IGZhbHNlfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uUmVtb3ZlKHRoaXMucHJvcHMuaW5kZXgpO1xuICAgIH0sXG4gICAgcHJvbGlmZXJhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighdGhpcy5zdGF0ZS5wcm9saWZlcmF0ZWQpIHtcbiAgICAgICAgICAgIC8vbWV0aG9kc1xuICAgICAgICAgICAgLy9wYXNzIHBhcmVudCwgaWYgbnVsbCwgdGhlbiBnZW5lcmljIGNlbnRlciBzY3JlZW4gYWRkXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUHJvbGlmZXJhdGUodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCwgNSk7IC8vdGVzdCBudW1iZXIgYmVmb3JlIGhvb2tpbmcgaW50byBiYWNrZW5kXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJvbGlmZXJhdGVkOiAhdGhpcy5zdGF0ZS5wcm9saWZlcmF0ZWR9KTtcbiAgICAgICAgICAgIC8vZW5kbWV0aG9kc1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FscmVhZHkgcHJvbGlmZXJhdGVkJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlckRpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdHlsZX0+XG4gICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9wPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuZWRpdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgZ2x5cGhpY29uIGdseXBoaWNvbi1wZW5jaWxcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb2xpZmVyYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cIi8+ICAgICAgICBcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgfSxcbiAgICByZW5kZXJGb3JtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZVwiIHN0eWxlPXt0aGlzLnN0eWxlfT5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSByZWY9XCJuZXdUZXh0XCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmNoaWxkcmVufSBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2F2ZX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbSBnbHlwaGljb24gZ2x5cGhpY29uLWZsb3BweS1kaXNrXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZWRpdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRGlzcGxheSgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcblxudmFyIFNsYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb3VudDogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BzW3Byb3BOYW1lXSAhPT0gXCJudW1iZXJcIil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignVGhlIGNvdW50IHByb3BlcnR5IG11c3QgYmUgYSBudW1iZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPiAxMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiQ3JlYXRpbmcgXCIgKyBwcm9wc1twcm9wTmFtZV0gKyBcIiBub2RlcyBpcyByaWRpY3Vsb3VzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9kZXM6IFtdXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXh0SWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnVuaXF1ZUlkID0gdGhpcy51bmlxdWVJZCB8fCAwO1xuICAgICAgICByZXR1cm4gdGhpcy51bmlxdWVJZCsrO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgIG5vZGU6IHRleHRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOiBhcnJ9KTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3VGV4dCwgaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyW2ldLm5vZGUgPSBuZXdUZXh0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczphcnJ9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZWFjaE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Tm9kZSBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGV9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICA+e25vZGUubm9kZX08L05vZGU+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInNsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5vZGVzLm1hcCh0aGlzLmVhY2hOb2RlKX1cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5hZGQuYmluZChudWxsLCBcIm5vZGVcIil9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2xhdGU7XG4iXX0=

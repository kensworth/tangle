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
            //right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            //top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            //transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
            right: this.props.style.right + 'px',
            top: this.props.style.top + 'px',
        };
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
    },
    randomBetween: function(min, max) {
        return (min + Math.ceil(Math.random() * max));
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
            console.log(this.props.index);
            console.log(this.props.style);
            this.props.onProliferate(this.props.index, this.style);
            this.setState({ proliferated: !this.state.proliferated});
        }
        else {
            console.log("already proliferated");
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
            //put in store
        };
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    add: function(text) {
        //method takes in nodes? or parent? someway to differentiate between first add and subsequent proliferates
        var arr = this.state.nodes;
        //if parent == null
        arr.push({
            id: this.nextId(),
            node: text,
            style: {
                right: 500,
                top: 500,
            },
        });
        this.setState({nodes: arr});
    },
    proliferate: function(index, style) {
        var responses = 2; //testing
        for(i = 0; i < responses; i++) {
            console.log("requested");
            this.add("node" + i);
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
                React.createElement(Node, {key: node.id, 
                    index: i, 
                    onChange: this.update, 
                    onRemove: this.remove, 
                    onProliferate: this.proliferate, 
                    style: this.state.nodes[i].style
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7S0FDSjtJQUNELGtCQUFrQixFQUFFLFdBQVc7QUFDbkMsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHO0FBQ3JCO0FBQ0E7O1lBRVksS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJO1lBQ3BDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSTtTQUNuQyxDQUFDO0tBQ0w7SUFDRCxpQkFBaUIsRUFBRSxVQUFVO1FBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNwQztJQUNELGFBQWEsRUFBRSxTQUFT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LEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgU2xhdGUgPSByZXF1aXJlKCcuL3NsYXRlJyk7XG5cblJlYWN0LnJlbmRlcig8U2xhdGUgY291bnQ9ezEwfS8+LCBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyIsInZhciBOb2RlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHByb2xpZmVyYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAvL3JpZ2h0OiB0aGlzLnJhbmRvbUJldHdlZW4oMCwgd2luZG93LmlubmVyV2lkdGggLSAxNTApICsgJ3B4JyxcbiAgICAgICAgICAgIC8vdG9wOiB0aGlzLnJhbmRvbUJldHdlZW4oMCwgd2luZG93LmlubmVySGVpZ2h0IC0gMTUwKSArICdweCcsXG4gICAgICAgICAgICAvL3RyYW5zZm9ybTogJ3JvdGF0ZSgnICsgdGhpcy5yYW5kb21CZXR3ZWVuKC0xNSwgMTUpICsgJ2RlZyknXG4gICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMuZ2V0RE9NTm9kZSgpKS5kcmFnZ2FibGUoKTtcbiAgICB9LFxuICAgIHJhbmRvbUJldHdlZW46IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiAobWluICsgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBtYXgpKTtcbiAgICB9LFxuICAgIGVkaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiB0cnVlfSk7XG4gICAgfSxcbiAgICBzYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnJlZnMubmV3VGV4dC5nZXRET01Ob2RlKCkudmFsdWUsIHRoaXMucHJvcHMuaW5kZXgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBmYWxzZX0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLmluZGV4KTtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuc3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblByb2xpZmVyYXRlKHRoaXMucHJvcHMuaW5kZXgsIHRoaXMuc3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2xpZmVyYXRlZDogIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgcHJvbGlmZXJhdGVkXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXJEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3R5bGV9PlxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvcD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmVkaXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGdseXBoaWNvbiBnbHlwaGljb24tcGVuY2lsXCIvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIGdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5wcm9saWZlcmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIvPiAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyRm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIiBzdHlsZT17dGhpcy5zdHlsZX0+XG4gICAgICAgICAgICA8dGV4dGFyZWEgcmVmPVwibmV3VGV4dFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNhdmV9IGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBidG4tc20gZ2x5cGhpY29uIGdseXBoaWNvbi1mbG9wcHktZGlza1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRpc3BsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsInZhciBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG5cbnZhciBTbGF0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY291bnQ6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wc1twcm9wTmFtZV0gIT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1RoZSBjb3VudCBwcm9wZXJ0eSBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkNyZWF0aW5nIFwiICsgcHJvcHNbcHJvcE5hbWVdICsgXCIgbm9kZXMgaXMgcmlkaWN1bG91c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVzOiBbXVxuICAgICAgICAgICAgLy9wdXQgaW4gc3RvcmVcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5leHRJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudW5pcXVlSWQgPSB0aGlzLnVuaXF1ZUlkIHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzLnVuaXF1ZUlkKys7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgLy9tZXRob2QgdGFrZXMgaW4gbm9kZXM/IG9yIHBhcmVudD8gc29tZXdheSB0byBkaWZmZXJlbnRpYXRlIGJldHdlZW4gZmlyc3QgYWRkIGFuZCBzdWJzZXF1ZW50IHByb2xpZmVyYXRlc1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgLy9pZiBwYXJlbnQgPT0gbnVsbFxuICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgIG5vZGU6IHRleHQsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgICAgdG9wOiA1MDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgcHJvbGlmZXJhdGU6IGZ1bmN0aW9uKGluZGV4LCBzdHlsZSkge1xuICAgICAgICB2YXIgcmVzcG9uc2VzID0gMjsgLy90ZXN0aW5nXG4gICAgICAgIGZvcihpID0gMDsgaSA8IHJlc3BvbnNlczsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3RlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuYWRkKFwibm9kZVwiICsgaSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3VGV4dCwgaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyW2ldLm5vZGUgPSBuZXdUZXh0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczphcnJ9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZWFjaE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Tm9kZSBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGV9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgb25Qcm9saWZlcmF0ZT17dGhpcy5wcm9saWZlcmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUubm9kZXNbaV0uc3R5bGV9XG4gICAgICAgICAgICAgICAgPntub2RlLm5vZGV9PC9Ob2RlPlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJzbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5ub2Rlcy5tYXAodGhpcy5lYWNoTm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuYWRkLmJpbmQobnVsbCwgXCJub2RlXCIpfS8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNsYXRlO1xuIl19

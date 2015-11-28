(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js":[function(require,module,exports){
var Slate = require('./slate');

React.render(React.createElement("slate", {count: 10}),
    document.getElementById('app'));

},{"./slate":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js"}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js":[function(require,module,exports){
var node = React.createClass({displayName: "node",
    getInitialState: function() {
        return {editing: false}
    },
    componentWillMount: function() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            //transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
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
    renderDisplay: function() {
        return (
            React.createElement("div", {className: "note", 
                style: this.style}, 
                React.createElement("p", null, this.props.children), 
                React.createElement("span", null, 
                    React.createElement("button", {onClick: this.edit, 
                            className: "btn btn-primary glyphicon glyphicon-pencil"}), 
                    React.createElement("button", {onClick: this.remove, 
                            className: "btn btn-danger glyphicon glyphicon-trash"})
                )
            )
            );
    },
    renderForm: function() {
        return (
            React.createElement("div", {className: "note", style: this.style}, 
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

module.exports = node;

},{}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js":[function(require,module,exports){
var node = require('./node');

var slate = React.createClass({displayName: "slate",
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
                React.createElement("node", {key: node.id, 
                    index: i, 
                    onChange: this.update, 
                    onRemove: this.remove
                }, node.node)
            );
    },
    proliferate: function() {
        this.add.bind(null, "node");
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

module.exports = slate;

},{"./node":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js"}]},{},["/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO0tBQzFCO0lBQ0Qsa0JBQWtCLEVBQUUsV0FBVztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSTtBQUN4RSxZQUFZLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUk7O1NBRTlELENBQUM7S0FDTDtJQUNELGlCQUFpQixFQUFFLFVBQVU7UUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3BDO0lBQ0QsYUFBYSxFQUFFLFNBQVMs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TyxHQUFHLEtBQUsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFNsYXRlID0gcmVxdWlyZSgnLi9zbGF0ZScpO1xuXG5SZWFjdC5yZW5kZXIoPHNsYXRlIGNvdW50PXsxMH0vPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyIsInZhciBub2RlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7ZWRpdGluZzogZmFsc2V9XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgcmlnaHQ6IHRoaXMucmFuZG9tQmV0d2VlbigwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIDE1MCkgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiB0aGlzLnJhbmRvbUJldHdlZW4oMCwgd2luZG93LmlubmVySGVpZ2h0IC0gMTUwKSArICdweCcsXG4gICAgICAgICAgICAvL3RyYW5zZm9ybTogJ3JvdGF0ZSgnICsgdGhpcy5yYW5kb21CZXR3ZWVuKC0xNSwgMTUpICsgJ2RlZyknXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuZHJhZ2dhYmxlKCk7XG4gICAgfSxcbiAgICByYW5kb21CZXR3ZWVuOiBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gKG1pbiArIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogbWF4KSk7XG4gICAgfSxcbiAgICBlZGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogdHJ1ZX0pO1xuICAgIH0sXG4gICAgc2F2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5yZWZzLm5ld1RleHQuZ2V0RE9NTm9kZSgpLnZhbHVlLCB0aGlzLnByb3BzLmluZGV4KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgfSxcbiAgICByZW5kZXJEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90ZVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3R5bGV9PlxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvcD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmVkaXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGdseXBoaWNvbiBnbHlwaGljb24tcGVuY2lsXCIvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIGdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIi8+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyRm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdGVcIiBzdHlsZT17dGhpcy5zdHlsZX0+XG4gICAgICAgICAgICA8dGV4dGFyZWEgcmVmPVwibmV3VGV4dFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNhdmV9IGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBidG4tc20gZ2x5cGhpY29uIGdseXBoaWNvbi1mbG9wcHktZGlza1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRpc3BsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vZGU7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsInZhciBub2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG5cbnZhciBzbGF0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY291bnQ6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wc1twcm9wTmFtZV0gIT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1RoZSBjb3VudCBwcm9wZXJ0eSBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkNyZWF0aW5nIFwiICsgcHJvcHNbcHJvcE5hbWVdICsgXCIgbm9kZXMgaXMgcmlkaWN1bG91c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVzOiBbXVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbmV4dElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHRoaXMudW5pcXVlSWQgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlSWQrKztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICBub2RlOiB0ZXh0XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG5ld1RleHQsIGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFycltpXS5ub2RlID0gbmV3VGV4dDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6YXJyfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOiBhcnJ9KTtcbiAgICB9LFxuICAgIGVhY2hOb2RlOiBmdW5jdGlvbihub2RlLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPG5vZGUga2V5PXtub2RlLmlkfVxuICAgICAgICAgICAgICAgICAgICBpbmRleD17aX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudXBkYXRlfVxuICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgPntub2RlLm5vZGV9PC9ub2RlPlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5hZGQuYmluZChudWxsLCBcIm5vZGVcIik7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwic2xhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubm9kZXMubWFwKHRoaXMuZWFjaE5vZGUpfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmFkZC5iaW5kKG51bGwsIFwibm9kZVwiKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzbGF0ZTsiXX0=

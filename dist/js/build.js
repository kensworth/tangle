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
        //if(this.)
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
            console.log("index " + this.props.index);
            console.log("parent: ");
            console.log("component style: " + this.style.right + " " + this.style.top);

            //methods
            //pass parent, if null, then generic center screen add
            this.props.onProliferate(this.style, this.props.node);
            this.setState({ proliferated: !this.state.proliferated});
            //endmethods
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
    add: function(text, location, parent) {
        //method takes in nodes? or parent? someway to differentiate between first add and subsequent proliferates
        var arr = this.state.nodes;
        //if parent == null
        if(location == null && parent == null) {
            arr.push({
                id: this.nextId(),
                node: text,
                style: {
                    right: window.innerWidth / 2,
                    top: window.innerHeight / 2,
                },
            });
        } 
        else {

        }
        this.setState({nodes: arr});
    },
    proliferate: function(location, parent) {
        var responses = 2; //testing
        //node math needed
        //if() 
            for(i = 0; i < responses; i++) {
                console.log("requested");
                this.add("node" + i, location, parent);
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
                    style: this.state.nodes[i].style, 
                    node: this.state.nodes[i]
                }, node.node)
            );
    },
    render: function() {
        return (React.createElement("div", {className: "slate"}, 
                    this.state.nodes.map(this.eachNode), 
                    React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", 
                            onClick: this.add.bind(null, "node", null, null)})
            )

        );
    }
});

module.exports = Slate;

},{"./node":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js"}]},{},["/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7S0FDSjtJQUNELGtCQUFrQixFQUFFLFdBQVc7QUFDbkMsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHO0FBQ3JCOztZQUVZLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTtBQUNoRCxZQUFZLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSTs7QUFFNUMsU0FBUyxDQUFDOztLQUVMO0lBQ0QsaUJBQWlCLEVBQUUsVUFBVTtBQUNqQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFekMsS0FBSzs7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Q0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDO29CQUNyQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGlEQUFBLEVBQWlEOzRCQUMzRCxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBRSxDQUFBO0FBQy9FLFlBQWtCLENBQUE7O1VBRVI7S0FDTDtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTbGF0ZSA9IHJlcXVpcmUoJy4vc2xhdGUnKTtcblxuUmVhY3QucmVuZGVyKDxTbGF0ZSBjb3VudD17MTB9Lz4sIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IiwidmFyIE5vZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcHJvbGlmZXJhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgIC8vcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgLy90b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgLy9kb250IHdvcnJ5IGFib3V0IHNldFN0YXRlIHN0eWxlIGJlY2F1c2Ugbm9kZXMgd29uJ3QgbW92ZVxuICAgICAgICB9O1xuICAgICAgICAvL2lmKHRoaXMuKVxuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcy5nZXRET01Ob2RlKCkpLmRyYWdnYWJsZSgpO1xuXG4gICAgfSxcblxuICAgIGVkaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiB0cnVlfSk7XG4gICAgfSxcbiAgICBzYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnJlZnMubmV3VGV4dC5nZXRET01Ob2RlKCkudmFsdWUsIHRoaXMucHJvcHMuaW5kZXgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBmYWxzZX0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLmluZGV4KTtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluZGV4IFwiICsgdGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcmVudDogXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wb25lbnQgc3R5bGU6IFwiICsgdGhpcy5zdHlsZS5yaWdodCArIFwiIFwiICsgdGhpcy5zdHlsZS50b3ApO1xuXG4gICAgICAgICAgICAvL21ldGhvZHNcbiAgICAgICAgICAgIC8vcGFzcyBwYXJlbnQsIGlmIG51bGwsIHRoZW4gZ2VuZXJpYyBjZW50ZXIgc2NyZWVuIGFkZFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblByb2xpZmVyYXRlKHRoaXMuc3R5bGUsIHRoaXMucHJvcHMubm9kZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJvbGlmZXJhdGVkOiAhdGhpcy5zdGF0ZS5wcm9saWZlcmF0ZWR9KTtcbiAgICAgICAgICAgIC8vZW5kbWV0aG9kc1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IHByb2xpZmVyYXRlZFwiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0eWxlfT5cbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3A+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5lZGl0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBnbHlwaGljb24gZ2x5cGhpY29uLXBlbmNpbFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCIvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvbGlmZXJhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tem9vbS1pblwiLz4gICAgICAgIFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlckZvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlXCIgc3R5bGU9e3RoaXMuc3R5bGV9PlxuICAgICAgICAgICAgPHRleHRhcmVhIHJlZj1cIm5ld1RleHRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuY2hpbGRyZW59IFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zYXZlfSBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtIGdseXBoaWNvbiBnbHlwaGljb24tZmxvcHB5LWRpc2tcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lZGl0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEaXNwbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCJ2YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG52YXIgU2xhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvdW50OiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHNbcHJvcE5hbWVdICE9PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdUaGUgY291bnQgcHJvcGVydHkgbXVzdCBiZSBhIG51bWJlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJDcmVhdGluZyBcIiArIHByb3BzW3Byb3BOYW1lXSArIFwiIG5vZGVzIGlzIHJpZGljdWxvdXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub2RlczogW11cbiAgICAgICAgICAgIC8vcHV0IGluIHN0b3JlXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXh0SWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnVuaXF1ZUlkID0gdGhpcy51bmlxdWVJZCB8fCAwO1xuICAgICAgICByZXR1cm4gdGhpcy51bmlxdWVJZCsrO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbih0ZXh0LCBsb2NhdGlvbiwgcGFyZW50KSB7XG4gICAgICAgIC8vbWV0aG9kIHRha2VzIGluIG5vZGVzPyBvciBwYXJlbnQ/IHNvbWV3YXkgdG8gZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIGZpcnN0IGFkZCBhbmQgc3Vic2VxdWVudCBwcm9saWZlcmF0ZXNcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIC8vaWYgcGFyZW50ID09IG51bGxcbiAgICAgICAgaWYobG9jYXRpb24gPT0gbnVsbCAmJiBwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLm5leHRJZCgpLFxuICAgICAgICAgICAgICAgIG5vZGU6IHRleHQsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHdpbmRvdy5pbm5lcldpZHRoIC8gMixcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24obG9jYXRpb24sIHBhcmVudCkge1xuICAgICAgICB2YXIgcmVzcG9uc2VzID0gMjsgLy90ZXN0aW5nXG4gICAgICAgIC8vbm9kZSBtYXRoIG5lZWRlZFxuICAgICAgICAvL2lmKCkgXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCByZXNwb25zZXM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVxdWVzdGVkXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKFwibm9kZVwiICsgaSwgbG9jYXRpb24sIHBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG5ld1RleHQsIGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFycltpXS5ub2RlID0gbmV3VGV4dDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6YXJyfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOiBhcnJ9KTtcbiAgICB9LFxuICAgIGVhY2hOb2RlOiBmdW5jdGlvbihub2RlLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPE5vZGUga2V5PXtub2RlLmlkfVxuICAgICAgICAgICAgICAgICAgICBpbmRleD17aX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudXBkYXRlfVxuICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJvbGlmZXJhdGU9e3RoaXMucHJvbGlmZXJhdGV9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0YXRlLm5vZGVzW2ldLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICBub2RlPXt0aGlzLnN0YXRlLm5vZGVzW2ldfVxuICAgICAgICAgICAgICAgID57bm9kZS5ub2RlfTwvTm9kZT5cbiAgICAgICAgICAgICk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwic2xhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubm9kZXMubWFwKHRoaXMuZWFjaE5vZGUpfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmFkZC5iaW5kKG51bGwsIFwibm9kZVwiLCBudWxsLCBudWxsKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbGF0ZTtcbiJdfQ==

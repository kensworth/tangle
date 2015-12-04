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
    add: function(text, node, parent, number) {
        var arr = this.state.nodes;
        if(node == null && parent == null) {
            console.log('node and parent null');
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
            for(i = 0; i < number; i++) {
                arr.push({
                    id: this.nextId(),
                    text: text,
                    style: {
                        right: window.innerWidth / 2 + 100 * Math.sin((i / number) * Math.PI),
                        top: window.innerHeight / 2 + 100 * Math.sin((i / number) * Math.PI),
                    },
                });
            }
        }
        else {
            console.log('both not null');
        }
        this.setState({nodes: arr});
    },
    proliferate: function(node, parent, number) {
        //proliferate needs to take in a number parameter later when hooking to the backend
        var responses = 2; //testing
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
                React.createElement(Node, {key: node.id, 
                    index: i, 
                    onChange: this.update, 
                    onRemove: this.remove, 
                    onProliferate: this.proliferate, 
                    style: this.state.nodes[i].style, 
                    node: this.state.nodes[i]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7S0FDSjtJQUNELGtCQUFrQixFQUFFLFdBQVc7QUFDbkMsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHO0FBQ3JCOztZQUVZLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTtBQUNoRCxZQUFZLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSTs7QUFFNUMsU0FBUyxDQUFDOztLQUVMO0lBQ0QsaUJBQWlCLEVBQUUsVUFBVTtBQUNqQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFekMsS0FBSzs7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QyxFQUFDO29CQUNULFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxNQUFNLEVBQUM7b0JBQ3RCLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxNQUFNLEVBQUM7b0JBQ3RCLGFBQUEsRUFBYSxDQUFFLElBQUksQ0FBQyxXQUFXLEVBQUM7b0JBQ2hDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQztvQkFDakMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFFO2dCQUM3QixDQUFBLEVBQUMsSUFBSSxDQUFDLElBQVksQ0FBQTtjQUNyQjtLQUNUO0lBQ0QsTUFBTSxFQUFFLFdBQVc7UUFDZixRQUFRLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsT0FBUSxDQUFBLEVBQUE7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUM7b0JBQ3JDLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsaURBQUEsRUFBaUQ7NEJBQzNELE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFBO0FBQ2xGLFlBQWtCLENBQUE7O1VBRVI7S0FDTDtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTbGF0ZSA9IHJlcXVpcmUoJy4vc2xhdGUnKTtcblxuUmVhY3QucmVuZGVyKDxTbGF0ZSBjb3VudD17MTB9Lz4sIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IiwidmFyIE5vZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcHJvbGlmZXJhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgIC8vcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgLy90b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgLy9kb250IHdvcnJ5IGFib3V0IHNldFN0YXRlIHN0eWxlIGJlY2F1c2Ugbm9kZXMgd29uJ3QgbW92ZVxuICAgICAgICB9O1xuICAgICAgICAvL3RoaXMuc3RhdGUucGFyZW50OiBGSUdVUkUgVEhJUyBQQVJUIE9VVCBXSEVOIFlPVSBHRVQgQkFDS1xuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcy5nZXRET01Ob2RlKCkpLmRyYWdnYWJsZSgpO1xuXG4gICAgfSxcblxuICAgIGVkaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiB0cnVlfSk7XG4gICAgfSxcbiAgICBzYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnJlZnMubmV3VGV4dC5nZXRET01Ob2RlKCkudmFsdWUsIHRoaXMucHJvcHMuaW5kZXgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBmYWxzZX0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLmluZGV4KTtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkKSB7XG4gICAgICAgICAgICAvL21ldGhvZHNcbiAgICAgICAgICAgIC8vcGFzcyBwYXJlbnQsIGlmIG51bGwsIHRoZW4gZ2VuZXJpYyBjZW50ZXIgc2NyZWVuIGFkZFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblByb2xpZmVyYXRlKHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQsIDUpOyAvL3Rlc3QgbnVtYmVyIGJlZm9yZSBob29raW5nIGludG8gYmFja2VuZFxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2xpZmVyYXRlZDogIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkfSk7XG4gICAgICAgICAgICAvL2VuZG1ldGhvZHNcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbHJlYWR5IHByb2xpZmVyYXRlZCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXJEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3R5bGV9PlxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvcD5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmVkaXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGdseXBoaWNvbiBnbHlwaGljb24tcGVuY2lsXCIvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIGdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5wcm9saWZlcmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIvPiAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyRm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIiBzdHlsZT17dGhpcy5zdHlsZX0+XG4gICAgICAgICAgICA8dGV4dGFyZWEgcmVmPVwibmV3VGV4dFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5jaGlsZHJlbn0gXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNhdmV9IGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBidG4tc20gZ2x5cGhpY29uIGdseXBoaWNvbi1mbG9wcHktZGlza1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRpc3BsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsInZhciBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG5cbnZhciBTbGF0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY291bnQ6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wc1twcm9wTmFtZV0gIT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1RoZSBjb3VudCBwcm9wZXJ0eSBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkNyZWF0aW5nIFwiICsgcHJvcHNbcHJvcE5hbWVdICsgXCIgbm9kZXMgaXMgcmlkaWN1bG91c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVzOiBbXVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbmV4dElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHRoaXMudW5pcXVlSWQgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlSWQrKztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24odGV4dCwgbm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGlmKG5vZGUgPT0gbnVsbCAmJiBwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vZGUgYW5kIHBhcmVudCBudWxsJyk7XG4gICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogd2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHdpbmRvdy5pbm5lckhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm9kZSBub3QgbnVsbCwgcGFyZW50IG51bGwnKTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgKyAxMDAgKiBNYXRoLnNpbigoaSAvIG51bWJlcikgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93LmlubmVySGVpZ2h0IC8gMiArIDEwMCAqIE1hdGguc2luKChpIC8gbnVtYmVyKSAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2JvdGggbm90IG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24obm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgLy9wcm9saWZlcmF0ZSBuZWVkcyB0byB0YWtlIGluIGEgbnVtYmVyIHBhcmFtZXRlciBsYXRlciB3aGVuIGhvb2tpbmcgdG8gdGhlIGJhY2tlbmRcbiAgICAgICAgdmFyIHJlc3BvbnNlcyA9IDI7IC8vdGVzdGluZ1xuICAgICAgICAvL25vZGUgbWF0aCBuZWVkZWRcbiAgICAgICAgY29uc29sZS5sb2coJ25vZGU6Jyk7XG4gICAgICAgIGNvbnNvbGUuZGlyKG5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZygncGFyZW50OicpO1xuICAgICAgICBjb25zb2xlLmRpcihwYXJlbnQpO1xuICAgICAgICB0aGlzLmFkZCgnbm9kZScsIG5vZGUsIHBhcmVudCwgbnVtYmVyKTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3VGV4dCwgaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyW2ldLnRleHQgPSBuZXdUZXh0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczphcnJ9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZWFjaE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Tm9kZSBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGV9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgb25Qcm9saWZlcmF0ZT17dGhpcy5wcm9saWZlcmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUubm9kZXNbaV0uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIG5vZGU9e3RoaXMuc3RhdGUubm9kZXNbaV19XG4gICAgICAgICAgICAgICAgPntub2RlLnRleHR9PC9Ob2RlPlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJzbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5ub2Rlcy5tYXAodGhpcy5lYWNoTm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuYWRkLmJpbmQobnVsbCwgXCJub2RlXCIsIG51bGwsIG51bGwsIDEpfS8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNsYXRlO1xuIl19

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSztZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7S0FDSjtJQUNELGtCQUFrQixFQUFFLFdBQVc7QUFDbkMsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHO0FBQ3JCOztZQUVZLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTtBQUNoRCxZQUFZLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSTs7U0FFbkMsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsaUJBQWlCLEVBQUUsVUFBVTtRQUN6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QUFBLENBQUMsU0FBQSxFQUFTLENBQUMsT0FBUSxDQUFBLEVBQUE7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUM7b0JBQ3JDLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsaURBQUEsRUFBaUQ7NEJBQzNELE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFBO0FBQ2xGLFlBQWtCLENBQUE7O1VBRVI7S0FDTDtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTbGF0ZSA9IHJlcXVpcmUoJy4vc2xhdGUnKTtcblxuUmVhY3QucmVuZGVyKDxTbGF0ZSBjb3VudD17MTB9Lz4sIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IiwidmFyIE5vZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcHJvbGlmZXJhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgIC8vcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgLy90b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgLy9kb250IHdvcnJ5IGFib3V0IHNldFN0YXRlIHN0eWxlIGJlY2F1c2Ugbm9kZXMgd29uJ3QgbW92ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYXJlbnQ6IHRoaXMucHJvcHMucGFyZW50fSk7XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuZHJhZ2dhYmxlKCk7XG4gICAgfSxcbiAgICBlZGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogdHJ1ZX0pO1xuICAgIH0sXG4gICAgc2F2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5yZWZzLm5ld1RleHQuZ2V0RE9NTm9kZSgpLnZhbHVlLCB0aGlzLnByb3BzLmluZGV4KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZCkge1xuICAgICAgICAgICAgLy9tZXRob2RzXG4gICAgICAgICAgICAvL3Bhc3MgcGFyZW50LCBpZiBudWxsLCB0aGVuIGdlbmVyaWMgY2VudGVyIHNjcmVlbiBhZGRcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Qcm9saWZlcmF0ZSh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50LCA1KTsgLy90ZXN0IG51bWJlciBiZWZvcmUgaG9va2luZyBpbnRvIGJhY2tlbmRcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcm9saWZlcmF0ZWQ6ICF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZH0pO1xuICAgICAgICAgICAgLy9lbmRtZXRob2RzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBwcm9saWZlcmF0ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0eWxlfT5cbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3A+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5lZGl0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBnbHlwaGljb24gZ2x5cGhpY29uLXBlbmNpbFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCIvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvbGlmZXJhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tem9vbS1pblwiLz4gICAgICAgIFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlckZvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlXCIgc3R5bGU9e3RoaXMuc3R5bGV9PlxuICAgICAgICAgICAgPHRleHRhcmVhIHJlZj1cIm5ld1RleHRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuY2hpbGRyZW59IFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5zYXZlfSBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtIGdseXBoaWNvbiBnbHlwaGljb24tZmxvcHB5LWRpc2tcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5lZGl0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEaXNwbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCJ2YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG52YXIgU2xhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvdW50OiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHNbcHJvcE5hbWVdICE9PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdUaGUgY291bnQgcHJvcGVydHkgbXVzdCBiZSBhIG51bWJlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJDcmVhdGluZyBcIiArIHByb3BzW3Byb3BOYW1lXSArIFwiIG5vZGVzIGlzIHJpZGljdWxvdXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub2RlczogW11cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5leHRJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudW5pcXVlSWQgPSB0aGlzLnVuaXF1ZUlkIHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzLnVuaXF1ZUlkKys7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKHRleHQsIG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBpZihub2RlID09IG51bGwgJiYgcGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub2RlIGFuZCBwYXJlbnQgbnVsbCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93LmlubmVySGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYocGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub2RlIG5vdCBudWxsLCBwYXJlbnQgbnVsbCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgKyAyNTAgKiBNYXRoLnNpbigoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgKyAyNTAgKiBNYXRoLmNvcygoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogbm9kZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2JvdGggbm90IG51bGwnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgcHJvbGlmZXJhdGU6IGZ1bmN0aW9uKG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIC8vcHJvbGlmZXJhdGUgbmVlZHMgdG8gdGFrZSBpbiBhIG51bWJlciBwYXJhbWV0ZXIgbGF0ZXIgd2hlbiBob29raW5nIHRvIHRoZSBiYWNrZW5kXG4gICAgICAgIC8vbm9kZSBtYXRoIG5lZWRlZFxuICAgICAgICBjb25zb2xlLmxvZygnbm9kZTonKTtcbiAgICAgICAgY29uc29sZS5kaXIobm9kZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXJlbnQ6Jyk7XG4gICAgICAgIGNvbnNvbGUuZGlyKHBhcmVudCk7XG4gICAgICAgIHRoaXMuYWRkKCdub2RlJywgbm9kZSwgcGFyZW50LCBudW1iZXIpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihuZXdUZXh0LCBpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnJbaV0udGV4dCA9IG5ld1RleHQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOmFycn0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBlYWNoTm9kZTogZnVuY3Rpb24obm9kZSwgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxOb2RlIGtleT17bm9kZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICBvblByb2xpZmVyYXRlPXt0aGlzLnByb2xpZmVyYXRlfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgbm9kZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXX1cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50PXt0aGlzLnN0YXRlLm5vZGVzW2ldLnBhcmVudH1cbiAgICAgICAgICAgICAgICA+e25vZGUudGV4dH08L05vZGU+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInNsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5vZGVzLm1hcCh0aGlzLmVhY2hOb2RlKX1cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5hZGQuYmluZChudWxsLCBcIm5vZGVcIiwgbnVsbCwgbnVsbCwgMSl9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2xhdGU7XG4iXX0=

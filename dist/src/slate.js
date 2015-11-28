var Board = React.createClass({displayName: "Board",
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " notes is ridiculous");
            }
        }
    },
    getInitialState: function() {
        return {
            notes: []
        };
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    add: function(text) {
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({notes: arr});
    },
    update: function(newText, i) {
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({notes:arr});
    },
    remove: function(i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({notes: arr});
    },
    eachNote: function(note, i) {
        return (
                React.createElement(Note, {key: note.id, 
                    index: i, 
                    onChange: this.update, 
                    onRemove: this.remove
                }, note.note)
            );
    },
    proliferate: function() {
        this.add.bind(null, "node");
    },
    render: function() {
        return (React.createElement("div", {className: "board"}, 
                    this.state.notes.map(this.eachNote), 
                    React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", 
                            onClick: this.add.bind(null, "node")})
            )

        );
    }
});


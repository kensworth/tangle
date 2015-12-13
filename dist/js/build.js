(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/inspector.js":[function(require,module,exports){
var Inspector = React.createClass({displayName: "Inspector",
	getInitialState: function() {
        return {
            
        }
    },
    render: function() {

    }
});

module.exports = Inspector;

},{}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js":[function(require,module,exports){
var Slate = require('./slate');

React.render(React.createElement(Slate, {count: 10}), 
    document.getElementById('app'));

},{"./slate":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js"}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js":[function(require,module,exports){
var Inspector = require('./inspector');

var Node = React.createClass({displayName: "Node",
    getInitialState: function() {
        return {
            proliferated: false,
            inspecting: false,
            parent: null,
            details: null,
            style: {
                height: 150 + 'px',
                width: 150 + 'px',
                right: this.props.style.right + 'px',
                top: this.props.style.top + 'px',
            },
            imageStyle: {
                height: 150 + 'px',
                width: 150 + 'px',
                right: this.props.style.right + 'px',
                top: this.props.style.top + 'px',
                backgroundImage: 'url(' + this.props.image + ')',
                backgroundSize: 'cover',
                opacity: '0.25',
            },
            inspectStyle: {
                right: this.props.style.right + 155 + 'px',
                top: this.props.style.top + 5 + 'px',
            }
        }
    },
    componentWillMount: function() {
        this.setState({parent: this.props.parent});
    },
    inspect: function() {
        this.setState({inspecting: !this.state.inspecting})
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
                var displacement = this.props.displacement(this.props.node, this.state.parent);
                var style = this.props.style;
                this.setState({
                    imageStyle: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: style.right - 15 + 300 * displacement.x + 'px',
                        top: style.top - 15 + 300 * displacement.y + 'px',
                        backgroundImage: 'url(' + this.props.image + ')',
                        backgroundSize: 'cover',
                        opacity: '0.5',
                    },
                    style: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: style.right - 15 + 300 * displacement.x + 'px',
                        top: style.top - 15 + 300 * displacement.y + 'px',
                    },
                    inspectStyle: {
                        right: style.right + 170 + 300 * displacement.x + 'px',
                        top: style.top + 5 + 300 * displacement.y + 'px',
                    },
                });
                //fired to proliferate before rerender
                right = this.props.style.right + 300 * this.props.displacement(this.props.node, this.state.parent).x;
                top = this.props.style.top + 300 * this.props.displacement(this.props.node, this.state.parent).y;

                $("#slate").animate({
                    //right: right + 'px',
                    //top: top + 'px',
                    left: '+=' + 600 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                    top: '-=' + 600 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
                }, 1000, function() {
                    // Animation complete.
                });

            }
            else {
                this.setState({
                    style: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: this.props.style.right - 15 + 'px',
                        top: this.props.style.top - 15 + 'px',
                    },
                    imageStyle: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: this.props.style.right - 15 + 'px',
                        top: this.props.style.top - 15 + 'px',
                        backgroundImage: 'url(' + this.props.image + ')',
                        backgroundSize: 'cover',
                        opacity: '0.65',
                    },
                    inspectStyle: {
                        right: this.props.style.right + 170 + 'px',
                        top: this.props.style.top + 5 + 'px',
                    },
                });
            }

            //pre-backend hardcode
            //when backend is hooked up, each JSON object returned will be stored in an array, the length of which is the amount of nodes to be created, the text inside which being the information to be contained within
            //this object will be inserted into proliferate, the function will be changed to accommodate for the dynamism
            this.props.onProliferate({right: right, top: top}, this.props.node, this.state.parent, 3);
            this.setState({ proliferated: !this.state.proliferated});
        }
        else {
            console.log('already proliferated');
        }
    },
    normalView: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "nodeImage", style: this.state.imageStyle}), 
                React.createElement("div", {className: "node", 
                    onDoubleClick: this.proliferate, 
                    style: this.state.style}, 
                    React.createElement("p", null, this.props.children), 
                    React.createElement("span", {style: this.state.buttonStyle}, 
                        React.createElement("button", {onClick: this.inspect, 
                                className: "btn btn-success glyphicon glyphicon-zoom-in"}), 
                        React.createElement("button", {onClick: this.remove, 
                                className: "btn btn-danger glyphicon glyphicon-trash"})
                    )
                )
            )
        );
    },
    inspectView: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", null, 
                    React.createElement("div", {className: "nodeImage", style: this.state.imageStyle}), 
                    React.createElement("div", {className: "node", 
                        onDoubleClick: this.proliferate, 
                        style: this.state.style}, 
                        React.createElement("p", null, this.props.children), 
                        React.createElement("span", {style: this.state.buttonStyle}, 
                            React.createElement("button", {onClick: this.inspect, 
                                    className: "btn btn-success glyphicon glyphicon-zoom-in"}), 
                            React.createElement("button", {onClick: this.remove, 
                                    className: "btn btn-danger glyphicon glyphicon-trash"})
                        )
                    )
                ), 
                React.createElement("div", {className: "inspect", style: this.state.inspectStyle}, 
                    React.createElement("p", null, this.props.details)
                )
            )
        );
    },
    render: function() {
        if(this.state.inspecting) {
            return this.inspectView();
        }
        else {
            return this.normalView();
        }
    }
});

module.exports = Node;

},{"./inspector":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/inspector.js"}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js":[function(require,module,exports){
var Node = require('./node');

var Slate = React.createClass({displayName: "Slate",
    getInitialState: function() {
        return {
            nodes: [],
            //hardcode until backend can be hooked up
            //NOT FINAL, ONLY FOR TESTING AND PURPOSES OF PRESENTATION
            text: [
                'Washington Square Park',
                'History',
                'Location',
                'Events',
                'Weather',
                'Performances',
                'Arch',
                'Chess',
                'Nature',
                'Fountain',
            ],
            details: [
                'Washington Square Park is a 9.75-acre public park in the New York City neighborhood of Greenwich Village, Manhattan. One of the best known of New York City\'s 1,900 public parks, it is a landmark as well as a meeting place and center for cultural activity. It is operated by the New York City Department of Parks and Recreation.',
                'Washington Square Park is named for George Washington (1732-1799), the commander of the Continental Army, who was inaugurated in New York City as the first President of the United States on April 30, 1789. ',
                'Washington Square Park is located directly on the intersection of 5th Avenue and West 4th Street, in the heart of Lower Manhattan',
                'Christmas Eve Caroling at the Washington Arch, Thursday, December 24, 2015 from 5:00 p.m. to 6:00 p.m.',
                'Washington Square Park is 56 degrees Farenheit today, with a brisk breeze and a 10% chance of showers',
                'Washington Square Park is home to many famous park performances. There are scores of musicians who play in the park, the most famous of whom is arguably Collin Huggins, also known as the "Crazy Piano Man"',
                'The Arch is likely the most recognizable feature of the park. The Arch is a marble triumphal arch built in 1892 in Washington Square Park in the Greenwich Village neighborhood of Lower Manhattan in New York City. It celebrates the centennial of George Washington\'s inauguration as President of the United States in 1789 and forms the grand southern terminus of Fifth Avenue.',
                'There are many chess players in the Park. They play in the lower west side of the complex, generally playing blitz chess (sub-5 minute variant) and there are some notable, extremely high-rated players that frequent the area',
                'At 9.75 acres, Washington Square Park is one of the largest green, open spaces in the Greenwich Village neighborhood.  While famous for the fountain and arch, the park has ecological assets that we feel should be highlighted more prominently. There are over 30 species of trees and similarly many variants of birds, squirrels, and even rats which inhabit the park',
                'The fountain in the center of Washington Square Park, called Tisch Fountain since 2005 onwards after a 2.5 million dollar donation from the Tisch Foundation, is the famous 15-meter wide fountain which in summer months spews clear, cool water from its many spouts',
            ],
            images: [
                'https://upload.wikimedia.org/wikipedia/commons/d/da/Washington_square_park.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/b/be/NYC_-_Washington_Square_Park.JPG',
                'http://static01.nyt.com/images/2009/08/05/books/garner-600.jpg',
                'http://onthesetofnewyork.com/locations/iamlegend/iamlegend04.jpg',
                'http://www.thefacebeauty.co.uk/blog/wp-content/uploads/2010/11/cold-weather.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Washington_Square_northeast_entrance.jpg/325px-Washington_Square_northeast_entrance.jpg',
                'http://ontherealny.com/wp-content/uploads/2013/01/washington_arch_1899.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/f/f7/Washington_Square_Park_Chess_Players_by_David_Shankbone.jpg',
                'http://www.gothamgazette.com/images/graphics/2014/03/Washington_Square_Park_2_nycgovparks_org.jpg',
                'http://graphics8.nytimes.com/images/2007/09/30/nyregion/wash600.jpg',
            ]
            //end of hardcode
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
    add: function(location, node, parent, number) {
        var arr = this.state.nodes;
        if(node == null && parent == null) {
            arr.push({
                id: this.nextId(),
                text: this.state.text[0],
                details: this.state.details[0],
                style: {
                    //75 is 1/2 node height and width
                    right: this.width / 2 - 75,
                    top: this.height / 2 - 75,
                },
            });
        } 
        else if(parent == null) {
            for(i = 1; i <= number; i++) {
                var id = this.nextId();
                arr.push({
                    id: id,
                    text: this.state.text[id % 10],
                    details: this.state.details[id % 10],
                    style: {
                        right: this.width / 2 + 300 * Math.sin((i / number) * 2 * Math.PI) - 75,
                        top: this.height / 2 + 300 * Math.cos((i / number) * 2 * Math.PI) - 75,
                    },
                    parent: node,
                });
            }
        }
        else {
            var right = location.right;
            var top = location.top;

            //images going normally, text and details skipping
            for(i = 1; i <= number; i++) {
                var id = this.nextId();
                arr.push({
                    id: id,
                    text: this.state.text[id % 10],
                    details: this.state.details[id % 10],
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
        this.add(location, node, parent, number);
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
                    details: this.state.nodes[i % 10].details, 
                    image: this.state.images[i % 10], 
                    displacement: this.displace
                }, node.text)
            );
    },
    render: function() {
        return (
            React.createElement("div", {className: "slate", id: "slate"}, 
                this.state.nodes.map(this.eachNode), 
                React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", 
                    onClick: this.add.bind(null, null, null, null, 1)})
            )

        );
    }
});

module.exports = Slate;

},{"./node":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js"}]},{},["/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL2luc3BlY3Rvci5qcyIsIi9Vc2Vycy9rZW5uZXRoemhhbmcvRHJvcGJveC9Db2RlL1NpdGVzL3JlYWN0LXdlYi9zcmMvanMvbWFpbi5qcyIsIi9Vc2Vycy9rZW5uZXRoemhhbmcvRHJvcGJveC9Db2RlL1NpdGVzL3JlYWN0LXdlYi9zcmMvanMvbm9kZS5qcyIsIi9Vc2Vycy9rZW5uZXRoemhhbmcvRHJvcGJveC9Db2RlL1NpdGVzL3JlYWN0LXdlYi9zcmMvanMvc2xhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLCtCQUErQix5QkFBQTtDQUNsQyxlQUFlLEVBQUUsV0FBVztBQUM3QixRQUFRLE9BQU87O1NBRU47S0FDSjtBQUNMLElBQUksTUFBTSxFQUFFLFdBQVc7O0tBRWxCO0FBQ0wsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTOzs7QUNYMUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFdkMsSUFBSSwwQkFBMEIsb0JBQUE7SUFDMUIsZUFBZSxFQUFFLFdBQVc7UUFDeEIsT0FBTztZQUNILFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUU7Z0JBQ0gsTUFB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LElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUM7Z0JBQ3JDLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsaURBQUEsRUFBaUQ7b0JBQy9ELE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFBO0FBQ3hFLFlBQWtCLENBQUE7O1VBRVI7S0FDTDtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgSW5zcGVjdG9yID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnNwZWN0b3I7IiwidmFyIFNsYXRlID0gcmVxdWlyZSgnLi9zbGF0ZScpO1xuXG5SZWFjdC5yZW5kZXIoPFNsYXRlIGNvdW50PXsxMH0vPiwgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiLCJ2YXIgSW5zcGVjdG9yID0gcmVxdWlyZSgnLi9pbnNwZWN0b3InKTtcblxudmFyIE5vZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2xpZmVyYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBpbnNwZWN0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIGRldGFpbHM6IG51bGwsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1hZ2VTdHlsZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjI1JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDE1NSArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArIDUgKyAncHgnLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYXJlbnQ6IHRoaXMucHJvcHMucGFyZW50fSk7XG4gICAgfSxcbiAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5zcGVjdGluZzogIXRoaXMuc3RhdGUuaW5zcGVjdGluZ30pXG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uUmVtb3ZlKHRoaXMucHJvcHMuaW5kZXgpO1xuICAgIH0sXG4gICAgcHJvbGlmZXJhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighdGhpcy5zdGF0ZS5wcm9saWZlcmF0ZWQpIHtcbiAgICAgICAgICAgIHZhciByaWdodCA9IG51bGw7XG4gICAgICAgICAgICB2YXIgdG9wID0gbnVsbDtcblxuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vZGlzcGxhY2UgMzAwIHB4IGF3YXkgZnJvbSB0aGUgbm9kZSBpbiB0aGUgYW5nbGUgZm9ybWVkIGJ5IHRoZSBub2RlIGFuZCBpdHMgcGFyZW50XG4gICAgICAgICAgICAgICAgdmFyIGRpc3BsYWNlbWVudCA9IHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpO1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IHRoaXMucHJvcHMuc3R5bGU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHN0eWxlLnJpZ2h0IC0gMTUgKyAzMDAgKiBkaXNwbGFjZW1lbnQueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlLnRvcCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMC41JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHN0eWxlLnJpZ2h0IC0gMTUgKyAzMDAgKiBkaXNwbGFjZW1lbnQueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlLnRvcCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZS5yaWdodCArIDE3MCArIDMwMCAqIGRpc3BsYWNlbWVudC54ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogc3R5bGUudG9wICsgNSArIDMwMCAqIGRpc3BsYWNlbWVudC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL2ZpcmVkIHRvIHByb2xpZmVyYXRlIGJlZm9yZSByZXJlbmRlclxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLng7XG4gICAgICAgICAgICAgICAgdG9wID0gdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55O1xuXG4gICAgICAgICAgICAgICAgJChcIiNzbGF0ZVwiKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgLy9yaWdodDogcmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAvL3RvcDogdG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJys9JyArIDYwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICctPScgKyA2MDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGNvbXBsZXRlLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0IC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNjUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTcwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyA1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9wcmUtYmFja2VuZCBoYXJkY29kZVxuICAgICAgICAgICAgLy93aGVuIGJhY2tlbmQgaXMgaG9va2VkIHVwLCBlYWNoIEpTT04gb2JqZWN0IHJldHVybmVkIHdpbGwgYmUgc3RvcmVkIGluIGFuIGFycmF5LCB0aGUgbGVuZ3RoIG9mIHdoaWNoIGlzIHRoZSBhbW91bnQgb2Ygbm9kZXMgdG8gYmUgY3JlYXRlZCwgdGhlIHRleHQgaW5zaWRlIHdoaWNoIGJlaW5nIHRoZSBpbmZvcm1hdGlvbiB0byBiZSBjb250YWluZWQgd2l0aGluXG4gICAgICAgICAgICAvL3RoaXMgb2JqZWN0IHdpbGwgYmUgaW5zZXJ0ZWQgaW50byBwcm9saWZlcmF0ZSwgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2hhbmdlZCB0byBhY2NvbW1vZGF0ZSBmb3IgdGhlIGR5bmFtaXNtXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUHJvbGlmZXJhdGUoe3JpZ2h0OiByaWdodCwgdG9wOiB0b3B9LCB0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50LCAzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcm9saWZlcmF0ZWQ6ICF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FscmVhZHkgcHJvbGlmZXJhdGVkJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5vcm1hbFZpZXc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVJbWFnZVwiIHN0eWxlPXt0aGlzLnN0YXRlLmltYWdlU3R5bGV9PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9e3RoaXMucHJvbGlmZXJhdGV9IFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5zdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3RoaXMuc3RhdGUuYnV0dG9uU3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmluc3BlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCIvPiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG4gICAgaW5zcGVjdFZpZXc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVJbWFnZVwiIHN0eWxlPXt0aGlzLnN0YXRlLmltYWdlU3R5bGV9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25Eb3VibGVDbGljaz17dGhpcy5wcm9saWZlcmF0ZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5zdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17dGhpcy5zdGF0ZS5idXR0b25TdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmluc3BlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCIvPiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zcGVjdFwiIHN0eWxlPXt0aGlzLnN0YXRlLmluc3BlY3RTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmRldGFpbHN9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLnN0YXRlLmluc3BlY3RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3BlY3RWaWV3KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxWaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlO1xuIiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcblxudmFyIFNsYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub2RlczogW10sXG4gICAgICAgICAgICAvL2hhcmRjb2RlIHVudGlsIGJhY2tlbmQgY2FuIGJlIGhvb2tlZCB1cFxuICAgICAgICAgICAgLy9OT1QgRklOQUwsIE9OTFkgRk9SIFRFU1RJTkcgQU5EIFBVUlBPU0VTIE9GIFBSRVNFTlRBVElPTlxuICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrJyxcbiAgICAgICAgICAgICAgICAnSGlzdG9yeScsXG4gICAgICAgICAgICAgICAgJ0xvY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnRXZlbnRzJyxcbiAgICAgICAgICAgICAgICAnV2VhdGhlcicsXG4gICAgICAgICAgICAgICAgJ1BlcmZvcm1hbmNlcycsXG4gICAgICAgICAgICAgICAgJ0FyY2gnLFxuICAgICAgICAgICAgICAgICdDaGVzcycsXG4gICAgICAgICAgICAgICAgJ05hdHVyZScsXG4gICAgICAgICAgICAgICAgJ0ZvdW50YWluJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgYSA5Ljc1LWFjcmUgcHVibGljIHBhcmsgaW4gdGhlIE5ldyBZb3JrIENpdHkgbmVpZ2hib3Job29kIG9mIEdyZWVud2ljaCBWaWxsYWdlLCBNYW5oYXR0YW4uIE9uZSBvZiB0aGUgYmVzdCBrbm93biBvZiBOZXcgWW9yayBDaXR5XFwncyAxLDkwMCBwdWJsaWMgcGFya3MsIGl0IGlzIGEgbGFuZG1hcmsgYXMgd2VsbCBhcyBhIG1lZXRpbmcgcGxhY2UgYW5kIGNlbnRlciBmb3IgY3VsdHVyYWwgYWN0aXZpdHkuIEl0IGlzIG9wZXJhdGVkIGJ5IHRoZSBOZXcgWW9yayBDaXR5IERlcGFydG1lbnQgb2YgUGFya3MgYW5kIFJlY3JlYXRpb24uJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBuYW1lZCBmb3IgR2VvcmdlIFdhc2hpbmd0b24gKDE3MzItMTc5OSksIHRoZSBjb21tYW5kZXIgb2YgdGhlIENvbnRpbmVudGFsIEFybXksIHdobyB3YXMgaW5hdWd1cmF0ZWQgaW4gTmV3IFlvcmsgQ2l0eSBhcyB0aGUgZmlyc3QgUHJlc2lkZW50IG9mIHRoZSBVbml0ZWQgU3RhdGVzIG9uIEFwcmlsIDMwLCAxNzg5LiAnLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIGxvY2F0ZWQgZGlyZWN0bHkgb24gdGhlIGludGVyc2VjdGlvbiBvZiA1dGggQXZlbnVlIGFuZCBXZXN0IDR0aCBTdHJlZXQsIGluIHRoZSBoZWFydCBvZiBMb3dlciBNYW5oYXR0YW4nLFxuICAgICAgICAgICAgICAgICdDaHJpc3RtYXMgRXZlIENhcm9saW5nIGF0IHRoZSBXYXNoaW5ndG9uIEFyY2gsIFRodXJzZGF5LCBEZWNlbWJlciAyNCwgMjAxNSBmcm9tIDU6MDAgcC5tLiB0byA2OjAwIHAubS4nLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIDU2IGRlZ3JlZXMgRmFyZW5oZWl0IHRvZGF5LCB3aXRoIGEgYnJpc2sgYnJlZXplIGFuZCBhIDEwJSBjaGFuY2Ugb2Ygc2hvd2VycycsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgaG9tZSB0byBtYW55IGZhbW91cyBwYXJrIHBlcmZvcm1hbmNlcy4gVGhlcmUgYXJlIHNjb3JlcyBvZiBtdXNpY2lhbnMgd2hvIHBsYXkgaW4gdGhlIHBhcmssIHRoZSBtb3N0IGZhbW91cyBvZiB3aG9tIGlzIGFyZ3VhYmx5IENvbGxpbiBIdWdnaW5zLCBhbHNvIGtub3duIGFzIHRoZSBcIkNyYXp5IFBpYW5vIE1hblwiJyxcbiAgICAgICAgICAgICAgICAnVGhlIEFyY2ggaXMgbGlrZWx5IHRoZSBtb3N0IHJlY29nbml6YWJsZSBmZWF0dXJlIG9mIHRoZSBwYXJrLiBUaGUgQXJjaCBpcyBhIG1hcmJsZSB0cml1bXBoYWwgYXJjaCBidWlsdCBpbiAxODkyIGluIFdhc2hpbmd0b24gU3F1YXJlIFBhcmsgaW4gdGhlIEdyZWVud2ljaCBWaWxsYWdlIG5laWdoYm9yaG9vZCBvZiBMb3dlciBNYW5oYXR0YW4gaW4gTmV3IFlvcmsgQ2l0eS4gSXQgY2VsZWJyYXRlcyB0aGUgY2VudGVubmlhbCBvZiBHZW9yZ2UgV2FzaGluZ3RvblxcJ3MgaW5hdWd1cmF0aW9uIGFzIFByZXNpZGVudCBvZiB0aGUgVW5pdGVkIFN0YXRlcyBpbiAxNzg5IGFuZCBmb3JtcyB0aGUgZ3JhbmQgc291dGhlcm4gdGVybWludXMgb2YgRmlmdGggQXZlbnVlLicsXG4gICAgICAgICAgICAgICAgJ1RoZXJlIGFyZSBtYW55IGNoZXNzIHBsYXllcnMgaW4gdGhlIFBhcmsuIFRoZXkgcGxheSBpbiB0aGUgbG93ZXIgd2VzdCBzaWRlIG9mIHRoZSBjb21wbGV4LCBnZW5lcmFsbHkgcGxheWluZyBibGl0eiBjaGVzcyAoc3ViLTUgbWludXRlIHZhcmlhbnQpIGFuZCB0aGVyZSBhcmUgc29tZSBub3RhYmxlLCBleHRyZW1lbHkgaGlnaC1yYXRlZCBwbGF5ZXJzIHRoYXQgZnJlcXVlbnQgdGhlIGFyZWEnLFxuICAgICAgICAgICAgICAgICdBdCA5Ljc1IGFjcmVzLCBXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIG9uZSBvZiB0aGUgbGFyZ2VzdCBncmVlbiwgb3BlbiBzcGFjZXMgaW4gdGhlIEdyZWVud2ljaCBWaWxsYWdlIG5laWdoYm9yaG9vZC4gIFdoaWxlIGZhbW91cyBmb3IgdGhlIGZvdW50YWluIGFuZCBhcmNoLCB0aGUgcGFyayBoYXMgZWNvbG9naWNhbCBhc3NldHMgdGhhdCB3ZSBmZWVsIHNob3VsZCBiZSBoaWdobGlnaHRlZCBtb3JlIHByb21pbmVudGx5LiBUaGVyZSBhcmUgb3ZlciAzMCBzcGVjaWVzIG9mIHRyZWVzIGFuZCBzaW1pbGFybHkgbWFueSB2YXJpYW50cyBvZiBiaXJkcywgc3F1aXJyZWxzLCBhbmQgZXZlbiByYXRzIHdoaWNoIGluaGFiaXQgdGhlIHBhcmsnLFxuICAgICAgICAgICAgICAgICdUaGUgZm91bnRhaW4gaW4gdGhlIGNlbnRlciBvZiBXYXNoaW5ndG9uIFNxdWFyZSBQYXJrLCBjYWxsZWQgVGlzY2ggRm91bnRhaW4gc2luY2UgMjAwNSBvbndhcmRzIGFmdGVyIGEgMi41IG1pbGxpb24gZG9sbGFyIGRvbmF0aW9uIGZyb20gdGhlIFRpc2NoIEZvdW5kYXRpb24sIGlzIHRoZSBmYW1vdXMgMTUtbWV0ZXIgd2lkZSBmb3VudGFpbiB3aGljaCBpbiBzdW1tZXIgbW9udGhzIHNwZXdzIGNsZWFyLCBjb29sIHdhdGVyIGZyb20gaXRzIG1hbnkgc3BvdXRzJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbWFnZXM6IFtcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9kL2RhL1dhc2hpbmd0b25fc3F1YXJlX3BhcmsuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9iL2JlL05ZQ18tX1dhc2hpbmd0b25fU3F1YXJlX1BhcmsuSlBHJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3N0YXRpYzAxLm55dC5jb20vaW1hZ2VzLzIwMDkvMDgvMDUvYm9va3MvZ2FybmVyLTYwMC5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vb250aGVzZXRvZm5ld3lvcmsuY29tL2xvY2F0aW9ucy9pYW1sZWdlbmQvaWFtbGVnZW5kMDQuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy50aGVmYWNlYmVhdXR5LmNvLnVrL2Jsb2cvd3AtY29udGVudC91cGxvYWRzLzIwMTAvMTEvY29sZC13ZWF0aGVyLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvYi9iOC9XYXNoaW5ndG9uX1NxdWFyZV9ub3J0aGVhc3RfZW50cmFuY2UuanBnLzMyNXB4LVdhc2hpbmd0b25fU3F1YXJlX25vcnRoZWFzdF9lbnRyYW5jZS5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vb250aGVyZWFsbnkuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEzLzAxL3dhc2hpbmd0b25fYXJjaF8xODk5LmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvZi9mNy9XYXNoaW5ndG9uX1NxdWFyZV9QYXJrX0NoZXNzX1BsYXllcnNfYnlfRGF2aWRfU2hhbmtib25lLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cuZ290aGFtZ2F6ZXR0ZS5jb20vaW1hZ2VzL2dyYXBoaWNzLzIwMTQvMDMvV2FzaGluZ3Rvbl9TcXVhcmVfUGFya18yX255Y2dvdnBhcmtzX29yZy5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vZ3JhcGhpY3M4Lm55dGltZXMuY29tL2ltYWdlcy8yMDA3LzA5LzMwL255cmVnaW9uL3dhc2g2MDAuanBnJyxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIC8vZW5kIG9mIGhhcmRjb2RlXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hZGQgcGFyYWxsYXggdGFuZ2wgbG9nb1xuICAgICAgICAkKHRoaXMuZ2V0RE9NTm9kZSgpKS5kcmFnZ2FibGUoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAkKFwiI3NsYXRlXCIpLmhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gJChcIiNzbGF0ZVwiKS53aWR0aCgpO1xuICAgIH0sXG4gICAgbmV4dElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHRoaXMudW5pcXVlSWQgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlSWQrKztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24obG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBpZihub2RlID09IG51bGwgJiYgcGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbMF0sXG4gICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzWzBdLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vNzUgaXMgMS8yIG5vZGUgaGVpZ2h0IGFuZCB3aWR0aFxuICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy53aWR0aCAvIDIgLSA3NSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAvIDIgLSA3NSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYocGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IHRoaXMubmV4dElkKCk7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuc3RhdGUudGV4dFtpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzW2lkICUgMTBdLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMud2lkdGggLyAyICsgMzAwICogTWF0aC5zaW4oKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpIC0gNzUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuaGVpZ2h0IC8gMiArIDMwMCAqIE1hdGguY29zKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSAtIDc1LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBsb2NhdGlvbi5yaWdodDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBsb2NhdGlvbi50b3A7XG5cbiAgICAgICAgICAgIC8vaW1hZ2VzIGdvaW5nIG5vcm1hbGx5LCB0ZXh0IGFuZCBkZXRhaWxzIHNraXBwaW5nXG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbaWQgJSAxMF0sXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1tpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiByaWdodCArIDMwMCAqIE1hdGguc2luKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdG9wICsgMzAwICogTWF0aC5jb3MoKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBkaXNwbGFjZTogZnVuY3Rpb24obm9kZSwgcGFyZW50KSB7XG4gICAgICAgIHZhciByZWZlcmVuY2UgPSB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiBub2RlLnN0eWxlLnJpZ2h0LFxuICAgICAgICAgICAgICAgIHRvcDogbm9kZS5zdHlsZS50b3AgLSAxMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5nbGUgPSB0aGlzLmZpbmRBbmdsZShwYXJlbnQsIG5vZGUsIHJlZmVyZW5jZSk7XG4gICAgICAgIHZhciBkaXNwbGFjZW1lbnQgPSB7XG4gICAgICAgICAgICB5OiBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICB4OiBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzcGxhY2VtZW50O1xuICAgIH0sXG4gICAgcHJvbGlmZXJhdGU6IGZ1bmN0aW9uKGxvY2F0aW9uLCBub2RlLCBwYXJlbnQsIG51bWJlcikge1xuICAgICAgICAvL3Byb2xpZmVyYXRlIG5lZWRzIHRvIHRha2UgaW4gYSBudW1iZXIgcGFyYW1ldGVyIGxhdGVyIHdoZW4gaG9va2luZyB0byB0aGUgYmFja2VuZFxuICAgICAgICB0aGlzLmFkZChsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpO1xuICAgIH0sXG4gICAgZmluZEFuZ2xlKHAwLHAxLHAyKSB7XG4gICAgICAgIHZhciBhID0gTWF0aC5wb3cocDEuc3R5bGUucmlnaHQtcDAuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMS5zdHlsZS50b3AtcDAuc3R5bGUudG9wLDIpLFxuICAgICAgICBiID0gTWF0aC5wb3cocDEuc3R5bGUucmlnaHQtcDIuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMS5zdHlsZS50b3AtcDIuc3R5bGUudG9wLDIpLFxuICAgICAgICBjID0gTWF0aC5wb3cocDIuc3R5bGUucmlnaHQtcDAuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMi5zdHlsZS50b3AtcDAuc3R5bGUudG9wLDIpO1xuICAgICAgICBcbiAgICAgICAgaWYocDEuc3R5bGUucmlnaHQgPCBwMC5zdHlsZS5yaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC0gTWF0aC5hY29zKChhK2ItYykgLyBNYXRoLnNxcnQoNCAqIGEgKiBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hY29zKChhICsgYiAtIGMpIC8gTWF0aC5zcXJ0KDQgKiBhICogYikpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG5ld1RleHQsIGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFycltpXS50ZXh0ID0gbmV3VGV4dDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6YXJyfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOiBhcnJ9KTtcbiAgICB9LFxuICAgIGVhY2hOb2RlOiBmdW5jdGlvbihub2RlLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPE5vZGUga2V5PXtub2RlLmlkfVxuICAgICAgICAgICAgICAgICAgICBpbmRleD17aX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudXBkYXRlfVxuICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJvbGlmZXJhdGU9e3RoaXMucHJvbGlmZXJhdGV9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0YXRlLm5vZGVzW2ldLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICBub2RlPXt0aGlzLnN0YXRlLm5vZGVzW2ldfVxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ9e3RoaXMuc3RhdGUubm9kZXNbaV0ucGFyZW50fVxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzPXt0aGlzLnN0YXRlLm5vZGVzW2kgJSAxMF0uZGV0YWlsc31cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U9e3RoaXMuc3RhdGUuaW1hZ2VzW2kgJSAxMF19XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudD17dGhpcy5kaXNwbGFjZX1cbiAgICAgICAgICAgICAgICA+e25vZGUudGV4dH08L05vZGU+XG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xhdGVcIiBpZD1cInNsYXRlXCI+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubm9kZXMubWFwKHRoaXMuZWFjaE5vZGUpfVxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmFkZC5iaW5kKG51bGwsIG51bGwsIG51bGwsIG51bGwsIDEpfS8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNsYXRlOyJdfQ==

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js":[function(require,module,exports){
var Slate = require('./slate');

React.render(React.createElement(Slate, {count: 1}), 
    document.getElementById('app'));

},{"./slate":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js"}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js":[function(require,module,exports){
var Node = React.createClass({displayName: "Node",
    getInitialState: function() {
        return {
            proliferated: false,
            inspecting: false,
            parent: null,
            details: null,
            location: {
                right: this.props.style.right + 155,
                top: this.props.style.top + 5,
            },
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
                right: null,
                top: null,
                opacity: '0',
            },
        }
    },
    componentWillMount: function() {
        this.setState({parent: this.props.parent});
    },
    inspect: function() {
        this.setState({inspecting: !this.state.inspecting});
        var inspecting = !this.state.inspecting;
        if(inspecting) {
            this.setState({
                inspectStyle: {
                    right: this.state.location.right + 'px',
                    top: this.state.location.top + 'px',
                    opacity: '1',
                },
            });
        }
        else {
            this.setState({
                inspectStyle: {
                    right: this.state.location.right + 155 + 'px',
                    top: this.state.location.top + 155 + 'px',
                    opacity: '0',
                },
            });
        }
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
                    location: {
                        right: this.props.style.right + 170 + 300 * displacement.x,
                        top: this.props.style.top - 5 + 300 * displacement.y,
                    },
                    inspectStyle: {
                        right: this.props.style.right + 170 + 300 * displacement.x,
                        top: this.props.style.top - 5 + 300 * displacement.y,
                    },
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
                    location: {
                        right: this.props.style.right + 170,
                        top: this.props.style.top - 5,
                    },
                    inspectStyle: {
                        right: this.props.style.right + 170,
                        top: this.props.style.top - 5,
                    },
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
    render: function() {
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
                ), 
                React.createElement("div", {className: "inspect", style: this.state.inspectStyle}, 
                    React.createElement("p", null, this.props.details)
                )
            )
        );
    }
});

module.exports = Node;

},{}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js":[function(require,module,exports){
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
                React.createElement(Node, {
                    key: node.id, 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBRSxDQUFFLENBQUE7SUFDM0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRztnQkFDbkMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2hDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUk7Z0JBQ3BDLEdBQUcsRUFB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QUM7S0FDdkI7QUFDTCxJQUFJLFdBQVcsRUFBRSxTQUFTLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTs7UUFFbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM1QztJQUNELFNBQVMsV0FBVztRQUNoQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdGLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFFdEYsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElB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LENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgU2xhdGUgPSByZXF1aXJlKCcuL3NsYXRlJyk7XG5cblJlYWN0LnJlbmRlcig8U2xhdGUgY291bnQ9ezF9Lz4sIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IiwidmFyIE5vZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2xpZmVyYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBpbnNwZWN0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIGRldGFpbHM6IG51bGwsXG4gICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTU1LFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyA1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNTAgKyAncHgnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAgKyAncHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNTAgKyAncHgnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAgKyAncHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIHRoaXMucHJvcHMuaW1hZ2UgKyAnKScsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuMjUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIHRvcDogbnVsbCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYXJlbnQ6IHRoaXMucHJvcHMucGFyZW50fSk7XG4gICAgfSxcbiAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5zcGVjdGluZzogIXRoaXMuc3RhdGUuaW5zcGVjdGluZ30pO1xuICAgICAgICB2YXIgaW5zcGVjdGluZyA9ICF0aGlzLnN0YXRlLmluc3BlY3Rpbmc7XG4gICAgICAgIGlmKGluc3BlY3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5zdGF0ZS5sb2NhdGlvbi5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5zdGF0ZS5sb2NhdGlvbi50b3AgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaW5zcGVjdFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnN0YXRlLmxvY2F0aW9uLnJpZ2h0ICsgMTU1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnN0YXRlLmxvY2F0aW9uLnRvcCArIDE1NSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZCkge1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBudWxsO1xuXG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9kaXNwbGFjZSAzMDAgcHggYXdheSBmcm9tIHRoZSBub2RlIGluIHRoZSBhbmdsZSBmb3JtZWQgYnkgdGhlIG5vZGUgYW5kIGl0cyBwYXJlbnRcbiAgICAgICAgICAgICAgICB2YXIgZGlzcGxhY2VtZW50ID0gdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5wcm9wcy5zdHlsZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTcwICsgMzAwICogZGlzcGxhY2VtZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gNSArIDMwMCAqIGRpc3BsYWNlbWVudC55LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTcwICsgMzAwICogZGlzcGxhY2VtZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gNSArIDMwMCAqIGRpc3BsYWNlbWVudC55LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZS5yaWdodCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBzdHlsZS50b3AgLSAxNSArIDMwMCAqIGRpc3BsYWNlbWVudC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZS5yaWdodCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBzdHlsZS50b3AgLSAxNSArIDMwMCAqIGRpc3BsYWNlbWVudC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL2ZpcmVkIHRvIHByb2xpZmVyYXRlIGJlZm9yZSByZXJlbmRlclxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLng7XG4gICAgICAgICAgICAgICAgdG9wID0gdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55O1xuXG4gICAgICAgICAgICAgICAgJChcIiNzbGF0ZVwiKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgLy9yaWdodDogcmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAvL3RvcDogdG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJys9JyArIDYwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICctPScgKyA2MDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGNvbXBsZXRlLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTcwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAxNzAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gNSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0IC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNjUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3ByZS1iYWNrZW5kIGhhcmRjb2RlXG4gICAgICAgICAgICAvL3doZW4gYmFja2VuZCBpcyBob29rZWQgdXAsIGVhY2ggSlNPTiBvYmplY3QgcmV0dXJuZWQgd2lsbCBiZSBzdG9yZWQgaW4gYW4gYXJyYXksIHRoZSBsZW5ndGggb2Ygd2hpY2ggaXMgdGhlIGFtb3VudCBvZiBub2RlcyB0byBiZSBjcmVhdGVkLCB0aGUgdGV4dCBpbnNpZGUgd2hpY2ggYmVpbmcgdGhlIGluZm9ybWF0aW9uIHRvIGJlIGNvbnRhaW5lZCB3aXRoaW5cbiAgICAgICAgICAgIC8vdGhpcyBvYmplY3Qgd2lsbCBiZSBpbnNlcnRlZCBpbnRvIHByb2xpZmVyYXRlLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjaGFuZ2VkIHRvIGFjY29tbW9kYXRlIGZvciB0aGUgZHluYW1pc21cbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Qcm9saWZlcmF0ZSh7cmlnaHQ6IHJpZ2h0LCB0b3A6IHRvcH0sIHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQsIDMpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2xpZmVyYXRlZDogIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBwcm9saWZlcmF0ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlSW1hZ2VcIiBzdHlsZT17dGhpcy5zdGF0ZS5pbWFnZVN0eWxlfT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXt0aGlzLnByb2xpZmVyYXRlfSBcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUuc3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt0aGlzLnN0YXRlLmJ1dHRvblN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5pbnNwZWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiLz4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnNwZWN0XCIgc3R5bGU9e3RoaXMuc3RhdGUuaW5zcGVjdFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuZGV0YWlsc308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlO1xuIiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcblxudmFyIFNsYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub2RlczogW10sXG4gICAgICAgICAgICAvL2hhcmRjb2RlIHVudGlsIGJhY2tlbmQgY2FuIGJlIGhvb2tlZCB1cFxuICAgICAgICAgICAgLy9OT1QgRklOQUwsIE9OTFkgRk9SIFRFU1RJTkcgQU5EIFBVUlBPU0VTIE9GIFBSRVNFTlRBVElPTlxuICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrJyxcbiAgICAgICAgICAgICAgICAnSGlzdG9yeScsXG4gICAgICAgICAgICAgICAgJ0xvY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnRXZlbnRzJyxcbiAgICAgICAgICAgICAgICAnV2VhdGhlcicsXG4gICAgICAgICAgICAgICAgJ1BlcmZvcm1hbmNlcycsXG4gICAgICAgICAgICAgICAgJ0FyY2gnLFxuICAgICAgICAgICAgICAgICdDaGVzcycsXG4gICAgICAgICAgICAgICAgJ05hdHVyZScsXG4gICAgICAgICAgICAgICAgJ0ZvdW50YWluJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgYSA5Ljc1LWFjcmUgcHVibGljIHBhcmsgaW4gdGhlIE5ldyBZb3JrIENpdHkgbmVpZ2hib3Job29kIG9mIEdyZWVud2ljaCBWaWxsYWdlLCBNYW5oYXR0YW4uIE9uZSBvZiB0aGUgYmVzdCBrbm93biBvZiBOZXcgWW9yayBDaXR5XFwncyAxLDkwMCBwdWJsaWMgcGFya3MsIGl0IGlzIGEgbGFuZG1hcmsgYXMgd2VsbCBhcyBhIG1lZXRpbmcgcGxhY2UgYW5kIGNlbnRlciBmb3IgY3VsdHVyYWwgYWN0aXZpdHkuIEl0IGlzIG9wZXJhdGVkIGJ5IHRoZSBOZXcgWW9yayBDaXR5IERlcGFydG1lbnQgb2YgUGFya3MgYW5kIFJlY3JlYXRpb24uJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBuYW1lZCBmb3IgR2VvcmdlIFdhc2hpbmd0b24gKDE3MzItMTc5OSksIHRoZSBjb21tYW5kZXIgb2YgdGhlIENvbnRpbmVudGFsIEFybXksIHdobyB3YXMgaW5hdWd1cmF0ZWQgaW4gTmV3IFlvcmsgQ2l0eSBhcyB0aGUgZmlyc3QgUHJlc2lkZW50IG9mIHRoZSBVbml0ZWQgU3RhdGVzIG9uIEFwcmlsIDMwLCAxNzg5LiAnLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIGxvY2F0ZWQgZGlyZWN0bHkgb24gdGhlIGludGVyc2VjdGlvbiBvZiA1dGggQXZlbnVlIGFuZCBXZXN0IDR0aCBTdHJlZXQsIGluIHRoZSBoZWFydCBvZiBMb3dlciBNYW5oYXR0YW4nLFxuICAgICAgICAgICAgICAgICdDaHJpc3RtYXMgRXZlIENhcm9saW5nIGF0IHRoZSBXYXNoaW5ndG9uIEFyY2gsIFRodXJzZGF5LCBEZWNlbWJlciAyNCwgMjAxNSBmcm9tIDU6MDAgcC5tLiB0byA2OjAwIHAubS4nLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIDU2IGRlZ3JlZXMgRmFyZW5oZWl0IHRvZGF5LCB3aXRoIGEgYnJpc2sgYnJlZXplIGFuZCBhIDEwJSBjaGFuY2Ugb2Ygc2hvd2VycycsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgaG9tZSB0byBtYW55IGZhbW91cyBwYXJrIHBlcmZvcm1hbmNlcy4gVGhlcmUgYXJlIHNjb3JlcyBvZiBtdXNpY2lhbnMgd2hvIHBsYXkgaW4gdGhlIHBhcmssIHRoZSBtb3N0IGZhbW91cyBvZiB3aG9tIGlzIGFyZ3VhYmx5IENvbGxpbiBIdWdnaW5zLCBhbHNvIGtub3duIGFzIHRoZSBcIkNyYXp5IFBpYW5vIE1hblwiJyxcbiAgICAgICAgICAgICAgICAnVGhlIEFyY2ggaXMgbGlrZWx5IHRoZSBtb3N0IHJlY29nbml6YWJsZSBmZWF0dXJlIG9mIHRoZSBwYXJrLiBUaGUgQXJjaCBpcyBhIG1hcmJsZSB0cml1bXBoYWwgYXJjaCBidWlsdCBpbiAxODkyIGluIFdhc2hpbmd0b24gU3F1YXJlIFBhcmsgaW4gdGhlIEdyZWVud2ljaCBWaWxsYWdlIG5laWdoYm9yaG9vZCBvZiBMb3dlciBNYW5oYXR0YW4gaW4gTmV3IFlvcmsgQ2l0eS4gSXQgY2VsZWJyYXRlcyB0aGUgY2VudGVubmlhbCBvZiBHZW9yZ2UgV2FzaGluZ3RvblxcJ3MgaW5hdWd1cmF0aW9uIGFzIFByZXNpZGVudCBvZiB0aGUgVW5pdGVkIFN0YXRlcyBpbiAxNzg5IGFuZCBmb3JtcyB0aGUgZ3JhbmQgc291dGhlcm4gdGVybWludXMgb2YgRmlmdGggQXZlbnVlLicsXG4gICAgICAgICAgICAgICAgJ1RoZXJlIGFyZSBtYW55IGNoZXNzIHBsYXllcnMgaW4gdGhlIFBhcmsuIFRoZXkgcGxheSBpbiB0aGUgbG93ZXIgd2VzdCBzaWRlIG9mIHRoZSBjb21wbGV4LCBnZW5lcmFsbHkgcGxheWluZyBibGl0eiBjaGVzcyAoc3ViLTUgbWludXRlIHZhcmlhbnQpIGFuZCB0aGVyZSBhcmUgc29tZSBub3RhYmxlLCBleHRyZW1lbHkgaGlnaC1yYXRlZCBwbGF5ZXJzIHRoYXQgZnJlcXVlbnQgdGhlIGFyZWEnLFxuICAgICAgICAgICAgICAgICdBdCA5Ljc1IGFjcmVzLCBXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIG9uZSBvZiB0aGUgbGFyZ2VzdCBncmVlbiwgb3BlbiBzcGFjZXMgaW4gdGhlIEdyZWVud2ljaCBWaWxsYWdlIG5laWdoYm9yaG9vZC4gIFdoaWxlIGZhbW91cyBmb3IgdGhlIGZvdW50YWluIGFuZCBhcmNoLCB0aGUgcGFyayBoYXMgZWNvbG9naWNhbCBhc3NldHMgdGhhdCB3ZSBmZWVsIHNob3VsZCBiZSBoaWdobGlnaHRlZCBtb3JlIHByb21pbmVudGx5LiBUaGVyZSBhcmUgb3ZlciAzMCBzcGVjaWVzIG9mIHRyZWVzIGFuZCBzaW1pbGFybHkgbWFueSB2YXJpYW50cyBvZiBiaXJkcywgc3F1aXJyZWxzLCBhbmQgZXZlbiByYXRzIHdoaWNoIGluaGFiaXQgdGhlIHBhcmsnLFxuICAgICAgICAgICAgICAgICdUaGUgZm91bnRhaW4gaW4gdGhlIGNlbnRlciBvZiBXYXNoaW5ndG9uIFNxdWFyZSBQYXJrLCBjYWxsZWQgVGlzY2ggRm91bnRhaW4gc2luY2UgMjAwNSBvbndhcmRzIGFmdGVyIGEgMi41IG1pbGxpb24gZG9sbGFyIGRvbmF0aW9uIGZyb20gdGhlIFRpc2NoIEZvdW5kYXRpb24sIGlzIHRoZSBmYW1vdXMgMTUtbWV0ZXIgd2lkZSBmb3VudGFpbiB3aGljaCBpbiBzdW1tZXIgbW9udGhzIHNwZXdzIGNsZWFyLCBjb29sIHdhdGVyIGZyb20gaXRzIG1hbnkgc3BvdXRzJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbWFnZXM6IFtcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9kL2RhL1dhc2hpbmd0b25fc3F1YXJlX3BhcmsuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9iL2JlL05ZQ18tX1dhc2hpbmd0b25fU3F1YXJlX1BhcmsuSlBHJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3N0YXRpYzAxLm55dC5jb20vaW1hZ2VzLzIwMDkvMDgvMDUvYm9va3MvZ2FybmVyLTYwMC5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vb250aGVzZXRvZm5ld3lvcmsuY29tL2xvY2F0aW9ucy9pYW1sZWdlbmQvaWFtbGVnZW5kMDQuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy50aGVmYWNlYmVhdXR5LmNvLnVrL2Jsb2cvd3AtY29udGVudC91cGxvYWRzLzIwMTAvMTEvY29sZC13ZWF0aGVyLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvYi9iOC9XYXNoaW5ndG9uX1NxdWFyZV9ub3J0aGVhc3RfZW50cmFuY2UuanBnLzMyNXB4LVdhc2hpbmd0b25fU3F1YXJlX25vcnRoZWFzdF9lbnRyYW5jZS5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vb250aGVyZWFsbnkuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEzLzAxL3dhc2hpbmd0b25fYXJjaF8xODk5LmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvZi9mNy9XYXNoaW5ndG9uX1NxdWFyZV9QYXJrX0NoZXNzX1BsYXllcnNfYnlfRGF2aWRfU2hhbmtib25lLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cuZ290aGFtZ2F6ZXR0ZS5jb20vaW1hZ2VzL2dyYXBoaWNzLzIwMTQvMDMvV2FzaGluZ3Rvbl9TcXVhcmVfUGFya18yX255Y2dvdnBhcmtzX29yZy5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vZ3JhcGhpY3M4Lm55dGltZXMuY29tL2ltYWdlcy8yMDA3LzA5LzMwL255cmVnaW9uL3dhc2g2MDAuanBnJyxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIC8vZW5kIG9mIGhhcmRjb2RlXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hZGQgcGFyYWxsYXggdGFuZ2wgbG9nb1xuICAgICAgICAkKHRoaXMuZ2V0RE9NTm9kZSgpKS5kcmFnZ2FibGUoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAkKFwiI3NsYXRlXCIpLmhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gJChcIiNzbGF0ZVwiKS53aWR0aCgpO1xuICAgIH0sXG4gICAgbmV4dElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHRoaXMudW5pcXVlSWQgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlSWQrKztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24obG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBpZihub2RlID09IG51bGwgJiYgcGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbMF0sXG4gICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzWzBdLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vNzUgaXMgMS8yIG5vZGUgaGVpZ2h0IGFuZCB3aWR0aFxuICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy53aWR0aCAvIDIgLSA3NSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAvIDIgLSA3NSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYocGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IHRoaXMubmV4dElkKCk7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuc3RhdGUudGV4dFtpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzW2lkICUgMTBdLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMud2lkdGggLyAyICsgMzAwICogTWF0aC5zaW4oKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpIC0gNzUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuaGVpZ2h0IC8gMiArIDMwMCAqIE1hdGguY29zKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSAtIDc1LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBsb2NhdGlvbi5yaWdodDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBsb2NhdGlvbi50b3A7XG5cbiAgICAgICAgICAgIC8vaW1hZ2VzIGdvaW5nIG5vcm1hbGx5LCB0ZXh0IGFuZCBkZXRhaWxzIHNraXBwaW5nXG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbaWQgJSAxMF0sXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1tpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiByaWdodCArIDMwMCAqIE1hdGguc2luKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdG9wICsgMzAwICogTWF0aC5jb3MoKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBkaXNwbGFjZTogZnVuY3Rpb24obm9kZSwgcGFyZW50KSB7XG4gICAgICAgIHZhciByZWZlcmVuY2UgPSB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiBub2RlLnN0eWxlLnJpZ2h0LFxuICAgICAgICAgICAgICAgIHRvcDogbm9kZS5zdHlsZS50b3AgLSAxMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5nbGUgPSB0aGlzLmZpbmRBbmdsZShwYXJlbnQsIG5vZGUsIHJlZmVyZW5jZSk7XG4gICAgICAgIHZhciBkaXNwbGFjZW1lbnQgPSB7XG4gICAgICAgICAgICB5OiBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICB4OiBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzcGxhY2VtZW50O1xuICAgIH0sXG4gICAgcHJvbGlmZXJhdGU6IGZ1bmN0aW9uKGxvY2F0aW9uLCBub2RlLCBwYXJlbnQsIG51bWJlcikge1xuICAgICAgICAvL3Byb2xpZmVyYXRlIG5lZWRzIHRvIHRha2UgaW4gYSBudW1iZXIgcGFyYW1ldGVyIGxhdGVyIHdoZW4gaG9va2luZyB0byB0aGUgYmFja2VuZFxuICAgICAgICB0aGlzLmFkZChsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpO1xuICAgIH0sXG4gICAgZmluZEFuZ2xlKHAwLHAxLHAyKSB7XG4gICAgICAgIHZhciBhID0gTWF0aC5wb3cocDEuc3R5bGUucmlnaHQtcDAuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMS5zdHlsZS50b3AtcDAuc3R5bGUudG9wLDIpLFxuICAgICAgICBiID0gTWF0aC5wb3cocDEuc3R5bGUucmlnaHQtcDIuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMS5zdHlsZS50b3AtcDIuc3R5bGUudG9wLDIpLFxuICAgICAgICBjID0gTWF0aC5wb3cocDIuc3R5bGUucmlnaHQtcDAuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMi5zdHlsZS50b3AtcDAuc3R5bGUudG9wLDIpO1xuICAgICAgICBcbiAgICAgICAgaWYocDEuc3R5bGUucmlnaHQgPCBwMC5zdHlsZS5yaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC0gTWF0aC5hY29zKChhK2ItYykgLyBNYXRoLnNxcnQoNCAqIGEgKiBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hY29zKChhICsgYiAtIGMpIC8gTWF0aC5zcXJ0KDQgKiBhICogYikpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG5ld1RleHQsIGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFycltpXS50ZXh0ID0gbmV3VGV4dDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6YXJyfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOiBhcnJ9KTtcbiAgICB9LFxuICAgIGVhY2hOb2RlOiBmdW5jdGlvbihub2RlLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPE5vZGUgXG4gICAgICAgICAgICAgICAgICAgIGtleT17bm9kZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICBvblByb2xpZmVyYXRlPXt0aGlzLnByb2xpZmVyYXRlfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgbm9kZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXX1cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50PXt0aGlzLnN0YXRlLm5vZGVzW2ldLnBhcmVudH1cbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5zdGF0ZS5ub2Rlc1tpICUgMTBdLmRldGFpbHN9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlPXt0aGlzLnN0YXRlLmltYWdlc1tpICUgMTBdfVxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnQ9e3RoaXMuZGlzcGxhY2V9XG4gICAgICAgICAgICAgICAgPntub2RlLnRleHR9PC9Ob2RlPlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsYXRlXCIgaWQ9XCJzbGF0ZVwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5vZGVzLm1hcCh0aGlzLmVhY2hOb2RlKX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5hZGQuYmluZChudWxsLCBudWxsLCBudWxsLCBudWxsLCAxKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbGF0ZTsiXX0=

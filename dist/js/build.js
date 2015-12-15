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
        this.add(null, null, null, 1);
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
                this.state.nodes.map(this.eachNode)
            )

        );
    }
});

module.exports = Slate;

},{"./node":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js"}]},{},["/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBRSxDQUFFLENBQUE7SUFDM0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRztnQkFDbkMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2hDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUk7Z0JBQ3BDLEdBQUcsRUFB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QixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDOUIsU0FBUzs7UUFFRCxPQUFPLFlBQVksQ0FBQztLQUN2QjtBQUNMLElBQUksV0FBVyxFQUFFLFNBQVMsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFOztRQUVsRCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzVDO0lBQ0QsU0FBUyxXQUFXO1FBQ2hCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0YsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUV0RixHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVB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ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTbGF0ZSA9IHJlcXVpcmUoJy4vc2xhdGUnKTtcblxuUmVhY3QucmVuZGVyKDxTbGF0ZSBjb3VudD17MX0vPiwgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiLCJ2YXIgTm9kZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvbGlmZXJhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGluc3BlY3Rpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgZGV0YWlsczogbnVsbCxcbiAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAxNTUsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArIDUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGltYWdlU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMC4yNScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5zcGVjdFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgdG9wOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhcmVudDogdGhpcy5wcm9wcy5wYXJlbnR9KTtcbiAgICB9LFxuICAgIGluc3BlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnNwZWN0aW5nOiAhdGhpcy5zdGF0ZS5pbnNwZWN0aW5nfSk7XG4gICAgICAgIHZhciBpbnNwZWN0aW5nID0gIXRoaXMuc3RhdGUuaW5zcGVjdGluZztcbiAgICAgICAgaWYoaW5zcGVjdGluZykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaW5zcGVjdFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnN0YXRlLmxvY2F0aW9uLnJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnN0YXRlLmxvY2F0aW9uLnRvcCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcxJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBpbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMuc3RhdGUubG9jYXRpb24ucmlnaHQgKyAxNTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuc3RhdGUubG9jYXRpb24udG9wICsgMTU1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLmluZGV4KTtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkKSB7XG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHRvcCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUucGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL2Rpc3BsYWNlIDMwMCBweCBhd2F5IGZyb20gdGhlIG5vZGUgaW4gdGhlIGFuZ2xlIGZvcm1lZCBieSB0aGUgbm9kZSBhbmQgaXRzIHBhcmVudFxuICAgICAgICAgICAgICAgIHZhciBkaXNwbGFjZW1lbnQgPSB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KTtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnByb3BzLnN0eWxlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAxNzAgKyAzMDAgKiBkaXNwbGFjZW1lbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgLSA1ICsgMzAwICogZGlzcGxhY2VtZW50LnksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAxNzAgKyAzMDAgKiBkaXNwbGFjZW1lbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgLSA1ICsgMzAwICogZGlzcGxhY2VtZW50LnksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHN0eWxlLnJpZ2h0IC0gMTUgKyAzMDAgKiBkaXNwbGFjZW1lbnQueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlLnRvcCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMC41JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHN0eWxlLnJpZ2h0IC0gMTUgKyAzMDAgKiBkaXNwbGFjZW1lbnQueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlLnRvcCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vZmlyZWQgdG8gcHJvbGlmZXJhdGUgYmVmb3JlIHJlcmVuZGVyXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMzAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueDtcbiAgICAgICAgICAgICAgICB0b3AgPSB0aGlzLnByb3BzLnN0eWxlLnRvcCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnk7XG5cbiAgICAgICAgICAgICAgICAkKFwiI3NsYXRlXCIpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAvL3JpZ2h0OiByaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIC8vdG9wOiB0b3AgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnKz0nICsgNjAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJy09JyArIDYwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnkgKyAncHgnLFxuICAgICAgICAgICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBbmltYXRpb24gY29tcGxldGUuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAxNzAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gNSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5zcGVjdFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDE3MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgLSA1LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMC42NScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcHJlLWJhY2tlbmQgaGFyZGNvZGVcbiAgICAgICAgICAgIC8vd2hlbiBiYWNrZW5kIGlzIGhvb2tlZCB1cCwgZWFjaCBKU09OIG9iamVjdCByZXR1cm5lZCB3aWxsIGJlIHN0b3JlZCBpbiBhbiBhcnJheSwgdGhlIGxlbmd0aCBvZiB3aGljaCBpcyB0aGUgYW1vdW50IG9mIG5vZGVzIHRvIGJlIGNyZWF0ZWQsIHRoZSB0ZXh0IGluc2lkZSB3aGljaCBiZWluZyB0aGUgaW5mb3JtYXRpb24gdG8gYmUgY29udGFpbmVkIHdpdGhpblxuICAgICAgICAgICAgLy90aGlzIG9iamVjdCB3aWxsIGJlIGluc2VydGVkIGludG8gcHJvbGlmZXJhdGUsIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNoYW5nZWQgdG8gYWNjb21tb2RhdGUgZm9yIHRoZSBkeW5hbWlzbVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblByb2xpZmVyYXRlKHtyaWdodDogcmlnaHQsIHRvcDogdG9wfSwgdGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCwgMyk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJvbGlmZXJhdGVkOiAhdGhpcy5zdGF0ZS5wcm9saWZlcmF0ZWR9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbHJlYWR5IHByb2xpZmVyYXRlZCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVJbWFnZVwiIHN0eWxlPXt0aGlzLnN0YXRlLmltYWdlU3R5bGV9PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9e3RoaXMucHJvbGlmZXJhdGV9IFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5zdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3RoaXMuc3RhdGUuYnV0dG9uU3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmluc3BlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCIvPiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc3BlY3RcIiBzdHlsZT17dGhpcy5zdGF0ZS5pbnNwZWN0U3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5kZXRhaWxzfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iLCJ2YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG52YXIgU2xhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVzOiBbXSxcbiAgICAgICAgICAgIC8vaGFyZGNvZGUgdW50aWwgYmFja2VuZCBjYW4gYmUgaG9va2VkIHVwXG4gICAgICAgICAgICAvL05PVCBGSU5BTCwgT05MWSBGT1IgVEVTVElORyBBTkQgUFVSUE9TRVMgT0YgUFJFU0VOVEFUSU9OXG4gICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsnLFxuICAgICAgICAgICAgICAgICdIaXN0b3J5JyxcbiAgICAgICAgICAgICAgICAnTG9jYXRpb24nLFxuICAgICAgICAgICAgICAgICdFdmVudHMnLFxuICAgICAgICAgICAgICAgICdXZWF0aGVyJyxcbiAgICAgICAgICAgICAgICAnUGVyZm9ybWFuY2VzJyxcbiAgICAgICAgICAgICAgICAnQXJjaCcsXG4gICAgICAgICAgICAgICAgJ0NoZXNzJyxcbiAgICAgICAgICAgICAgICAnTmF0dXJlJyxcbiAgICAgICAgICAgICAgICAnRm91bnRhaW4nLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBhIDkuNzUtYWNyZSBwdWJsaWMgcGFyayBpbiB0aGUgTmV3IFlvcmsgQ2l0eSBuZWlnaGJvcmhvb2Qgb2YgR3JlZW53aWNoIFZpbGxhZ2UsIE1hbmhhdHRhbi4gT25lIG9mIHRoZSBiZXN0IGtub3duIG9mIE5ldyBZb3JrIENpdHlcXCdzIDEsOTAwIHB1YmxpYyBwYXJrcywgaXQgaXMgYSBsYW5kbWFyayBhcyB3ZWxsIGFzIGEgbWVldGluZyBwbGFjZSBhbmQgY2VudGVyIGZvciBjdWx0dXJhbCBhY3Rpdml0eS4gSXQgaXMgb3BlcmF0ZWQgYnkgdGhlIE5ldyBZb3JrIENpdHkgRGVwYXJ0bWVudCBvZiBQYXJrcyBhbmQgUmVjcmVhdGlvbi4nLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIG5hbWVkIGZvciBHZW9yZ2UgV2FzaGluZ3RvbiAoMTczMi0xNzk5KSwgdGhlIGNvbW1hbmRlciBvZiB0aGUgQ29udGluZW50YWwgQXJteSwgd2hvIHdhcyBpbmF1Z3VyYXRlZCBpbiBOZXcgWW9yayBDaXR5IGFzIHRoZSBmaXJzdCBQcmVzaWRlbnQgb2YgdGhlIFVuaXRlZCBTdGF0ZXMgb24gQXByaWwgMzAsIDE3ODkuICcsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgbG9jYXRlZCBkaXJlY3RseSBvbiB0aGUgaW50ZXJzZWN0aW9uIG9mIDV0aCBBdmVudWUgYW5kIFdlc3QgNHRoIFN0cmVldCwgaW4gdGhlIGhlYXJ0IG9mIExvd2VyIE1hbmhhdHRhbicsXG4gICAgICAgICAgICAgICAgJ0NocmlzdG1hcyBFdmUgQ2Fyb2xpbmcgYXQgdGhlIFdhc2hpbmd0b24gQXJjaCwgVGh1cnNkYXksIERlY2VtYmVyIDI0LCAyMDE1IGZyb20gNTowMCBwLm0uIHRvIDY6MDAgcC5tLicsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgNTYgZGVncmVlcyBGYXJlbmhlaXQgdG9kYXksIHdpdGggYSBicmlzayBicmVlemUgYW5kIGEgMTAlIGNoYW5jZSBvZiBzaG93ZXJzJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBob21lIHRvIG1hbnkgZmFtb3VzIHBhcmsgcGVyZm9ybWFuY2VzLiBUaGVyZSBhcmUgc2NvcmVzIG9mIG11c2ljaWFucyB3aG8gcGxheSBpbiB0aGUgcGFyaywgdGhlIG1vc3QgZmFtb3VzIG9mIHdob20gaXMgYXJndWFibHkgQ29sbGluIEh1Z2dpbnMsIGFsc28ga25vd24gYXMgdGhlIFwiQ3JhenkgUGlhbm8gTWFuXCInLFxuICAgICAgICAgICAgICAgICdUaGUgQXJjaCBpcyBsaWtlbHkgdGhlIG1vc3QgcmVjb2duaXphYmxlIGZlYXR1cmUgb2YgdGhlIHBhcmsuIFRoZSBBcmNoIGlzIGEgbWFyYmxlIHRyaXVtcGhhbCBhcmNoIGJ1aWx0IGluIDE4OTIgaW4gV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpbiB0aGUgR3JlZW53aWNoIFZpbGxhZ2UgbmVpZ2hib3Job29kIG9mIExvd2VyIE1hbmhhdHRhbiBpbiBOZXcgWW9yayBDaXR5LiBJdCBjZWxlYnJhdGVzIHRoZSBjZW50ZW5uaWFsIG9mIEdlb3JnZSBXYXNoaW5ndG9uXFwncyBpbmF1Z3VyYXRpb24gYXMgUHJlc2lkZW50IG9mIHRoZSBVbml0ZWQgU3RhdGVzIGluIDE3ODkgYW5kIGZvcm1zIHRoZSBncmFuZCBzb3V0aGVybiB0ZXJtaW51cyBvZiBGaWZ0aCBBdmVudWUuJyxcbiAgICAgICAgICAgICAgICAnVGhlcmUgYXJlIG1hbnkgY2hlc3MgcGxheWVycyBpbiB0aGUgUGFyay4gVGhleSBwbGF5IGluIHRoZSBsb3dlciB3ZXN0IHNpZGUgb2YgdGhlIGNvbXBsZXgsIGdlbmVyYWxseSBwbGF5aW5nIGJsaXR6IGNoZXNzIChzdWItNSBtaW51dGUgdmFyaWFudCkgYW5kIHRoZXJlIGFyZSBzb21lIG5vdGFibGUsIGV4dHJlbWVseSBoaWdoLXJhdGVkIHBsYXllcnMgdGhhdCBmcmVxdWVudCB0aGUgYXJlYScsXG4gICAgICAgICAgICAgICAgJ0F0IDkuNzUgYWNyZXMsIFdhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgb25lIG9mIHRoZSBsYXJnZXN0IGdyZWVuLCBvcGVuIHNwYWNlcyBpbiB0aGUgR3JlZW53aWNoIFZpbGxhZ2UgbmVpZ2hib3Job29kLiAgV2hpbGUgZmFtb3VzIGZvciB0aGUgZm91bnRhaW4gYW5kIGFyY2gsIHRoZSBwYXJrIGhhcyBlY29sb2dpY2FsIGFzc2V0cyB0aGF0IHdlIGZlZWwgc2hvdWxkIGJlIGhpZ2hsaWdodGVkIG1vcmUgcHJvbWluZW50bHkuIFRoZXJlIGFyZSBvdmVyIDMwIHNwZWNpZXMgb2YgdHJlZXMgYW5kIHNpbWlsYXJseSBtYW55IHZhcmlhbnRzIG9mIGJpcmRzLCBzcXVpcnJlbHMsIGFuZCBldmVuIHJhdHMgd2hpY2ggaW5oYWJpdCB0aGUgcGFyaycsXG4gICAgICAgICAgICAgICAgJ1RoZSBmb3VudGFpbiBpbiB0aGUgY2VudGVyIG9mIFdhc2hpbmd0b24gU3F1YXJlIFBhcmssIGNhbGxlZCBUaXNjaCBGb3VudGFpbiBzaW5jZSAyMDA1IG9ud2FyZHMgYWZ0ZXIgYSAyLjUgbWlsbGlvbiBkb2xsYXIgZG9uYXRpb24gZnJvbSB0aGUgVGlzY2ggRm91bmRhdGlvbiwgaXMgdGhlIGZhbW91cyAxNS1tZXRlciB3aWRlIGZvdW50YWluIHdoaWNoIGluIHN1bW1lciBtb250aHMgc3Bld3MgY2xlYXIsIGNvb2wgd2F0ZXIgZnJvbSBpdHMgbWFueSBzcG91dHMnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGltYWdlczogW1xuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2QvZGEvV2FzaGluZ3Rvbl9zcXVhcmVfcGFyay5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2IvYmUvTllDXy1fV2FzaGluZ3Rvbl9TcXVhcmVfUGFyay5KUEcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vc3RhdGljMDEubnl0LmNvbS9pbWFnZXMvMjAwOS8wOC8wNS9ib29rcy9nYXJuZXItNjAwLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9vbnRoZXNldG9mbmV3eW9yay5jb20vbG9jYXRpb25zL2lhbWxlZ2VuZC9pYW1sZWdlbmQwNC5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnRoZWZhY2ViZWF1dHkuY28udWsvYmxvZy93cC1jb250ZW50L3VwbG9hZHMvMjAxMC8xMS9jb2xkLXdlYXRoZXIuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy90aHVtYi9iL2I4L1dhc2hpbmd0b25fU3F1YXJlX25vcnRoZWFzdF9lbnRyYW5jZS5qcGcvMzI1cHgtV2FzaGluZ3Rvbl9TcXVhcmVfbm9ydGhlYXN0X2VudHJhbmNlLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9vbnRoZXJlYWxueS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDEvd2FzaGluZ3Rvbl9hcmNoXzE4OTkuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9mL2Y3L1dhc2hpbmd0b25fU3F1YXJlX1BhcmtfQ2hlc3NfUGxheWVyc19ieV9EYXZpZF9TaGFua2JvbmUuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy5nb3RoYW1nYXpldHRlLmNvbS9pbWFnZXMvZ3JhcGhpY3MvMjAxNC8wMy9XYXNoaW5ndG9uX1NxdWFyZV9QYXJrXzJfbnljZ292cGFya3Nfb3JnLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9ncmFwaGljczgubnl0aW1lcy5jb20vaW1hZ2VzLzIwMDcvMDkvMzAvbnlyZWdpb24vd2FzaDYwMC5qcGcnLFxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgLy9lbmQgb2YgaGFyZGNvZGVcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgICAgICAvL2FkZCBwYXJhbGxheCB0YW5nbCBsb2dvXG4gICAgICAgICQodGhpcy5nZXRET01Ob2RlKCkpLmRyYWdnYWJsZSgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICQoXCIjc2xhdGVcIikuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSAkKFwiI3NsYXRlXCIpLndpZHRoKCk7XG4gICAgICAgIHRoaXMuYWRkKG51bGwsIG51bGwsIG51bGwsIDEpO1xuICAgIH0sXG4gICAgbmV4dElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHRoaXMudW5pcXVlSWQgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlSWQrKztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24obG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBpZihub2RlID09IG51bGwgJiYgcGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbMF0sXG4gICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzWzBdLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vNzUgaXMgMS8yIG5vZGUgaGVpZ2h0IGFuZCB3aWR0aFxuICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy53aWR0aCAvIDIgLSA3NSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAvIDIgLSA3NSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYocGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IHRoaXMubmV4dElkKCk7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuc3RhdGUudGV4dFtpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzW2lkICUgMTBdLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMud2lkdGggLyAyICsgMzAwICogTWF0aC5zaW4oKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpIC0gNzUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuaGVpZ2h0IC8gMiArIDMwMCAqIE1hdGguY29zKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSAtIDc1LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBsb2NhdGlvbi5yaWdodDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBsb2NhdGlvbi50b3A7XG5cbiAgICAgICAgICAgIC8vaW1hZ2VzIGdvaW5nIG5vcm1hbGx5LCB0ZXh0IGFuZCBkZXRhaWxzIHNraXBwaW5nXG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbaWQgJSAxMF0sXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1tpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiByaWdodCArIDMwMCAqIE1hdGguc2luKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdG9wICsgMzAwICogTWF0aC5jb3MoKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBkaXNwbGFjZTogZnVuY3Rpb24obm9kZSwgcGFyZW50KSB7XG4gICAgICAgIHZhciByZWZlcmVuY2UgPSB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiBub2RlLnN0eWxlLnJpZ2h0LFxuICAgICAgICAgICAgICAgIHRvcDogbm9kZS5zdHlsZS50b3AgLSAxMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5nbGUgPSB0aGlzLmZpbmRBbmdsZShwYXJlbnQsIG5vZGUsIHJlZmVyZW5jZSk7XG4gICAgICAgIHZhciBkaXNwbGFjZW1lbnQgPSB7XG4gICAgICAgICAgICB5OiBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICB4OiBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzcGxhY2VtZW50O1xuICAgIH0sXG4gICAgcHJvbGlmZXJhdGU6IGZ1bmN0aW9uKGxvY2F0aW9uLCBub2RlLCBwYXJlbnQsIG51bWJlcikge1xuICAgICAgICAvL3Byb2xpZmVyYXRlIG5lZWRzIHRvIHRha2UgaW4gYSBudW1iZXIgcGFyYW1ldGVyIGxhdGVyIHdoZW4gaG9va2luZyB0byB0aGUgYmFja2VuZFxuICAgICAgICB0aGlzLmFkZChsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpO1xuICAgIH0sXG4gICAgZmluZEFuZ2xlKHAwLHAxLHAyKSB7XG4gICAgICAgIHZhciBhID0gTWF0aC5wb3cocDEuc3R5bGUucmlnaHQtcDAuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMS5zdHlsZS50b3AtcDAuc3R5bGUudG9wLDIpLFxuICAgICAgICBiID0gTWF0aC5wb3cocDEuc3R5bGUucmlnaHQtcDIuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMS5zdHlsZS50b3AtcDIuc3R5bGUudG9wLDIpLFxuICAgICAgICBjID0gTWF0aC5wb3cocDIuc3R5bGUucmlnaHQtcDAuc3R5bGUucmlnaHQsMikgKyBNYXRoLnBvdyhwMi5zdHlsZS50b3AtcDAuc3R5bGUudG9wLDIpO1xuICAgICAgICBcbiAgICAgICAgaWYocDEuc3R5bGUucmlnaHQgPCBwMC5zdHlsZS5yaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJIC0gTWF0aC5hY29zKChhK2ItYykgLyBNYXRoLnNxcnQoNCAqIGEgKiBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hY29zKChhICsgYiAtIGMpIC8gTWF0aC5zcXJ0KDQgKiBhICogYikpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG5ld1RleHQsIGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFycltpXS50ZXh0ID0gbmV3VGV4dDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6YXJyfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOiBhcnJ9KTtcbiAgICB9LFxuICAgIGVhY2hOb2RlOiBmdW5jdGlvbihub2RlLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPE5vZGUgXG4gICAgICAgICAgICAgICAgICAgIGtleT17bm9kZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICBvblByb2xpZmVyYXRlPXt0aGlzLnByb2xpZmVyYXRlfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgbm9kZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXX1cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50PXt0aGlzLnN0YXRlLm5vZGVzW2ldLnBhcmVudH1cbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5zdGF0ZS5ub2Rlc1tpICUgMTBdLmRldGFpbHN9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlPXt0aGlzLnN0YXRlLmltYWdlc1tpICUgMTBdfVxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnQ9e3RoaXMuZGlzcGxhY2V9XG4gICAgICAgICAgICAgICAgPntub2RlLnRleHR9PC9Ob2RlPlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsYXRlXCIgaWQ9XCJzbGF0ZVwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5vZGVzLm1hcCh0aGlzLmVhY2hOb2RlKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2xhdGU7Il19

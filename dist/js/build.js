(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js":[function(require,module,exports){
var Slate = require('./slate');

React.render(React.createElement(Slate, {count: 10}), 
    document.getElementById('app'));

},{"./slate":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js"}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js":[function(require,module,exports){
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
                right: this.props.style.right + 150 + 'px',
                top: this.props.style.top + 'px',
            }
        }
    },
    componentWillMount: function() {
        this.setState({parent: this.props.parent});
    },
    componentDidMount: function(){
        //$(this.getDOMNode()).draggable();
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
                        right: style.right + 135 + 300 * displacement.x + 'px',
                        top: style.top + 300 * displacement.y + 'px',
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
                        right: this.props.style.right + 165 + 'px',
                        top: this.props.style.top + 'px',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUk7Z0JBQ3BDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSTthQUNuQztZQUNELFVBQVUsRUFBRTtnQkFDUixNQUFNLEVBQUUsR0FBRyxHQUFHLElBQUk7Z0JBQ2xCLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDakIsS0FBSyxF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QUM7S0FDdkI7QUFDTCxJQUFJLFdBQVcsRUFBRSxTQUFTLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTs7UUFFbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM1QztJQUNELFNBQVMsV0FBVztRQUNoQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdGLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFFdEYsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElB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Q0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTbGF0ZSA9IHJlcXVpcmUoJy4vc2xhdGUnKTtcblxuUmVhY3QucmVuZGVyKDxTbGF0ZSBjb3VudD17MTB9Lz4sIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IiwidmFyIE5vZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2xpZmVyYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBpbnNwZWN0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIGRldGFpbHM6IG51bGwsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1hZ2VTdHlsZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjI1JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhcmVudDogdGhpcy5wcm9wcy5wYXJlbnR9KTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgICAgICAvLyQodGhpcy5nZXRET01Ob2RlKCkpLmRyYWdnYWJsZSgpO1xuICAgIH0sXG4gICAgaW5zcGVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luc3BlY3Rpbmc6ICF0aGlzLnN0YXRlLmluc3BlY3Rpbmd9KVxuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLmluZGV4KTtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkKSB7XG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHRvcCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUucGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL2Rpc3BsYWNlIDMwMCBweCBhd2F5IGZyb20gdGhlIG5vZGUgaW4gdGhlIGFuZ2xlIGZvcm1lZCBieSB0aGUgbm9kZSBhbmQgaXRzIHBhcmVudFxuICAgICAgICAgICAgICAgIHZhciBkaXNwbGFjZW1lbnQgPSB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KTtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnByb3BzLnN0eWxlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZS5yaWdodCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBzdHlsZS50b3AgLSAxNSArIDMwMCAqIGRpc3BsYWNlbWVudC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZS5yaWdodCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBzdHlsZS50b3AgLSAxNSArIDMwMCAqIGRpc3BsYWNlbWVudC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5zcGVjdFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogc3R5bGUucmlnaHQgKyAxMzUgKyAzMDAgKiBkaXNwbGFjZW1lbnQueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlLnRvcCArIDMwMCAqIGRpc3BsYWNlbWVudC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL2ZpcmVkIHRvIHByb2xpZmVyYXRlIGJlZm9yZSByZXJlbmRlclxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLng7XG4gICAgICAgICAgICAgICAgdG9wID0gdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55O1xuXG4gICAgICAgICAgICAgICAgJChcIiNzbGF0ZVwiKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgLy9yaWdodDogcmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAvL3RvcDogdG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJys9JyArIDYwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICctPScgKyA2MDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGNvbXBsZXRlLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0IC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNjUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTY1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3ByZS1iYWNrZW5kIGhhcmRjb2RlXG4gICAgICAgICAgICAvL3doZW4gYmFja2VuZCBpcyBob29rZWQgdXAsIGVhY2ggSlNPTiBvYmplY3QgcmV0dXJuZWQgd2lsbCBiZSBzdG9yZWQgaW4gYW4gYXJyYXksIHRoZSBsZW5ndGggb2Ygd2hpY2ggaXMgdGhlIGFtb3VudCBvZiBub2RlcyB0byBiZSBjcmVhdGVkLCB0aGUgdGV4dCBpbnNpZGUgd2hpY2ggYmVpbmcgdGhlIGluZm9ybWF0aW9uIHRvIGJlIGNvbnRhaW5lZCB3aXRoaW5cbiAgICAgICAgICAgIC8vdGhpcyBvYmplY3Qgd2lsbCBiZSBpbnNlcnRlZCBpbnRvIHByb2xpZmVyYXRlLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjaGFuZ2VkIHRvIGFjY29tbW9kYXRlIGZvciB0aGUgZHluYW1pc21cbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Qcm9saWZlcmF0ZSh7cmlnaHQ6IHJpZ2h0LCB0b3A6IHRvcH0sIHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQsIDMpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2xpZmVyYXRlZDogIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBwcm9saWZlcmF0ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbm9ybWFsVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZUltYWdlXCIgc3R5bGU9e3RoaXMuc3RhdGUuaW1hZ2VTdHlsZX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlXCJcbiAgICAgICAgICAgICAgICAgICAgb25Eb3VibGVDbGljaz17dGhpcy5wcm9saWZlcmF0ZX0gXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0YXRlLnN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9wPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17dGhpcy5zdGF0ZS5idXR0b25TdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaW5zcGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tem9vbS1pblwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIGdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIi8+ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICBpbnNwZWN0VmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZUltYWdlXCIgc3R5bGU9e3RoaXMuc3RhdGUuaW1hZ2VTdHlsZX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXt0aGlzLnByb2xpZmVyYXRlfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0YXRlLnN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt0aGlzLnN0YXRlLmJ1dHRvblN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaW5zcGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIGdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIi8+ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnNwZWN0XCIgc3R5bGU9e3RoaXMuc3RhdGUuaW5zcGVjdFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuZGV0YWlsc308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUuaW5zcGVjdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zcGVjdFZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbFZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iLCJ2YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG52YXIgU2xhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVzOiBbXSxcbiAgICAgICAgICAgIC8vaGFyZGNvZGUgdW50aWwgYmFja2VuZCBjYW4gYmUgaG9va2VkIHVwXG4gICAgICAgICAgICAvL05PVCBGSU5BTCwgT05MWSBGT1IgVEVTVElORyBBTkQgUFVSUE9TRVMgT0YgUFJFU0VOVEFUSU9OXG4gICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsnLFxuICAgICAgICAgICAgICAgICdIaXN0b3J5JyxcbiAgICAgICAgICAgICAgICAnTG9jYXRpb24nLFxuICAgICAgICAgICAgICAgICdFdmVudHMnLFxuICAgICAgICAgICAgICAgICdXZWF0aGVyJyxcbiAgICAgICAgICAgICAgICAnUGVyZm9ybWFuY2VzJyxcbiAgICAgICAgICAgICAgICAnQXJjaCcsXG4gICAgICAgICAgICAgICAgJ0NoZXNzJyxcbiAgICAgICAgICAgICAgICAnTmF0dXJlJyxcbiAgICAgICAgICAgICAgICAnRm91bnRhaW4nLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBhIDkuNzUtYWNyZSBwdWJsaWMgcGFyayBpbiB0aGUgTmV3IFlvcmsgQ2l0eSBuZWlnaGJvcmhvb2Qgb2YgR3JlZW53aWNoIFZpbGxhZ2UsIE1hbmhhdHRhbi4gT25lIG9mIHRoZSBiZXN0IGtub3duIG9mIE5ldyBZb3JrIENpdHlcXCdzIDEsOTAwIHB1YmxpYyBwYXJrcywgaXQgaXMgYSBsYW5kbWFyayBhcyB3ZWxsIGFzIGEgbWVldGluZyBwbGFjZSBhbmQgY2VudGVyIGZvciBjdWx0dXJhbCBhY3Rpdml0eS4gSXQgaXMgb3BlcmF0ZWQgYnkgdGhlIE5ldyBZb3JrIENpdHkgRGVwYXJ0bWVudCBvZiBQYXJrcyBhbmQgUmVjcmVhdGlvbi4nLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIG5hbWVkIGZvciBHZW9yZ2UgV2FzaGluZ3RvbiAoMTczMi0xNzk5KSwgdGhlIGNvbW1hbmRlciBvZiB0aGUgQ29udGluZW50YWwgQXJteSwgd2hvIHdhcyBpbmF1Z3VyYXRlZCBpbiBOZXcgWW9yayBDaXR5IGFzIHRoZSBmaXJzdCBQcmVzaWRlbnQgb2YgdGhlIFVuaXRlZCBTdGF0ZXMgb24gQXByaWwgMzAsIDE3ODkuICcsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgbG9jYXRlZCBkaXJlY3RseSBvbiB0aGUgaW50ZXJzZWN0aW9uIG9mIDV0aCBBdmVudWUgYW5kIFdlc3QgNHRoIFN0cmVldCwgaW4gdGhlIGhlYXJ0IG9mIExvd2VyIE1hbmhhdHRhbicsXG4gICAgICAgICAgICAgICAgJ0NocmlzdG1hcyBFdmUgQ2Fyb2xpbmcgYXQgdGhlIFdhc2hpbmd0b24gQXJjaCwgVGh1cnNkYXksIERlY2VtYmVyIDI0LCAyMDE1IGZyb20gNTowMCBwLm0uIHRvIDY6MDAgcC5tLicsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgNTYgZGVncmVlcyBGYXJlbmhlaXQgdG9kYXksIHdpdGggYSBicmlzayBicmVlemUgYW5kIGEgMTAlIGNoYW5jZSBvZiBzaG93ZXJzJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBob21lIHRvIG1hbnkgZmFtb3VzIHBhcmsgcGVyZm9ybWFuY2VzLiBUaGVyZSBhcmUgc2NvcmVzIG9mIG11c2ljaWFucyB3aG8gcGxheSBpbiB0aGUgcGFyaywgdGhlIG1vc3QgZmFtb3VzIG9mIHdob20gaXMgYXJndWFibHkgQ29sbGluIEh1Z2dpbnMsIGFsc28ga25vd24gYXMgdGhlIFwiQ3JhenkgUGlhbm8gTWFuXCInLFxuICAgICAgICAgICAgICAgICdUaGUgQXJjaCBpcyBsaWtlbHkgdGhlIG1vc3QgcmVjb2duaXphYmxlIGZlYXR1cmUgb2YgdGhlIHBhcmsuIFRoZSBBcmNoIGlzIGEgbWFyYmxlIHRyaXVtcGhhbCBhcmNoIGJ1aWx0IGluIDE4OTIgaW4gV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpbiB0aGUgR3JlZW53aWNoIFZpbGxhZ2UgbmVpZ2hib3Job29kIG9mIExvd2VyIE1hbmhhdHRhbiBpbiBOZXcgWW9yayBDaXR5LiBJdCBjZWxlYnJhdGVzIHRoZSBjZW50ZW5uaWFsIG9mIEdlb3JnZSBXYXNoaW5ndG9uXFwncyBpbmF1Z3VyYXRpb24gYXMgUHJlc2lkZW50IG9mIHRoZSBVbml0ZWQgU3RhdGVzIGluIDE3ODkgYW5kIGZvcm1zIHRoZSBncmFuZCBzb3V0aGVybiB0ZXJtaW51cyBvZiBGaWZ0aCBBdmVudWUuJyxcbiAgICAgICAgICAgICAgICAnVGhlcmUgYXJlIG1hbnkgY2hlc3MgcGxheWVycyBpbiB0aGUgUGFyay4gVGhleSBwbGF5IGluIHRoZSBsb3dlciB3ZXN0IHNpZGUgb2YgdGhlIGNvbXBsZXgsIGdlbmVyYWxseSBwbGF5aW5nIGJsaXR6IGNoZXNzIChzdWItNSBtaW51dGUgdmFyaWFudCkgYW5kIHRoZXJlIGFyZSBzb21lIG5vdGFibGUsIGV4dHJlbWVseSBoaWdoLXJhdGVkIHBsYXllcnMgdGhhdCBmcmVxdWVudCB0aGUgYXJlYScsXG4gICAgICAgICAgICAgICAgJ0F0IDkuNzUgYWNyZXMsIFdhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgb25lIG9mIHRoZSBsYXJnZXN0IGdyZWVuLCBvcGVuIHNwYWNlcyBpbiB0aGUgR3JlZW53aWNoIFZpbGxhZ2UgbmVpZ2hib3Job29kLiAgV2hpbGUgZmFtb3VzIGZvciB0aGUgZm91bnRhaW4gYW5kIGFyY2gsIHRoZSBwYXJrIGhhcyBlY29sb2dpY2FsIGFzc2V0cyB0aGF0IHdlIGZlZWwgc2hvdWxkIGJlIGhpZ2hsaWdodGVkIG1vcmUgcHJvbWluZW50bHkuIFRoZXJlIGFyZSBvdmVyIDMwIHNwZWNpZXMgb2YgdHJlZXMgYW5kIHNpbWlsYXJseSBtYW55IHZhcmlhbnRzIG9mIGJpcmRzLCBzcXVpcnJlbHMsIGFuZCBldmVuIHJhdHMgd2hpY2ggaW5oYWJpdCB0aGUgcGFyaycsXG4gICAgICAgICAgICAgICAgJ1RoZSBmb3VudGFpbiBpbiB0aGUgY2VudGVyIG9mIFdhc2hpbmd0b24gU3F1YXJlIFBhcmssIGNhbGxlZCBUaXNjaCBGb3VudGFpbiBzaW5jZSAyMDA1IG9ud2FyZHMgYWZ0ZXIgYSAyLjUgbWlsbGlvbiBkb2xsYXIgZG9uYXRpb24gZnJvbSB0aGUgVGlzY2ggRm91bmRhdGlvbiwgaXMgdGhlIGZhbW91cyAxNS1tZXRlciB3aWRlIGZvdW50YWluIHdoaWNoIGluIHN1bW1lciBtb250aHMgc3Bld3MgY2xlYXIsIGNvb2wgd2F0ZXIgZnJvbSBpdHMgbWFueSBzcG91dHMnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGltYWdlczogW1xuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2QvZGEvV2FzaGluZ3Rvbl9zcXVhcmVfcGFyay5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2IvYmUvTllDXy1fV2FzaGluZ3Rvbl9TcXVhcmVfUGFyay5KUEcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vc3RhdGljMDEubnl0LmNvbS9pbWFnZXMvMjAwOS8wOC8wNS9ib29rcy9nYXJuZXItNjAwLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9vbnRoZXNldG9mbmV3eW9yay5jb20vbG9jYXRpb25zL2lhbWxlZ2VuZC9pYW1sZWdlbmQwNC5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnRoZWZhY2ViZWF1dHkuY28udWsvYmxvZy93cC1jb250ZW50L3VwbG9hZHMvMjAxMC8xMS9jb2xkLXdlYXRoZXIuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy90aHVtYi9iL2I4L1dhc2hpbmd0b25fU3F1YXJlX25vcnRoZWFzdF9lbnRyYW5jZS5qcGcvMzI1cHgtV2FzaGluZ3Rvbl9TcXVhcmVfbm9ydGhlYXN0X2VudHJhbmNlLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9vbnRoZXJlYWxueS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDEvd2FzaGluZ3Rvbl9hcmNoXzE4OTkuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9mL2Y3L1dhc2hpbmd0b25fU3F1YXJlX1BhcmtfQ2hlc3NfUGxheWVyc19ieV9EYXZpZF9TaGFua2JvbmUuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy5nb3RoYW1nYXpldHRlLmNvbS9pbWFnZXMvZ3JhcGhpY3MvMjAxNC8wMy9XYXNoaW5ndG9uX1NxdWFyZV9QYXJrXzJfbnljZ292cGFya3Nfb3JnLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9ncmFwaGljczgubnl0aW1lcy5jb20vaW1hZ2VzLzIwMDcvMDkvMzAvbnlyZWdpb24vd2FzaDYwMC5qcGcnLFxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgLy9lbmQgb2YgaGFyZGNvZGVcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgICAgICAvL2FkZCBwYXJhbGxheCB0YW5nbCBsb2dvXG4gICAgICAgICQodGhpcy5nZXRET01Ob2RlKCkpLmRyYWdnYWJsZSgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICQoXCIjc2xhdGVcIikuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSAkKFwiI3NsYXRlXCIpLndpZHRoKCk7XG4gICAgfSxcbiAgICBuZXh0SWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnVuaXF1ZUlkID0gdGhpcy51bmlxdWVJZCB8fCAwO1xuICAgICAgICByZXR1cm4gdGhpcy51bmlxdWVJZCsrO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbihsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUubm9kZXM7XG4gICAgICAgIGlmKG5vZGUgPT0gbnVsbCAmJiBwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLm5leHRJZCgpLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuc3RhdGUudGV4dFswXSxcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiB0aGlzLnN0YXRlLmRldGFpbHNbMF0sXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgLy83NSBpcyAxLzIgbm9kZSBoZWlnaHQgYW5kIHdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLndpZHRoIC8gMiAtIDc1LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuaGVpZ2h0IC8gMiAtIDc1LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZihwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDw9IG51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5uZXh0SWQoKTtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zdGF0ZS50ZXh0W2lkICUgMTBdLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiB0aGlzLnN0YXRlLmRldGFpbHNbaWQgJSAxMF0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy53aWR0aCAvIDIgKyAzMDAgKiBNYXRoLnNpbigoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSkgLSA3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5oZWlnaHQgLyAyICsgMzAwICogTWF0aC5jb3MoKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpIC0gNzUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogbm9kZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByaWdodCA9IGxvY2F0aW9uLnJpZ2h0O1xuICAgICAgICAgICAgdmFyIHRvcCA9IGxvY2F0aW9uLnRvcDtcblxuICAgICAgICAgICAgLy9pbWFnZXMgZ29pbmcgbm9ybWFsbHksIHRleHQgYW5kIGRldGFpbHMgc2tpcHBpbmdcbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IHRoaXMubmV4dElkKCk7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuc3RhdGUudGV4dFtpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzW2lkICUgMTBdLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHJpZ2h0ICsgMzAwICogTWF0aC5zaW4oKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AgKyAzMDAgKiBNYXRoLmNvcygoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogbm9kZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOiBhcnJ9KTtcbiAgICB9LFxuICAgIGRpc3BsYWNlOiBmdW5jdGlvbihub2RlLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIHJlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IG5vZGUuc3R5bGUucmlnaHQsXG4gICAgICAgICAgICAgICAgdG9wOiBub2RlLnN0eWxlLnRvcCAtIDEwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBhbmdsZSA9IHRoaXMuZmluZEFuZ2xlKHBhcmVudCwgbm9kZSwgcmVmZXJlbmNlKTtcbiAgICAgICAgdmFyIGRpc3BsYWNlbWVudCA9IHtcbiAgICAgICAgICAgIHk6IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgICAgIHg6IE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXNwbGFjZW1lbnQ7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24obG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIC8vcHJvbGlmZXJhdGUgbmVlZHMgdG8gdGFrZSBpbiBhIG51bWJlciBwYXJhbWV0ZXIgbGF0ZXIgd2hlbiBob29raW5nIHRvIHRoZSBiYWNrZW5kXG4gICAgICAgIHRoaXMuYWRkKGxvY2F0aW9uLCBub2RlLCBwYXJlbnQsIG51bWJlcik7XG4gICAgfSxcbiAgICBmaW5kQW5nbGUocDAscDEscDIpIHtcbiAgICAgICAgdmFyIGEgPSBNYXRoLnBvdyhwMS5zdHlsZS5yaWdodC1wMC5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAxLnN0eWxlLnRvcC1wMC5zdHlsZS50b3AsMiksXG4gICAgICAgIGIgPSBNYXRoLnBvdyhwMS5zdHlsZS5yaWdodC1wMi5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAxLnN0eWxlLnRvcC1wMi5zdHlsZS50b3AsMiksXG4gICAgICAgIGMgPSBNYXRoLnBvdyhwMi5zdHlsZS5yaWdodC1wMC5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAyLnN0eWxlLnRvcC1wMC5zdHlsZS50b3AsMik7XG4gICAgICAgIFxuICAgICAgICBpZihwMS5zdHlsZS5yaWdodCA8IHAwLnN0eWxlLnJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gMiAqIE1hdGguUEkgLSBNYXRoLmFjb3MoKGErYi1jKSAvIE1hdGguc3FydCg0ICogYSAqIGIpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFjb3MoKGEgKyBiIC0gYykgLyBNYXRoLnNxcnQoNCAqIGEgKiBiKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3VGV4dCwgaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyW2ldLnRleHQgPSBuZXdUZXh0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczphcnJ9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZWFjaE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Tm9kZSBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGV9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgb25Qcm9saWZlcmF0ZT17dGhpcy5wcm9saWZlcmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUubm9kZXNbaV0uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIG5vZGU9e3RoaXMuc3RhdGUubm9kZXNbaV19XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudD17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5wYXJlbnR9XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMuc3RhdGUubm9kZXNbaSAlIDEwXS5kZXRhaWxzfVxuICAgICAgICAgICAgICAgICAgICBpbWFnZT17dGhpcy5zdGF0ZS5pbWFnZXNbaSAlIDEwXX1cbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50PXt0aGlzLmRpc3BsYWNlfVxuICAgICAgICAgICAgICAgID57bm9kZS50ZXh0fTwvTm9kZT5cbiAgICAgICAgICAgICk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGF0ZVwiIGlkPVwic2xhdGVcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5ub2Rlcy5tYXAodGhpcy5lYWNoTm9kZSl9XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuYWRkLmJpbmQobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgMSl9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2xhdGU7Il19

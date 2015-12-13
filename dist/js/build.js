(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js":[function(require,module,exports){
var Slate = require('./slate');

React.render(React.createElement(Slate, {count: 10}), 
    document.getElementById('app'));

},{"./slate":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/slate.js"}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js":[function(require,module,exports){
var Node = React.createClass({displayName: "Node",
    getInitialState: function() {
        return {
            proliferated: false,
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
        }
    },
    componentWillMount: function() {
        this.setState({parent: this.props.parent});
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
    },
    inspect: function() {
        console.log(this.props.details);
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
                this.setState({
                    imageStyle: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: this.props.style.right - 15 + 300 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                        top: this.props.style.top - 15 + 300 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
                        backgroundImage: 'url(' + this.props.image + ')',
                        backgroundSize: 'cover',
                        opacity: '0.5',
                    },
                    style: {
                        height: 180 + 'px',
                        width: 180 + 'px',
                        right: this.props.style.right - 15 + 300 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                        top: this.props.style.top - 15 + 300 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
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
                    }
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
                'WSP',
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
                'Christmas Eve Caroling at the Washington Arch, Thursday, December 24, 2015 from 5:00 p.m.–6:00 p.m.',
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
        console.log(this.width / 2);
        console.log(this.height / 2);
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
                    right: this.width / 2,
                    top: this.height / 2,
                },
            });
        } 
        else if(parent == null) {
            for(i = 1; i <= number; i++) {
                var id = this.nextId();
                arr.push({
                    id: id,
                    text: this.state.text[id],
                    details: this.state.details[id],
                    style: {
                        right: this.width / 2 + 300 * Math.sin((i / number) * 2 * Math.PI),
                        top: this.height / 2 + 300 * Math.cos((i / number) * 2 * Math.PI),
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
                    text: this.state.text[id],
                    details: this.state.details[id],
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
                    details: this.state.nodes[i].details, 
                    image: this.state.images[i], 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUk7Z0JBQ3BDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSTthQUNuQztZQUNELFVBQVUsRUFBRTtnQkFDUixNQUFNLEVBQUUsR0FBRyxHQUFHLElBQUk7Z0JBQ2xCLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENB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RSxJQUFJLENBQUMsUUFBUztnQkFDL0IsQ0FBQSxFQUFDLElBQUksQ0FBQyxJQUFZLENBQUE7Y0FDckI7S0FDVDtJQUNELE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLE9BQUEsRUFBTyxDQUFDLEVBQUEsRUFBRSxDQUFDLE9BQVEsQ0FBQSxFQUFBO2dCQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDO2dCQUNyQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGlEQUFBLEVBQWlEO29CQUMvRCxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQTtBQUN4RSxZQUFrQixDQUFBOztVQUVSO0tBQ0w7QUFDTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFNsYXRlID0gcmVxdWlyZSgnLi9zbGF0ZScpO1xuXG5SZWFjdC5yZW5kZXIoPFNsYXRlIGNvdW50PXsxMH0vPiwgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiLCJ2YXIgTm9kZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvbGlmZXJhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIGRldGFpbHM6IG51bGwsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1hZ2VTdHlsZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArICdweCcsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjI1JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhcmVudDogdGhpcy5wcm9wcy5wYXJlbnR9KTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMuZ2V0RE9NTm9kZSgpKS5kcmFnZ2FibGUoKTtcbiAgICB9LFxuICAgIGluc3BlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmRldGFpbHMpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLmluZGV4KTtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkKSB7XG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHRvcCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUucGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL2Rpc3BsYWNlIDMwMCBweCBhd2F5IGZyb20gdGhlIG5vZGUgaW4gdGhlIGFuZ2xlIGZvcm1lZCBieSB0aGUgbm9kZSBhbmQgaXRzIHBhcmVudFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0IC0gMTUgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS54ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgLSAxNSArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMC41JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgLSAxNSArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDE1ICsgMzAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9maXJlZCB0byBwcm9saWZlcmF0ZSBiZWZvcmUgcmVyZW5kZXJcbiAgICAgICAgICAgICAgICByaWdodCA9IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS54O1xuICAgICAgICAgICAgICAgIHRvcCA9IHRoaXMucHJvcHMuc3R5bGUudG9wICsgMzAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueTtcblxuICAgICAgICAgICAgICAgICQoXCIjc2xhdGVcIikuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIC8vcmlnaHQ6IHJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgLy90b3A6IHRvcCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcrPScgKyA2MDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS54ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnLT0nICsgNjAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueSArICdweCcsXG4gICAgICAgICAgICAgICAgfSwgMTAwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBjb21wbGV0ZS5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0IC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIHRoaXMucHJvcHMuaW1hZ2UgKyAnKScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjY1JyxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3ByZS1iYWNrZW5kIGhhcmRjb2RlXG4gICAgICAgICAgICAvL3doZW4gYmFja2VuZCBpcyBob29rZWQgdXAsIGVhY2ggSlNPTiBvYmplY3QgcmV0dXJuZWQgd2lsbCBiZSBzdG9yZWQgaW4gYW4gYXJyYXksIHRoZSBsZW5ndGggb2Ygd2hpY2ggaXMgdGhlIGFtb3VudCBvZiBub2RlcyB0byBiZSBjcmVhdGVkLCB0aGUgdGV4dCBpbnNpZGUgd2hpY2ggYmVpbmcgdGhlIGluZm9ybWF0aW9uIHRvIGJlIGNvbnRhaW5lZCB3aXRoaW5cbiAgICAgICAgICAgIC8vdGhpcyBvYmplY3Qgd2lsbCBiZSBpbnNlcnRlZCBpbnRvIHByb2xpZmVyYXRlLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjaGFuZ2VkIHRvIGFjY29tbW9kYXRlIGZvciB0aGUgZHluYW1pc21cbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Qcm9saWZlcmF0ZSh7cmlnaHQ6IHJpZ2h0LCB0b3A6IHRvcH0sIHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQsIDMpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2xpZmVyYXRlZDogIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBwcm9saWZlcmF0ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlSW1hZ2VcIiBzdHlsZT17dGhpcy5zdGF0ZS5pbWFnZVN0eWxlfT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXt0aGlzLnByb2xpZmVyYXRlfSBcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUuc3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt0aGlzLnN0YXRlLmJ1dHRvblN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5pbnNwZWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiLz4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZTtcbiIsInZhciBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG5cbnZhciBTbGF0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9kZXM6IFtdLFxuICAgICAgICAgICAgLy9oYXJkY29kZSB1bnRpbCBiYWNrZW5kIGNhbiBiZSBob29rZWQgdXBcbiAgICAgICAgICAgIC8vTk9UIEZJTkFMLCBPTkxZIEZPUiBURVNUSU5HIEFORCBQVVJQT1NFUyBPRiBQUkVTRU5UQVRJT05cbiAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICAnV1NQJyxcbiAgICAgICAgICAgICAgICAnSGlzdG9yeScsXG4gICAgICAgICAgICAgICAgJ0xvY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnRXZlbnRzJyxcbiAgICAgICAgICAgICAgICAnV2VhdGhlcicsXG4gICAgICAgICAgICAgICAgJ1BlcmZvcm1hbmNlcycsXG4gICAgICAgICAgICAgICAgJ0FyY2gnLFxuICAgICAgICAgICAgICAgICdDaGVzcycsXG4gICAgICAgICAgICAgICAgJ05hdHVyZScsXG4gICAgICAgICAgICAgICAgJ0ZvdW50YWluJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgYSA5Ljc1LWFjcmUgcHVibGljIHBhcmsgaW4gdGhlIE5ldyBZb3JrIENpdHkgbmVpZ2hib3Job29kIG9mIEdyZWVud2ljaCBWaWxsYWdlLCBNYW5oYXR0YW4uIE9uZSBvZiB0aGUgYmVzdCBrbm93biBvZiBOZXcgWW9yayBDaXR5XFwncyAxLDkwMCBwdWJsaWMgcGFya3MsIGl0IGlzIGEgbGFuZG1hcmsgYXMgd2VsbCBhcyBhIG1lZXRpbmcgcGxhY2UgYW5kIGNlbnRlciBmb3IgY3VsdHVyYWwgYWN0aXZpdHkuIEl0IGlzIG9wZXJhdGVkIGJ5IHRoZSBOZXcgWW9yayBDaXR5IERlcGFydG1lbnQgb2YgUGFya3MgYW5kIFJlY3JlYXRpb24uJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBuYW1lZCBmb3IgR2VvcmdlIFdhc2hpbmd0b24gKDE3MzItMTc5OSksIHRoZSBjb21tYW5kZXIgb2YgdGhlIENvbnRpbmVudGFsIEFybXksIHdobyB3YXMgaW5hdWd1cmF0ZWQgaW4gTmV3IFlvcmsgQ2l0eSBhcyB0aGUgZmlyc3QgUHJlc2lkZW50IG9mIHRoZSBVbml0ZWQgU3RhdGVzIG9uIEFwcmlsIDMwLCAxNzg5LiAnLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIGxvY2F0ZWQgZGlyZWN0bHkgb24gdGhlIGludGVyc2VjdGlvbiBvZiA1dGggQXZlbnVlIGFuZCBXZXN0IDR0aCBTdHJlZXQsIGluIHRoZSBoZWFydCBvZiBMb3dlciBNYW5oYXR0YW4nLFxuICAgICAgICAgICAgICAgICdDaHJpc3RtYXMgRXZlIENhcm9saW5nIGF0IHRoZSBXYXNoaW5ndG9uIEFyY2gsIFRodXJzZGF5LCBEZWNlbWJlciAyNCwgMjAxNSBmcm9tIDU6MDAgcC5tLuKAkzY6MDAgcC5tLicsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgNTYgZGVncmVlcyBGYXJlbmhlaXQgdG9kYXksIHdpdGggYSBicmlzayBicmVlemUgYW5kIGEgMTAlIGNoYW5jZSBvZiBzaG93ZXJzJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBob21lIHRvIG1hbnkgZmFtb3VzIHBhcmsgcGVyZm9ybWFuY2VzLiBUaGVyZSBhcmUgc2NvcmVzIG9mIG11c2ljaWFucyB3aG8gcGxheSBpbiB0aGUgcGFyaywgdGhlIG1vc3QgZmFtb3VzIG9mIHdob20gaXMgYXJndWFibHkgQ29sbGluIEh1Z2dpbnMsIGFsc28ga25vd24gYXMgdGhlIFwiQ3JhenkgUGlhbm8gTWFuXCInLFxuICAgICAgICAgICAgICAgICdUaGUgQXJjaCBpcyBsaWtlbHkgdGhlIG1vc3QgcmVjb2duaXphYmxlIGZlYXR1cmUgb2YgdGhlIHBhcmsuIFRoZSBBcmNoIGlzIGEgbWFyYmxlIHRyaXVtcGhhbCBhcmNoIGJ1aWx0IGluIDE4OTIgaW4gV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpbiB0aGUgR3JlZW53aWNoIFZpbGxhZ2UgbmVpZ2hib3Job29kIG9mIExvd2VyIE1hbmhhdHRhbiBpbiBOZXcgWW9yayBDaXR5LiBJdCBjZWxlYnJhdGVzIHRoZSBjZW50ZW5uaWFsIG9mIEdlb3JnZSBXYXNoaW5ndG9uXFwncyBpbmF1Z3VyYXRpb24gYXMgUHJlc2lkZW50IG9mIHRoZSBVbml0ZWQgU3RhdGVzIGluIDE3ODkgYW5kIGZvcm1zIHRoZSBncmFuZCBzb3V0aGVybiB0ZXJtaW51cyBvZiBGaWZ0aCBBdmVudWUuJyxcbiAgICAgICAgICAgICAgICAnVGhlcmUgYXJlIG1hbnkgY2hlc3MgcGxheWVycyBpbiB0aGUgUGFyay4gVGhleSBwbGF5IGluIHRoZSBsb3dlciB3ZXN0IHNpZGUgb2YgdGhlIGNvbXBsZXgsIGdlbmVyYWxseSBwbGF5aW5nIGJsaXR6IGNoZXNzIChzdWItNSBtaW51dGUgdmFyaWFudCkgYW5kIHRoZXJlIGFyZSBzb21lIG5vdGFibGUsIGV4dHJlbWVseSBoaWdoLXJhdGVkIHBsYXllcnMgdGhhdCBmcmVxdWVudCB0aGUgYXJlYScsXG4gICAgICAgICAgICAgICAgJ0F0IDkuNzUgYWNyZXMsIFdhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgb25lIG9mIHRoZSBsYXJnZXN0IGdyZWVuLCBvcGVuIHNwYWNlcyBpbiB0aGUgR3JlZW53aWNoIFZpbGxhZ2UgbmVpZ2hib3Job29kLiAgV2hpbGUgZmFtb3VzIGZvciB0aGUgZm91bnRhaW4gYW5kIGFyY2gsIHRoZSBwYXJrIGhhcyBlY29sb2dpY2FsIGFzc2V0cyB0aGF0IHdlIGZlZWwgc2hvdWxkIGJlIGhpZ2hsaWdodGVkIG1vcmUgcHJvbWluZW50bHkuIFRoZXJlIGFyZSBvdmVyIDMwIHNwZWNpZXMgb2YgdHJlZXMgYW5kIHNpbWlsYXJseSBtYW55IHZhcmlhbnRzIG9mIGJpcmRzLCBzcXVpcnJlbHMsIGFuZCBldmVuIHJhdHMgd2hpY2ggaW5oYWJpdCB0aGUgcGFyaycsXG4gICAgICAgICAgICAgICAgJ1RoZSBmb3VudGFpbiBpbiB0aGUgY2VudGVyIG9mIFdhc2hpbmd0b24gU3F1YXJlIFBhcmssIGNhbGxlZCBUaXNjaCBGb3VudGFpbiBzaW5jZSAyMDA1IG9ud2FyZHMgYWZ0ZXIgYSAyLjUgbWlsbGlvbiBkb2xsYXIgZG9uYXRpb24gZnJvbSB0aGUgVGlzY2ggRm91bmRhdGlvbiwgaXMgdGhlIGZhbW91cyAxNS1tZXRlciB3aWRlIGZvdW50YWluIHdoaWNoIGluIHN1bW1lciBtb250aHMgc3Bld3MgY2xlYXIsIGNvb2wgd2F0ZXIgZnJvbSBpdHMgbWFueSBzcG91dHMnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGltYWdlczogW1xuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2QvZGEvV2FzaGluZ3Rvbl9zcXVhcmVfcGFyay5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2IvYmUvTllDXy1fV2FzaGluZ3Rvbl9TcXVhcmVfUGFyay5KUEcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vc3RhdGljMDEubnl0LmNvbS9pbWFnZXMvMjAwOS8wOC8wNS9ib29rcy9nYXJuZXItNjAwLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9vbnRoZXNldG9mbmV3eW9yay5jb20vbG9jYXRpb25zL2lhbWxlZ2VuZC9pYW1sZWdlbmQwNC5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnRoZWZhY2ViZWF1dHkuY28udWsvYmxvZy93cC1jb250ZW50L3VwbG9hZHMvMjAxMC8xMS9jb2xkLXdlYXRoZXIuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy90aHVtYi9iL2I4L1dhc2hpbmd0b25fU3F1YXJlX25vcnRoZWFzdF9lbnRyYW5jZS5qcGcvMzI1cHgtV2FzaGluZ3Rvbl9TcXVhcmVfbm9ydGhlYXN0X2VudHJhbmNlLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9vbnRoZXJlYWxueS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDEvd2FzaGluZ3Rvbl9hcmNoXzE4OTkuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9mL2Y3L1dhc2hpbmd0b25fU3F1YXJlX1BhcmtfQ2hlc3NfUGxheWVyc19ieV9EYXZpZF9TaGFua2JvbmUuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy5nb3RoYW1nYXpldHRlLmNvbS9pbWFnZXMvZ3JhcGhpY3MvMjAxNC8wMy9XYXNoaW5ndG9uX1NxdWFyZV9QYXJrXzJfbnljZ292cGFya3Nfb3JnLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9ncmFwaGljczgubnl0aW1lcy5jb20vaW1hZ2VzLzIwMDcvMDkvMzAvbnlyZWdpb24vd2FzaDYwMC5qcGcnLFxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgLy9lbmQgb2YgaGFyZGNvZGVcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgICAgICAvL2FkZCBwYXJhbGxheCB0YW5nbCBsb2dvXG4gICAgICAgICQodGhpcy5nZXRET01Ob2RlKCkpLmRyYWdnYWJsZSgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICQoXCIjc2xhdGVcIikuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMud2lkdGggPSAkKFwiI3NsYXRlXCIpLndpZHRoKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMud2lkdGggLyAyKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5oZWlnaHQgLyAyKTtcbiAgICB9LFxuICAgIG5leHRJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudW5pcXVlSWQgPSB0aGlzLnVuaXF1ZUlkIHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzLnVuaXF1ZUlkKys7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKGxvY2F0aW9uLCBub2RlLCBwYXJlbnQsIG51bWJlcikge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgaWYobm9kZSA9PSBudWxsICYmIHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zdGF0ZS50ZXh0WzBdLFxuICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1swXSxcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5oZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZihwYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDw9IG51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5uZXh0SWQoKTtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zdGF0ZS50ZXh0W2lkXSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzW2lkXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLndpZHRoIC8gMiArIDMwMCAqIE1hdGguc2luKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5oZWlnaHQgLyAyICsgMzAwICogTWF0aC5jb3MoKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBsb2NhdGlvbi5yaWdodDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBsb2NhdGlvbi50b3A7XG5cbiAgICAgICAgICAgIC8vaW1hZ2VzIGdvaW5nIG5vcm1hbGx5LCB0ZXh0IGFuZCBkZXRhaWxzIHNraXBwaW5nXG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbaWRdLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiB0aGlzLnN0YXRlLmRldGFpbHNbaWRdLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHJpZ2h0ICsgMzAwICogTWF0aC5zaW4oKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AgKyAzMDAgKiBNYXRoLmNvcygoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogbm9kZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOiBhcnJ9KTtcbiAgICB9LFxuICAgIGRpc3BsYWNlOiBmdW5jdGlvbihub2RlLCBwYXJlbnQpIHtcbiAgICAgICAgdmFyIHJlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IG5vZGUuc3R5bGUucmlnaHQsXG4gICAgICAgICAgICAgICAgdG9wOiBub2RlLnN0eWxlLnRvcCAtIDEwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBhbmdsZSA9IHRoaXMuZmluZEFuZ2xlKHBhcmVudCwgbm9kZSwgcmVmZXJlbmNlKTtcbiAgICAgICAgdmFyIGRpc3BsYWNlbWVudCA9IHtcbiAgICAgICAgICAgIHk6IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgICAgIHg6IE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXNwbGFjZW1lbnQ7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24obG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIC8vcHJvbGlmZXJhdGUgbmVlZHMgdG8gdGFrZSBpbiBhIG51bWJlciBwYXJhbWV0ZXIgbGF0ZXIgd2hlbiBob29raW5nIHRvIHRoZSBiYWNrZW5kXG4gICAgICAgIHRoaXMuYWRkKGxvY2F0aW9uLCBub2RlLCBwYXJlbnQsIG51bWJlcik7XG4gICAgfSxcbiAgICBmaW5kQW5nbGUocDAscDEscDIpIHtcbiAgICAgICAgdmFyIGEgPSBNYXRoLnBvdyhwMS5zdHlsZS5yaWdodC1wMC5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAxLnN0eWxlLnRvcC1wMC5zdHlsZS50b3AsMiksXG4gICAgICAgIGIgPSBNYXRoLnBvdyhwMS5zdHlsZS5yaWdodC1wMi5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAxLnN0eWxlLnRvcC1wMi5zdHlsZS50b3AsMiksXG4gICAgICAgIGMgPSBNYXRoLnBvdyhwMi5zdHlsZS5yaWdodC1wMC5zdHlsZS5yaWdodCwyKSArIE1hdGgucG93KHAyLnN0eWxlLnRvcC1wMC5zdHlsZS50b3AsMik7XG4gICAgICAgIFxuICAgICAgICBpZihwMS5zdHlsZS5yaWdodCA8IHAwLnN0eWxlLnJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gMiAqIE1hdGguUEkgLSBNYXRoLmFjb3MoKGErYi1jKSAvIE1hdGguc3FydCg0ICogYSAqIGIpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFjb3MoKGEgKyBiIC0gYykgLyBNYXRoLnNxcnQoNCAqIGEgKiBiKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3VGV4dCwgaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyW2ldLnRleHQgPSBuZXdUZXh0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczphcnJ9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZWFjaE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Tm9kZSBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGV9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgb25Qcm9saWZlcmF0ZT17dGhpcy5wcm9saWZlcmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUubm9kZXNbaV0uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIG5vZGU9e3RoaXMuc3RhdGUubm9kZXNbaV19XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudD17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5wYXJlbnR9XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMuc3RhdGUubm9kZXNbaV0uZGV0YWlsc31cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U9e3RoaXMuc3RhdGUuaW1hZ2VzW2ldfVxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnQ9e3RoaXMuZGlzcGxhY2V9XG4gICAgICAgICAgICAgICAgPntub2RlLnRleHR9PC9Ob2RlPlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsYXRlXCIgaWQ9XCJzbGF0ZVwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5vZGVzLm1hcCh0aGlzLmVhY2hOb2RlKX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5hZGQuYmluZChudWxsLCBudWxsLCBudWxsLCBudWxsLCAxKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbGF0ZTsiXX0=

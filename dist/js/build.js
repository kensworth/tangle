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
                    left: '+=' + 300 * this.props.displacement(this.props.node, this.state.parent).x + 'px',
                    top: '-=' + 300 * this.props.displacement(this.props.node, this.state.parent).y + 'px',
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
                'http://www.gothamgazette.com/images/graphics/2014/03/Washington_Square_Park_2_nycgovparks_org.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/f/f7/Washington_Square_Park_Chess_Players_by_David_Shankbone.jpg',
                'http://ontherealny.com/wp-content/uploads/2013/01/washington_arch_1899.jpg',
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
                    right: this.width / 2 - 100,
                    top: this.height / 2 - 100,
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
                        right: this.width / 2 - 100 + 300 * Math.sin((i / number) * 2 * Math.PI),
                        top: this.height / 2 - 100 + 300 * Math.cos((i / number) * 2 * Math.PI),
                    },
                    parent: node,
                });
            }
        }
        else {
            var right = location.right;
            var top = location.top;

            for(i = 1; i <= number; i++) {
                var id = this.nextId();
                arr.push({
                    id: this.nextId(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsRUFBRyxDQUFFLENBQUE7SUFDNUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUk7Z0JBQ3BDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSTthQUNuQztZQUNELFVBQVUsRUFBRTtnQkFDUixNQUFNLEVBQUUsR0FBRyxHQUFHLElBQUk7Z0JBQ2xCLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENB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UUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0I7SUFDRCxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQzdCLElBQUksU0FBUyxHQUFHO1lBQ1osS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQ3ZCLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxZQUFZLEdBQUc7WUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQzlCLFNBQVM7O1FBRUQsT0FBTyxZQUFZLENBQUM7S0FDdkI7QUFDTCxJQUFJLFdBQVcsRUFBRSxTQUFTLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTs7UUFFbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM1QztJQUNELFNBQVMsV0FBVztRQUNoQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdGLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFFdEYsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRTthQUNJO1lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7S0FDSjtJQUNELE1BQU0sRUFBRSxTQUFTLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDM0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1FBQ2hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMvQjtJQUNELFFBQVEsRUFBRSxTQUFTLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDeEI7Z0JBQ1Esb0JBQUMsSUFBSSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxJQUFJLENBQUMsRUFBRSxFQUFDO29CQUNmLEtBQUEsRUFBSyxDQUFFLENBQUMsRUFBQztvQkFDVCxRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsTUFBTSxFQUFDO29CQUN0QixRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsTUFBTSxFQUFDO29CQUN0QixhQUFBLEVBQWEsQ0FBRSxJQUFJLENBQUMsV0FBVyxFQUFDO29CQUNoQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUM7b0JBQ2pDLElBQUEsRUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDO29CQUMxQixNQUFBLEVBQU0sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUM7b0JBQ25DLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUM7b0JBQzFDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBQztvQkFDakMsWUFBQSxFQUFZLENBQUUsSUFBSSxDQUFDLFFBQVM7Z0JBQy9CLENBQUEsRUFBQyxJQUFJLENBQUMsSUFBWSxDQUFBO2NBQ3JCO0tBQ1Q7SUFDRCxNQUFNLEVBQUUsV0FBVztRQUNmO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxPQUFBLEVBQU8sQ0FBQyxFQUFBLEVBQUUsQ0FBQyxPQUFRLENBQUEsRUFBQTtnQkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQztnQkFDckMsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxpREFBQSxFQUFpRDtvQkFDL0QsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBRSxDQUFFLENBQUE7QUFDeEUsWUFBa0IsQ0FBQTs7VUFFUjtLQUNMO0FBQ0wsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTbGF0ZSA9IHJlcXVpcmUoJy4vc2xhdGUnKTtcblxuUmVhY3QucmVuZGVyKDxTbGF0ZSBjb3VudD17MTB9Lz4sIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IiwidmFyIE5vZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2xpZmVyYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICBkZXRhaWxzOiBudWxsLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGltYWdlU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMC4yNScsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYXJlbnQ6IHRoaXMucHJvcHMucGFyZW50fSk7XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuZHJhZ2dhYmxlKCk7XG4gICAgfSxcbiAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wcm9wcy5kZXRhaWxzKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZCkge1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBudWxsO1xuXG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9kaXNwbGFjZSAzMDAgcHggYXdheSBmcm9tIHRoZSBub2RlIGluIHRoZSBhbmdsZSBmb3JtZWQgYnkgdGhlIG5vZGUgYW5kIGl0cyBwYXJlbnRcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCAtIDE1ICsgMzAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gMTUgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0IC0gMTUgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS54ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgLSAxNSArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vZmlyZWQgdG8gcHJvbGlmZXJhdGUgYmVmb3JlIHJlcmVuZGVyXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMzAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueDtcbiAgICAgICAgICAgICAgICB0b3AgPSB0aGlzLnByb3BzLnN0eWxlLnRvcCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnk7XG5cbiAgICAgICAgICAgICAgICAkKFwiI3NsYXRlXCIpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAvL3JpZ2h0OiByaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIC8vdG9wOiB0b3AgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnKz0nICsgMzAwICogdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCkueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJy09JyArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnkgKyAncHgnLFxuICAgICAgICAgICAgICAgIH0sIDEwMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBbmltYXRpb24gY29tcGxldGUuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLnByb3BzLmltYWdlICsgJyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMC42NScsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9wcmUtYmFja2VuZCBoYXJkY29kZVxuICAgICAgICAgICAgLy93aGVuIGJhY2tlbmQgaXMgaG9va2VkIHVwLCBlYWNoIEpTT04gb2JqZWN0IHJldHVybmVkIHdpbGwgYmUgc3RvcmVkIGluIGFuIGFycmF5LCB0aGUgbGVuZ3RoIG9mIHdoaWNoIGlzIHRoZSBhbW91bnQgb2Ygbm9kZXMgdG8gYmUgY3JlYXRlZCwgdGhlIHRleHQgaW5zaWRlIHdoaWNoIGJlaW5nIHRoZSBpbmZvcm1hdGlvbiB0byBiZSBjb250YWluZWQgd2l0aGluXG4gICAgICAgICAgICAvL3RoaXMgb2JqZWN0IHdpbGwgYmUgaW5zZXJ0ZWQgaW50byBwcm9saWZlcmF0ZSwgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2hhbmdlZCB0byBhY2NvbW1vZGF0ZSBmb3IgdGhlIGR5bmFtaXNtXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUHJvbGlmZXJhdGUoe3JpZ2h0OiByaWdodCwgdG9wOiB0b3B9LCB0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50LCAzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcm9saWZlcmF0ZWQ6ICF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FscmVhZHkgcHJvbGlmZXJhdGVkJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZUltYWdlXCIgc3R5bGU9e3RoaXMuc3RhdGUuaW1hZ2VTdHlsZX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlXCJcbiAgICAgICAgICAgICAgICAgICAgb25Eb3VibGVDbGljaz17dGhpcy5wcm9saWZlcmF0ZX0gXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0YXRlLnN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9wPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17dGhpcy5zdGF0ZS5idXR0b25TdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaW5zcGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tem9vbS1pblwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5yZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIGdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIi8+ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iLCJ2YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuXG52YXIgU2xhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVzOiBbXSxcbiAgICAgICAgICAgIC8vaGFyZGNvZGUgdW50aWwgYmFja2VuZCBjYW4gYmUgaG9va2VkIHVwXG4gICAgICAgICAgICAvL05PVCBGSU5BTCwgT05MWSBGT1IgVEVTVElORyBBTkQgUFVSUE9TRVMgT0YgUFJFU0VOVEFUSU9OXG4gICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgJ1dTUCcsXG4gICAgICAgICAgICAgICAgJ0hpc3RvcnknLFxuICAgICAgICAgICAgICAgICdMb2NhdGlvbicsXG4gICAgICAgICAgICAgICAgJ0V2ZW50cycsXG4gICAgICAgICAgICAgICAgJ1dlYXRoZXInLFxuICAgICAgICAgICAgICAgICdQZXJmb3JtYW5jZXMnLFxuICAgICAgICAgICAgICAgICdBcmNoJyxcbiAgICAgICAgICAgICAgICAnQ2hlc3MnLFxuICAgICAgICAgICAgICAgICdOYXR1cmUnLFxuICAgICAgICAgICAgICAgICdGb3VudGFpbicsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIGEgOS43NS1hY3JlIHB1YmxpYyBwYXJrIGluIHRoZSBOZXcgWW9yayBDaXR5IG5laWdoYm9yaG9vZCBvZiBHcmVlbndpY2ggVmlsbGFnZSwgTWFuaGF0dGFuLiBPbmUgb2YgdGhlIGJlc3Qga25vd24gb2YgTmV3IFlvcmsgQ2l0eVxcJ3MgMSw5MDAgcHVibGljIHBhcmtzLCBpdCBpcyBhIGxhbmRtYXJrIGFzIHdlbGwgYXMgYSBtZWV0aW5nIHBsYWNlIGFuZCBjZW50ZXIgZm9yIGN1bHR1cmFsIGFjdGl2aXR5LiBJdCBpcyBvcGVyYXRlZCBieSB0aGUgTmV3IFlvcmsgQ2l0eSBEZXBhcnRtZW50IG9mIFBhcmtzIGFuZCBSZWNyZWF0aW9uLicsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgbmFtZWQgZm9yIEdlb3JnZSBXYXNoaW5ndG9uICgxNzMyLTE3OTkpLCB0aGUgY29tbWFuZGVyIG9mIHRoZSBDb250aW5lbnRhbCBBcm15LCB3aG8gd2FzIGluYXVndXJhdGVkIGluIE5ldyBZb3JrIENpdHkgYXMgdGhlIGZpcnN0IFByZXNpZGVudCBvZiB0aGUgVW5pdGVkIFN0YXRlcyBvbiBBcHJpbCAzMCwgMTc4OS4gJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBsb2NhdGVkIGRpcmVjdGx5IG9uIHRoZSBpbnRlcnNlY3Rpb24gb2YgNXRoIEF2ZW51ZSBhbmQgV2VzdCA0dGggU3RyZWV0LCBpbiB0aGUgaGVhcnQgb2YgTG93ZXIgTWFuaGF0dGFuJyxcbiAgICAgICAgICAgICAgICAnQ2hyaXN0bWFzIEV2ZSBDYXJvbGluZyBhdCB0aGUgV2FzaGluZ3RvbiBBcmNoLCBUaHVyc2RheSwgRGVjZW1iZXIgMjQsIDIwMTUgZnJvbSA1OjAwIHAubS7igJM2OjAwIHAubS4nLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIDU2IGRlZ3JlZXMgRmFyZW5oZWl0IHRvZGF5LCB3aXRoIGEgYnJpc2sgYnJlZXplIGFuZCBhIDEwJSBjaGFuY2Ugb2Ygc2hvd2VycycsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgaG9tZSB0byBtYW55IGZhbW91cyBwYXJrIHBlcmZvcm1hbmNlcy4gVGhlcmUgYXJlIHNjb3JlcyBvZiBtdXNpY2lhbnMgd2hvIHBsYXkgaW4gdGhlIHBhcmssIHRoZSBtb3N0IGZhbW91cyBvZiB3aG9tIGlzIGFyZ3VhYmx5IENvbGxpbiBIdWdnaW5zLCBhbHNvIGtub3duIGFzIHRoZSBcIkNyYXp5IFBpYW5vIE1hblwiJyxcbiAgICAgICAgICAgICAgICAnVGhlIEFyY2ggaXMgbGlrZWx5IHRoZSBtb3N0IHJlY29nbml6YWJsZSBmZWF0dXJlIG9mIHRoZSBwYXJrLiBUaGUgQXJjaCBpcyBhIG1hcmJsZSB0cml1bXBoYWwgYXJjaCBidWlsdCBpbiAxODkyIGluIFdhc2hpbmd0b24gU3F1YXJlIFBhcmsgaW4gdGhlIEdyZWVud2ljaCBWaWxsYWdlIG5laWdoYm9yaG9vZCBvZiBMb3dlciBNYW5oYXR0YW4gaW4gTmV3IFlvcmsgQ2l0eS4gSXQgY2VsZWJyYXRlcyB0aGUgY2VudGVubmlhbCBvZiBHZW9yZ2UgV2FzaGluZ3RvblxcJ3MgaW5hdWd1cmF0aW9uIGFzIFByZXNpZGVudCBvZiB0aGUgVW5pdGVkIFN0YXRlcyBpbiAxNzg5IGFuZCBmb3JtcyB0aGUgZ3JhbmQgc291dGhlcm4gdGVybWludXMgb2YgRmlmdGggQXZlbnVlLicsXG4gICAgICAgICAgICAgICAgJ1RoZXJlIGFyZSBtYW55IGNoZXNzIHBsYXllcnMgaW4gdGhlIFBhcmsuIFRoZXkgcGxheSBpbiB0aGUgbG93ZXIgd2VzdCBzaWRlIG9mIHRoZSBjb21wbGV4LCBnZW5lcmFsbHkgcGxheWluZyBibGl0eiBjaGVzcyAoc3ViLTUgbWludXRlIHZhcmlhbnQpIGFuZCB0aGVyZSBhcmUgc29tZSBub3RhYmxlLCBleHRyZW1lbHkgaGlnaC1yYXRlZCBwbGF5ZXJzIHRoYXQgZnJlcXVlbnQgdGhlIGFyZWEnLFxuICAgICAgICAgICAgICAgICdBdCA5Ljc1IGFjcmVzLCBXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIG9uZSBvZiB0aGUgbGFyZ2VzdCBncmVlbiwgb3BlbiBzcGFjZXMgaW4gdGhlIEdyZWVud2ljaCBWaWxsYWdlIG5laWdoYm9yaG9vZC4gIFdoaWxlIGZhbW91cyBmb3IgdGhlIGZvdW50YWluIGFuZCBhcmNoLCB0aGUgcGFyayBoYXMgZWNvbG9naWNhbCBhc3NldHMgdGhhdCB3ZSBmZWVsIHNob3VsZCBiZSBoaWdobGlnaHRlZCBtb3JlIHByb21pbmVudGx5LiBUaGVyZSBhcmUgb3ZlciAzMCBzcGVjaWVzIG9mIHRyZWVzIGFuZCBzaW1pbGFybHkgbWFueSB2YXJpYW50cyBvZiBiaXJkcywgc3F1aXJyZWxzLCBhbmQgZXZlbiByYXRzIHdoaWNoIGluaGFiaXQgdGhlIHBhcmsnLFxuICAgICAgICAgICAgICAgICdUaGUgZm91bnRhaW4gaW4gdGhlIGNlbnRlciBvZiBXYXNoaW5ndG9uIFNxdWFyZSBQYXJrLCBjYWxsZWQgVGlzY2ggRm91bnRhaW4gc2luY2UgMjAwNSBvbndhcmRzIGFmdGVyIGEgMi41IG1pbGxpb24gZG9sbGFyIGRvbmF0aW9uIGZyb20gdGhlIFRpc2NoIEZvdW5kYXRpb24sIGlzIHRoZSBmYW1vdXMgMTUtbWV0ZXIgd2lkZSBmb3VudGFpbiB3aGljaCBpbiBzdW1tZXIgbW9udGhzIHNwZXdzIGNsZWFyLCBjb29sIHdhdGVyIGZyb20gaXRzIG1hbnkgc3BvdXRzJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbWFnZXM6IFtcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9kL2RhL1dhc2hpbmd0b25fc3F1YXJlX3BhcmsuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9iL2JlL05ZQ18tX1dhc2hpbmd0b25fU3F1YXJlX1BhcmsuSlBHJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3N0YXRpYzAxLm55dC5jb20vaW1hZ2VzLzIwMDkvMDgvMDUvYm9va3MvZ2FybmVyLTYwMC5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vb250aGVzZXRvZm5ld3lvcmsuY29tL2xvY2F0aW9ucy9pYW1sZWdlbmQvaWFtbGVnZW5kMDQuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy50aGVmYWNlYmVhdXR5LmNvLnVrL2Jsb2cvd3AtY29udGVudC91cGxvYWRzLzIwMTAvMTEvY29sZC13ZWF0aGVyLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvYi9iOC9XYXNoaW5ndG9uX1NxdWFyZV9ub3J0aGVhc3RfZW50cmFuY2UuanBnLzMyNXB4LVdhc2hpbmd0b25fU3F1YXJlX25vcnRoZWFzdF9lbnRyYW5jZS5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LmdvdGhhbWdhemV0dGUuY29tL2ltYWdlcy9ncmFwaGljcy8yMDE0LzAzL1dhc2hpbmd0b25fU3F1YXJlX1BhcmtfMl9ueWNnb3ZwYXJrc19vcmcuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9mL2Y3L1dhc2hpbmd0b25fU3F1YXJlX1BhcmtfQ2hlc3NfUGxheWVyc19ieV9EYXZpZF9TaGFua2JvbmUuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL29udGhlcmVhbG55LmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMy8wMS93YXNoaW5ndG9uX2FyY2hfMTg5OS5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vZ3JhcGhpY3M4Lm55dGltZXMuY29tL2ltYWdlcy8yMDA3LzA5LzMwL255cmVnaW9uL3dhc2g2MDAuanBnJyxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIC8vZW5kIG9mIGhhcmRjb2RlXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hZGQgcGFyYWxsYXggdGFuZ2wgbG9nb1xuICAgICAgICAkKHRoaXMuZ2V0RE9NTm9kZSgpKS5kcmFnZ2FibGUoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAkKFwiI3NsYXRlXCIpLmhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gJChcIiNzbGF0ZVwiKS53aWR0aCgpO1xuICAgIH0sXG4gICAgbmV4dElkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHRoaXMudW5pcXVlSWQgfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlSWQrKztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24obG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBpZihub2RlID09IG51bGwgJiYgcGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbMF0sXG4gICAgICAgICAgICAgICAgZGV0YWlsczogdGhpcy5zdGF0ZS5kZXRhaWxzWzBdLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLndpZHRoIC8gMiAtIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAvIDIgLSAxMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbaWQgJSAxMF0sXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1tpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLndpZHRoIC8gMiAtIDEwMCArIDMwMCAqIE1hdGguc2luKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5oZWlnaHQgLyAyIC0gMTAwICsgMzAwICogTWF0aC5jb3MoKGkgLyBudW1iZXIpICogMiAqIE1hdGguUEkpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBsb2NhdGlvbi5yaWdodDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBsb2NhdGlvbi50b3A7XG5cbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSBudW1iZXI7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IHRoaXMubmV4dElkKCk7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5uZXh0SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zdGF0ZS50ZXh0W2lkICUgMTBdLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiB0aGlzLnN0YXRlLmRldGFpbHNbaWQgJSAxMF0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogcmlnaHQgKyAzMDAgKiBNYXRoLnNpbigoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArIDMwMCAqIE1hdGguY29zKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZGlzcGxhY2U6IGZ1bmN0aW9uKG5vZGUsIHBhcmVudCkge1xuICAgICAgICB2YXIgcmVmZXJlbmNlID0ge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICByaWdodDogbm9kZS5zdHlsZS5yaWdodCxcbiAgICAgICAgICAgICAgICB0b3A6IG5vZGUuc3R5bGUudG9wIC0gMTAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuZ2xlID0gdGhpcy5maW5kQW5nbGUocGFyZW50LCBub2RlLCByZWZlcmVuY2UpO1xuICAgICAgICB2YXIgZGlzcGxhY2VtZW50ID0ge1xuICAgICAgICAgICAgeTogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICAgICAgeDogTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpc3BsYWNlbWVudDtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbihsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgLy9wcm9saWZlcmF0ZSBuZWVkcyB0byB0YWtlIGluIGEgbnVtYmVyIHBhcmFtZXRlciBsYXRlciB3aGVuIGhvb2tpbmcgdG8gdGhlIGJhY2tlbmRcbiAgICAgICAgdGhpcy5hZGQobG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKTtcbiAgICB9LFxuICAgIGZpbmRBbmdsZShwMCxwMSxwMikge1xuICAgICAgICB2YXIgYSA9IE1hdGgucG93KHAxLnN0eWxlLnJpZ2h0LXAwLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDEuc3R5bGUudG9wLXAwLnN0eWxlLnRvcCwyKSxcbiAgICAgICAgYiA9IE1hdGgucG93KHAxLnN0eWxlLnJpZ2h0LXAyLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDEuc3R5bGUudG9wLXAyLnN0eWxlLnRvcCwyKSxcbiAgICAgICAgYyA9IE1hdGgucG93KHAyLnN0eWxlLnJpZ2h0LXAwLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDIuc3R5bGUudG9wLXAwLnN0eWxlLnRvcCwyKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHAxLnN0eWxlLnJpZ2h0IDwgcDAuc3R5bGUucmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiAyICogTWF0aC5QSSAtIE1hdGguYWNvcygoYStiLWMpIC8gTWF0aC5zcXJ0KDQgKiBhICogYikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWNvcygoYSArIGIgLSBjKSAvIE1hdGguc3FydCg0ICogYSAqIGIpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihuZXdUZXh0LCBpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnJbaV0udGV4dCA9IG5ld1RleHQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOmFycn0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBlYWNoTm9kZTogZnVuY3Rpb24obm9kZSwgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxOb2RlIGtleT17bm9kZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICBvblByb2xpZmVyYXRlPXt0aGlzLnByb2xpZmVyYXRlfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgbm9kZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXX1cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50PXt0aGlzLnN0YXRlLm5vZGVzW2ldLnBhcmVudH1cbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5zdGF0ZS5ub2Rlc1tpICUgMTBdLmRldGFpbHN9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlPXt0aGlzLnN0YXRlLmltYWdlc1tpICUgMTBdfVxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnQ9e3RoaXMuZGlzcGxhY2V9XG4gICAgICAgICAgICAgICAgPntub2RlLnRleHR9PC9Ob2RlPlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsYXRlXCIgaWQ9XCJzbGF0ZVwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5vZGVzLm1hcCh0aGlzLmVhY2hOb2RlKX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5hZGQuYmluZChudWxsLCBudWxsLCBudWxsLCBudWxsLCAxKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbGF0ZTsiXX0=

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/inspector.js":[function(require,module,exports){
var Inspector = React.createClass({displayName: "Inspector",
	getInitialState: function() {
        return {
            inspectStyle: {
                right: this.props.style.right + 155 + 'px',
                top: this.props.style.top + 5 + 'px',
            }
        }
    },
    render: function() {
    	return (
    		React.createElement("div", {className: "inspect", style: this.state.inspectStyle}, 
                React.createElement("p", null, this.props.details)
            )
    	);
    }
});

module.exports = Inspector;

},{}],"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js":[function(require,module,exports){
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
            /*inspectStyle: {
                right: this.props.style.right + 155 + 'px',
                top: this.props.style.top + 5 + 'px',
            }*/
        }
    },
    componentWillMount: function() {
        this.setState({parent: this.props.parent});
    },
    inspect: function() {
        this.setState({inspecting: !this.state.inspecting});
        var inspecting = !this.state.inspecting;
        if(inspecting) {
            this.props.onInspect(this.props.index);
        }
        else {
            this.props.removeInspect(this.props.index);
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
                    /*inspectStyle: {
                        right: style.right + 170 + 300 * displacement.x + 'px',
                        top: style.top + 5 + 300 * displacement.y + 'px',
                    },*/
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
                    /*inspectStyle: {
                        right: this.props.style.right + 170 + 'px',
                        top: this.props.style.top + 5 + 'px',
                    },*/
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
var Inspector = require('./inspector');

var Slate = React.createClass({displayName: "Slate",
    getInitialState: function() {
        return {
            nodes: [],
            inspects: [],
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
        var arr = this.state.inspects;
        arr.splice(i, 1);
        this.setState({nodes: arr});
    },
    inspect: function(i) {
        var arr = this.state.inspects;
        arr.push(this.state.nodes[i]);
        this.setState({inspects: arr});
        console.log(this.state.inspects);
    },
    removeInspect: function(i) {
        var arr = this.state.inspects;
        arr.splice(i, 1);
        this.setState({inspects: arr});
    },
    eachInspect: function(node, i) {
        return (
            React.createElement(Inspector, {
                style: this.state.inspects[i].style, 
                details: this.state.inspects[i].details
                }
            )
        );
    },
    eachNode: function(node, i) {
        return (
                React.createElement(Node, {
                    key: node.id, 
                    index: i, 
                    onChange: this.update, 
                    onRemove: this.remove, 
                    onInspect: this.inspect, 
                    removeInspect: this.removeInspect, 
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
                this.state.inspects.map(this.eachInspect), 
                React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", 
                    onClick: this.add.bind(null, null, null, null, 1)})
            )

        );
    }
});

module.exports = Slate;

},{"./inspector":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/inspector.js","./node":"/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/node.js"}]},{},["/Users/kennethzhang/Dropbox/Code/Sites/react-web/src/js/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL2luc3BlY3Rvci5qcyIsIi9Vc2Vycy9rZW5uZXRoemhhbmcvRHJvcGJveC9Db2RlL1NpdGVzL3JlYWN0LXdlYi9zcmMvanMvbWFpbi5qcyIsIi9Vc2Vycy9rZW5uZXRoemhhbmcvRHJvcGJveC9Db2RlL1NpdGVzL3JlYWN0LXdlYi9zcmMvanMvbm9kZS5qcyIsIi9Vc2Vycy9rZW5uZXRoemhhbmcvRHJvcGJveC9Db2RlL1NpdGVzL3JlYWN0LXdlYi9zcmMvanMvc2xhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLCtCQUErQix5QkFBQTtDQUNsQyxlQUFlLEVBQUUsV0FBVztRQUNyQixPQUFPO1lBQ0gsWUFBWSxFQUFFO2dCQUNWLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUk7Z0JBQzFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUk7YUFDdkM7U0FDSjtLQUNKO0lBQ0QsTUFBTSxFQUFFLFdBQVc7S0FDbEI7TUFDQyxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFNBQUEsRUFBUyxDQUFDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBYyxDQUFBLEVBQUE7Z0JBQy9DLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFZLENBQUE7WUFDekIsQ0FBQTtPQUNYO0tBQ0Y7QUFDTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVM7OztBQ2xCMUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNB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QUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxZQUFZLEdBQUc7WUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQzlCLFNBQVM7O1FBRUQsT0FBTyxZQUFZLENBQUM7S0FDdkI7QUFDTCxJQUFJLFdBQVcsRUFBRSxTQUFTLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTs7UUFFbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM1QztJQUNELFNBQVMsV0FBVztRQUNoQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdGLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcs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LEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGlEQUFBLEVBQWlEO29CQUMvRCxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQTtBQUN4RSxZQUFrQixDQUFBOztVQUVSO0tBQ0w7QUFDTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEluc3BlY3RvciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTU1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgNSArICdweCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgXHRyZXR1cm4gKFxuICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImluc3BlY3RcIiBzdHlsZT17dGhpcy5zdGF0ZS5pbnNwZWN0U3R5bGV9PlxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmRldGFpbHN9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgXHQpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluc3BlY3RvcjsiLCJ2YXIgU2xhdGUgPSByZXF1aXJlKCcuL3NsYXRlJyk7XG5cblJlYWN0LnJlbmRlcig8U2xhdGUgY291bnQ9ezEwfS8+LCBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyIsInZhciBOb2RlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcm9saWZlcmF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaW5zcGVjdGluZzogZmFsc2UsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICBkZXRhaWxzOiBudWxsLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGltYWdlU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMC4yNScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyppbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICByaWdodDogdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDE1NSArICdweCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArIDUgKyAncHgnLFxuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhcmVudDogdGhpcy5wcm9wcy5wYXJlbnR9KTtcbiAgICB9LFxuICAgIGluc3BlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnNwZWN0aW5nOiAhdGhpcy5zdGF0ZS5pbnNwZWN0aW5nfSk7XG4gICAgICAgIHZhciBpbnNwZWN0aW5nID0gIXRoaXMuc3RhdGUuaW5zcGVjdGluZztcbiAgICAgICAgaWYoaW5zcGVjdGluZykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkluc3BlY3QodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92ZUluc3BlY3QodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZCkge1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBudWxsO1xuXG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9kaXNwbGFjZSAzMDAgcHggYXdheSBmcm9tIHRoZSBub2RlIGluIHRoZSBhbmdsZSBmb3JtZWQgYnkgdGhlIG5vZGUgYW5kIGl0cyBwYXJlbnRcbiAgICAgICAgICAgICAgICB2YXIgZGlzcGxhY2VtZW50ID0gdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5wcm9wcy5zdHlsZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogc3R5bGUucmlnaHQgLSAxNSArIDMwMCAqIGRpc3BsYWNlbWVudC54ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogc3R5bGUudG9wIC0gMTUgKyAzMDAgKiBkaXNwbGFjZW1lbnQueSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIHRoaXMucHJvcHMuaW1hZ2UgKyAnKScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogc3R5bGUucmlnaHQgLSAxNSArIDMwMCAqIGRpc3BsYWNlbWVudC54ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogc3R5bGUudG9wIC0gMTUgKyAzMDAgKiBkaXNwbGFjZW1lbnQueSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8qaW5zcGVjdFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogc3R5bGUucmlnaHQgKyAxNzAgKyAzMDAgKiBkaXNwbGFjZW1lbnQueCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlLnRvcCArIDUgKyAzMDAgKiBkaXNwbGFjZW1lbnQueSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIH0sKi9cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL2ZpcmVkIHRvIHByb2xpZmVyYXRlIGJlZm9yZSByZXJlbmRlclxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLng7XG4gICAgICAgICAgICAgICAgdG9wID0gdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55O1xuXG4gICAgICAgICAgICAgICAgJChcIiNzbGF0ZVwiKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgLy9yaWdodDogcmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAvL3RvcDogdG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJys9JyArIDYwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICctPScgKyA2MDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGNvbXBsZXRlLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0IC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNjUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvKmluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAxNzAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCArIDUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LCovXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcHJlLWJhY2tlbmQgaGFyZGNvZGVcbiAgICAgICAgICAgIC8vd2hlbiBiYWNrZW5kIGlzIGhvb2tlZCB1cCwgZWFjaCBKU09OIG9iamVjdCByZXR1cm5lZCB3aWxsIGJlIHN0b3JlZCBpbiBhbiBhcnJheSwgdGhlIGxlbmd0aCBvZiB3aGljaCBpcyB0aGUgYW1vdW50IG9mIG5vZGVzIHRvIGJlIGNyZWF0ZWQsIHRoZSB0ZXh0IGluc2lkZSB3aGljaCBiZWluZyB0aGUgaW5mb3JtYXRpb24gdG8gYmUgY29udGFpbmVkIHdpdGhpblxuICAgICAgICAgICAgLy90aGlzIG9iamVjdCB3aWxsIGJlIGluc2VydGVkIGludG8gcHJvbGlmZXJhdGUsIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNoYW5nZWQgdG8gYWNjb21tb2RhdGUgZm9yIHRoZSBkeW5hbWlzbVxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblByb2xpZmVyYXRlKHtyaWdodDogcmlnaHQsIHRvcDogdG9wfSwgdGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCwgMyk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJvbGlmZXJhdGVkOiAhdGhpcy5zdGF0ZS5wcm9saWZlcmF0ZWR9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbHJlYWR5IHByb2xpZmVyYXRlZCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVJbWFnZVwiIHN0eWxlPXt0aGlzLnN0YXRlLmltYWdlU3R5bGV9PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9e3RoaXMucHJvbGlmZXJhdGV9IFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5zdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3RoaXMuc3RhdGUuYnV0dG9uU3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmluc3BlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBnbHlwaGljb24gZ2x5cGhpY29uLXpvb20taW5cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCIvPiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iLCJ2YXIgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xudmFyIEluc3BlY3RvciA9IHJlcXVpcmUoJy4vaW5zcGVjdG9yJyk7XG5cbnZhciBTbGF0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9kZXM6IFtdLFxuICAgICAgICAgICAgaW5zcGVjdHM6IFtdLFxuICAgICAgICAgICAgLy9oYXJkY29kZSB1bnRpbCBiYWNrZW5kIGNhbiBiZSBob29rZWQgdXBcbiAgICAgICAgICAgIC8vTk9UIEZJTkFMLCBPTkxZIEZPUiBURVNUSU5HIEFORCBQVVJQT1NFUyBPRiBQUkVTRU5UQVRJT05cbiAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyaycsXG4gICAgICAgICAgICAgICAgJ0hpc3RvcnknLFxuICAgICAgICAgICAgICAgICdMb2NhdGlvbicsXG4gICAgICAgICAgICAgICAgJ0V2ZW50cycsXG4gICAgICAgICAgICAgICAgJ1dlYXRoZXInLFxuICAgICAgICAgICAgICAgICdQZXJmb3JtYW5jZXMnLFxuICAgICAgICAgICAgICAgICdBcmNoJyxcbiAgICAgICAgICAgICAgICAnQ2hlc3MnLFxuICAgICAgICAgICAgICAgICdOYXR1cmUnLFxuICAgICAgICAgICAgICAgICdGb3VudGFpbicsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIGEgOS43NS1hY3JlIHB1YmxpYyBwYXJrIGluIHRoZSBOZXcgWW9yayBDaXR5IG5laWdoYm9yaG9vZCBvZiBHcmVlbndpY2ggVmlsbGFnZSwgTWFuaGF0dGFuLiBPbmUgb2YgdGhlIGJlc3Qga25vd24gb2YgTmV3IFlvcmsgQ2l0eVxcJ3MgMSw5MDAgcHVibGljIHBhcmtzLCBpdCBpcyBhIGxhbmRtYXJrIGFzIHdlbGwgYXMgYSBtZWV0aW5nIHBsYWNlIGFuZCBjZW50ZXIgZm9yIGN1bHR1cmFsIGFjdGl2aXR5LiBJdCBpcyBvcGVyYXRlZCBieSB0aGUgTmV3IFlvcmsgQ2l0eSBEZXBhcnRtZW50IG9mIFBhcmtzIGFuZCBSZWNyZWF0aW9uLicsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgbmFtZWQgZm9yIEdlb3JnZSBXYXNoaW5ndG9uICgxNzMyLTE3OTkpLCB0aGUgY29tbWFuZGVyIG9mIHRoZSBDb250aW5lbnRhbCBBcm15LCB3aG8gd2FzIGluYXVndXJhdGVkIGluIE5ldyBZb3JrIENpdHkgYXMgdGhlIGZpcnN0IFByZXNpZGVudCBvZiB0aGUgVW5pdGVkIFN0YXRlcyBvbiBBcHJpbCAzMCwgMTc4OS4gJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBsb2NhdGVkIGRpcmVjdGx5IG9uIHRoZSBpbnRlcnNlY3Rpb24gb2YgNXRoIEF2ZW51ZSBhbmQgV2VzdCA0dGggU3RyZWV0LCBpbiB0aGUgaGVhcnQgb2YgTG93ZXIgTWFuaGF0dGFuJyxcbiAgICAgICAgICAgICAgICAnQ2hyaXN0bWFzIEV2ZSBDYXJvbGluZyBhdCB0aGUgV2FzaGluZ3RvbiBBcmNoLCBUaHVyc2RheSwgRGVjZW1iZXIgMjQsIDIwMTUgZnJvbSA1OjAwIHAubS4gdG8gNjowMCBwLm0uJyxcbiAgICAgICAgICAgICAgICAnV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyA1NiBkZWdyZWVzIEZhcmVuaGVpdCB0b2RheSwgd2l0aCBhIGJyaXNrIGJyZWV6ZSBhbmQgYSAxMCUgY2hhbmNlIG9mIHNob3dlcnMnLFxuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGlzIGhvbWUgdG8gbWFueSBmYW1vdXMgcGFyayBwZXJmb3JtYW5jZXMuIFRoZXJlIGFyZSBzY29yZXMgb2YgbXVzaWNpYW5zIHdobyBwbGF5IGluIHRoZSBwYXJrLCB0aGUgbW9zdCBmYW1vdXMgb2Ygd2hvbSBpcyBhcmd1YWJseSBDb2xsaW4gSHVnZ2lucywgYWxzbyBrbm93biBhcyB0aGUgXCJDcmF6eSBQaWFubyBNYW5cIicsXG4gICAgICAgICAgICAgICAgJ1RoZSBBcmNoIGlzIGxpa2VseSB0aGUgbW9zdCByZWNvZ25pemFibGUgZmVhdHVyZSBvZiB0aGUgcGFyay4gVGhlIEFyY2ggaXMgYSBtYXJibGUgdHJpdW1waGFsIGFyY2ggYnVpbHQgaW4gMTg5MiBpbiBXYXNoaW5ndG9uIFNxdWFyZSBQYXJrIGluIHRoZSBHcmVlbndpY2ggVmlsbGFnZSBuZWlnaGJvcmhvb2Qgb2YgTG93ZXIgTWFuaGF0dGFuIGluIE5ldyBZb3JrIENpdHkuIEl0IGNlbGVicmF0ZXMgdGhlIGNlbnRlbm5pYWwgb2YgR2VvcmdlIFdhc2hpbmd0b25cXCdzIGluYXVndXJhdGlvbiBhcyBQcmVzaWRlbnQgb2YgdGhlIFVuaXRlZCBTdGF0ZXMgaW4gMTc4OSBhbmQgZm9ybXMgdGhlIGdyYW5kIHNvdXRoZXJuIHRlcm1pbnVzIG9mIEZpZnRoIEF2ZW51ZS4nLFxuICAgICAgICAgICAgICAgICdUaGVyZSBhcmUgbWFueSBjaGVzcyBwbGF5ZXJzIGluIHRoZSBQYXJrLiBUaGV5IHBsYXkgaW4gdGhlIGxvd2VyIHdlc3Qgc2lkZSBvZiB0aGUgY29tcGxleCwgZ2VuZXJhbGx5IHBsYXlpbmcgYmxpdHogY2hlc3MgKHN1Yi01IG1pbnV0ZSB2YXJpYW50KSBhbmQgdGhlcmUgYXJlIHNvbWUgbm90YWJsZSwgZXh0cmVtZWx5IGhpZ2gtcmF0ZWQgcGxheWVycyB0aGF0IGZyZXF1ZW50IHRoZSBhcmVhJyxcbiAgICAgICAgICAgICAgICAnQXQgOS43NSBhY3JlcywgV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpcyBvbmUgb2YgdGhlIGxhcmdlc3QgZ3JlZW4sIG9wZW4gc3BhY2VzIGluIHRoZSBHcmVlbndpY2ggVmlsbGFnZSBuZWlnaGJvcmhvb2QuICBXaGlsZSBmYW1vdXMgZm9yIHRoZSBmb3VudGFpbiBhbmQgYXJjaCwgdGhlIHBhcmsgaGFzIGVjb2xvZ2ljYWwgYXNzZXRzIHRoYXQgd2UgZmVlbCBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgbW9yZSBwcm9taW5lbnRseS4gVGhlcmUgYXJlIG92ZXIgMzAgc3BlY2llcyBvZiB0cmVlcyBhbmQgc2ltaWxhcmx5IG1hbnkgdmFyaWFudHMgb2YgYmlyZHMsIHNxdWlycmVscywgYW5kIGV2ZW4gcmF0cyB3aGljaCBpbmhhYml0IHRoZSBwYXJrJyxcbiAgICAgICAgICAgICAgICAnVGhlIGZvdW50YWluIGluIHRoZSBjZW50ZXIgb2YgV2FzaGluZ3RvbiBTcXVhcmUgUGFyaywgY2FsbGVkIFRpc2NoIEZvdW50YWluIHNpbmNlIDIwMDUgb253YXJkcyBhZnRlciBhIDIuNSBtaWxsaW9uIGRvbGxhciBkb25hdGlvbiBmcm9tIHRoZSBUaXNjaCBGb3VuZGF0aW9uLCBpcyB0aGUgZmFtb3VzIDE1LW1ldGVyIHdpZGUgZm91bnRhaW4gd2hpY2ggaW4gc3VtbWVyIG1vbnRocyBzcGV3cyBjbGVhciwgY29vbCB3YXRlciBmcm9tIGl0cyBtYW55IHNwb3V0cycsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW1hZ2VzOiBbXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvZC9kYS9XYXNoaW5ndG9uX3NxdWFyZV9wYXJrLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvYi9iZS9OWUNfLV9XYXNoaW5ndG9uX1NxdWFyZV9QYXJrLkpQRycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9zdGF0aWMwMS5ueXQuY29tL2ltYWdlcy8yMDA5LzA4LzA1L2Jvb2tzL2dhcm5lci02MDAuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL29udGhlc2V0b2ZuZXd5b3JrLmNvbS9sb2NhdGlvbnMvaWFtbGVnZW5kL2lhbWxlZ2VuZDA0LmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudGhlZmFjZWJlYXV0eS5jby51ay9ibG9nL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEwLzExL2NvbGQtd2VhdGhlci5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL3RodW1iL2IvYjgvV2FzaGluZ3Rvbl9TcXVhcmVfbm9ydGhlYXN0X2VudHJhbmNlLmpwZy8zMjVweC1XYXNoaW5ndG9uX1NxdWFyZV9ub3J0aGVhc3RfZW50cmFuY2UuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL29udGhlcmVhbG55LmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMy8wMS93YXNoaW5ndG9uX2FyY2hfMTg5OS5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2YvZjcvV2FzaGluZ3Rvbl9TcXVhcmVfUGFya19DaGVzc19QbGF5ZXJzX2J5X0RhdmlkX1NoYW5rYm9uZS5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LmdvdGhhbWdhemV0dGUuY29tL2ltYWdlcy9ncmFwaGljcy8yMDE0LzAzL1dhc2hpbmd0b25fU3F1YXJlX1BhcmtfMl9ueWNnb3ZwYXJrc19vcmcuanBnJyxcbiAgICAgICAgICAgICAgICAnaHR0cDovL2dyYXBoaWNzOC5ueXRpbWVzLmNvbS9pbWFnZXMvMjAwNy8wOS8zMC9ueXJlZ2lvbi93YXNoNjAwLmpwZycsXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICAvL2VuZCBvZiBoYXJkY29kZVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vYWRkIHBhcmFsbGF4IHRhbmdsIGxvZ29cbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuZHJhZ2dhYmxlKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJChcIiNzbGF0ZVwiKS5oZWlnaHQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9ICQoXCIjc2xhdGVcIikud2lkdGgoKTtcbiAgICB9LFxuICAgIG5leHRJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudW5pcXVlSWQgPSB0aGlzLnVuaXF1ZUlkIHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzLnVuaXF1ZUlkKys7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKGxvY2F0aW9uLCBub2RlLCBwYXJlbnQsIG51bWJlcikge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgaWYobm9kZSA9PSBudWxsICYmIHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zdGF0ZS50ZXh0WzBdLFxuICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1swXSxcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAvLzc1IGlzIDEvMiBub2RlIGhlaWdodCBhbmQgd2lkdGhcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMud2lkdGggLyAyIC0gNzUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5oZWlnaHQgLyAyIC0gNzUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbaWQgJSAxMF0sXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1tpZCAlIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLndpZHRoIC8gMiArIDMwMCAqIE1hdGguc2luKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSAtIDc1LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAvIDIgKyAzMDAgKiBNYXRoLmNvcygoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSkgLSA3NSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbG9jYXRpb24ucmlnaHQ7XG4gICAgICAgICAgICB2YXIgdG9wID0gbG9jYXRpb24udG9wO1xuXG4gICAgICAgICAgICAvL2ltYWdlcyBnb2luZyBub3JtYWxseSwgdGV4dCBhbmQgZGV0YWlscyBza2lwcGluZ1xuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDw9IG51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5uZXh0SWQoKTtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zdGF0ZS50ZXh0W2lkICUgMTBdLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiB0aGlzLnN0YXRlLmRldGFpbHNbaWQgJSAxMF0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogcmlnaHQgKyAzMDAgKiBNYXRoLnNpbigoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArIDMwMCAqIE1hdGguY29zKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZGlzcGxhY2U6IGZ1bmN0aW9uKG5vZGUsIHBhcmVudCkge1xuICAgICAgICB2YXIgcmVmZXJlbmNlID0ge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICByaWdodDogbm9kZS5zdHlsZS5yaWdodCxcbiAgICAgICAgICAgICAgICB0b3A6IG5vZGUuc3R5bGUudG9wIC0gMTAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuZ2xlID0gdGhpcy5maW5kQW5nbGUocGFyZW50LCBub2RlLCByZWZlcmVuY2UpO1xuICAgICAgICB2YXIgZGlzcGxhY2VtZW50ID0ge1xuICAgICAgICAgICAgeTogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICAgICAgeDogTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpc3BsYWNlbWVudDtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbihsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgLy9wcm9saWZlcmF0ZSBuZWVkcyB0byB0YWtlIGluIGEgbnVtYmVyIHBhcmFtZXRlciBsYXRlciB3aGVuIGhvb2tpbmcgdG8gdGhlIGJhY2tlbmRcbiAgICAgICAgdGhpcy5hZGQobG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKTtcbiAgICB9LFxuICAgIGZpbmRBbmdsZShwMCxwMSxwMikge1xuICAgICAgICB2YXIgYSA9IE1hdGgucG93KHAxLnN0eWxlLnJpZ2h0LXAwLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDEuc3R5bGUudG9wLXAwLnN0eWxlLnRvcCwyKSxcbiAgICAgICAgYiA9IE1hdGgucG93KHAxLnN0eWxlLnJpZ2h0LXAyLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDEuc3R5bGUudG9wLXAyLnN0eWxlLnRvcCwyKSxcbiAgICAgICAgYyA9IE1hdGgucG93KHAyLnN0eWxlLnJpZ2h0LXAwLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDIuc3R5bGUudG9wLXAwLnN0eWxlLnRvcCwyKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHAxLnN0eWxlLnJpZ2h0IDwgcDAuc3R5bGUucmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiAyICogTWF0aC5QSSAtIE1hdGguYWNvcygoYStiLWMpIC8gTWF0aC5zcXJ0KDQgKiBhICogYikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWNvcygoYSArIGIgLSBjKSAvIE1hdGguc3FydCg0ICogYSAqIGIpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihuZXdUZXh0LCBpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnJbaV0udGV4dCA9IG5ld1RleHQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOmFycn0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLmluc3BlY3RzO1xuICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBpbnNwZWN0OiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLmluc3BlY3RzO1xuICAgICAgICBhcnIucHVzaCh0aGlzLnN0YXRlLm5vZGVzW2ldKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5zcGVjdHM6IGFycn0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmluc3BlY3RzKTtcbiAgICB9LFxuICAgIHJlbW92ZUluc3BlY3Q6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFyciA9IHRoaXMuc3RhdGUuaW5zcGVjdHM7XG4gICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2luc3BlY3RzOiBhcnJ9KTtcbiAgICB9LFxuICAgIGVhY2hJbnNwZWN0OiBmdW5jdGlvbihub2RlLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8SW5zcGVjdG9yIFxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0YXRlLmluc3BlY3RzW2ldLnN0eWxlfVxuICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMuc3RhdGUuaW5zcGVjdHNbaV0uZGV0YWlsc31cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICA8L0luc3BlY3Rvcj5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGVhY2hOb2RlOiBmdW5jdGlvbihub2RlLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPE5vZGUgXG4gICAgICAgICAgICAgICAgICAgIGtleT17bm9kZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2l9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICBvbkluc3BlY3Q9e3RoaXMuaW5zcGVjdH1cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSW5zcGVjdD17dGhpcy5yZW1vdmVJbnNwZWN0fVxuICAgICAgICAgICAgICAgICAgICBvblByb2xpZmVyYXRlPXt0aGlzLnByb2xpZmVyYXRlfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgbm9kZT17dGhpcy5zdGF0ZS5ub2Rlc1tpXX1cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50PXt0aGlzLnN0YXRlLm5vZGVzW2ldLnBhcmVudH1cbiAgICAgICAgICAgICAgICAgICAgZGV0YWlscz17dGhpcy5zdGF0ZS5ub2Rlc1tpICUgMTBdLmRldGFpbHN9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlPXt0aGlzLnN0YXRlLmltYWdlc1tpICUgMTBdfVxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnQ9e3RoaXMuZGlzcGxhY2V9XG4gICAgICAgICAgICAgICAgPntub2RlLnRleHR9PC9Ob2RlPlxuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsYXRlXCIgaWQ9XCJzbGF0ZVwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm5vZGVzLm1hcCh0aGlzLmVhY2hOb2RlKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5pbnNwZWN0cy5tYXAodGhpcy5lYWNoSW5zcGVjdCl9XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1zdWNjZXNzIGdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuYWRkLmJpbmQobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgMSl9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2xhdGU7Il19

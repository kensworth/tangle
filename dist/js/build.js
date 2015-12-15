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
                'NYU',
                'Washington Square Arch',
                'Colin Huggins',
                'NYU Violets',
                'Kimmel Center for University Life',
                'Bobst Catalog',
                'Bobcat Machinery',
                'Wild Bobcat Euthanized',
                'Bobcat Poaching',
                'Animal Attacks',
                'Society for Conservation Biology Annual Meeting',
                'Arc de Triopmhe',
                'Superstition',
                'National Historical Landmarks Program',
                'Stonehenge moved by Glaciers',
                'Pyramids',
                'The Count of Monte Cristo',
                'Ylvis - Stonehenge',
                'University College London (UCL)',
                'Ice Age'
 
            ],
            details: [
                'Washington Square Park is a 9.75-acre public park in the New York City neighborhood of Greenwich Village, Manhattan. One of the best known of New York City\'s 1,900 public parks, it is a landmark as well as a meeting place and center for cultural activity. It is operated by the New York City Department of Parks and Recreation.', // WSP
                'Washington Square Park is named for George Washington (1732-1799), the commander of the Continental Army, who was inaugurated in New York City as the first President of the United States on April 30, 1789. ', // history
                "New York University is a private institution that was founded in 1831. It has a total undergraduate enrollment of 24,985 and its setting is urban. It utilizes a semester-based academic calendar. New York University's ranking in the 2016 edition of Best Colleges is National Universities, 32. Its tuition and fees are $46,170 (2014-15).", // NYU
                "The Washington Square Arch is a marble triumphal archbuilt in 1892 in Washington Square Park in the Greenwich Village neighborhood of Lower Manhattan in New York City.", // WSArch
                "Colin Huggins (born January 6, 1978) is an American classical pianist and busker who travels with a baby grand piano. Huggins started playing guitar at an early age, and took piano lessons from 1994 to 1998, but then quit, and worked odd jobs for some time.", // ColinHuggins
                'NYU Violets is the nickname of the sports teams and other competitive teams at New York University. The school colors are the trademarked hue "NYU Violet" and white. Although officially known as the Violets, the school mascot is a bobcat.', //violets
                'The Helen and Martin Kimmel Center for University Life serves as a hub for campus activity at New York University. Located at the heart of campus, the Kimmel Center provides space and resources for students, faculty, staff, departments, alumni, and community organizations who utilize the facility.', // kimmel
                "NYU's Bobst Library Catalog, known as BobCat, is said to be the origin of the University's mascot.", // bobcat
                "For more than 50 years, Bobcat Company has built compact equipment that helps you work more efficiently and effectively. You rely on the performance, toughness, comfort and versatility of our machines and attachments.", // bobcat mahinery
                'Wild bobcat euthanized after attacking three cats in Georgetown: A bobcat that made its way into a foothills neighborhood was euthanized Monday after killing two pet cats and maiming another, according to the California Department of Fish and Wildlife.', // bobcat euthanized
                'A Sacramento County man has been fined after pleading guilty to several criminal charges related to the poaching of bobcats, officials said Thursday.', // bobcat poaching
                'Animal attacks are an uncommon cause of human fatalities and injuries. The frequency of animal attacks varies with geographical location and historical period.', // animal attacks
                "The Society for Conservation Biology's International Congress for Conservation Biology (ICCB) is recognized as the most important international meeting for conservation professionals and students.", // SCB
                "Arc de Triomphe -- Triumphal Arch of the Star is one of the most famous monuments in Paris. It stands in the centre of the Place Charles de Gaulle (originally named Place de l'Etoile), at the western end of the Champs-Elysees.", // arc de triomphe
                'Superstition is the belief in supernatural causality-that one event causes another without any natural process linking the two events-such as astrology and certain aspects linked to religion, like omens, witchcraft and prophecies, that contradict natural science.', // superstition
                'National Historic Landmarks (NHLs) are nationally significant historic places designated by the Secretary of the Interior because they possess exceptional value or quality in illustrating or interpreting the heritage of the United States.', // national historical landmarks program
                'The famous rocks of Stonehenge were not dragged by pagans but moved by glaciers, according to a team of Welsh academics.', // stonehenge
                'The ancient Egyptians built pyramids as tombs for the pharaohs and their queens. The pharaohs were buried in pyramids of many different shapes and sizes from before the beginning of the Old Kingdom to the end of the Middle Kingdom.', // pyramids
                "The Count of Monte Cristo is an adventure novel by French author Alexandre Dumas completed in 1844. It is one of the author's most popular works, along with The Three Musketeers.", // count of MC
                "Ylvis - Stonehenge Lyrics: My life is so successful. I've got everything a man could ever need. Got a 1000 dollar haircut. And I even have a talkshow on TV.", // ylvis
                'University College London (UCL), established in 1826 as London University, is a public research university in London, England and a constituent college of the federal University of London.', // UCL
                'Ice Age is a 2002 American computer-animated comedy adventure film directed by Carlos Saldanha and Chris Wedge from a story by Michael J. Wilson. It was produced by Blue Sky Studios and distributed by 20th Century Fox.', // ice age film
 
 
 
            ],
            images: [
                'https://upload.wikimedia.org/wikipedia/commons/d/da/Washington_square_park.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/b/be/NYC_-_Washington_Square_Park.JPG',
                'https://yt3.ggpht.com/-RZYi5isxH_M/AAAAAAAAAAI/AAAAAAAAAAA/rmWpoe2qZzI/s900-c-k-no/photo.jpg',
                'http://gvshp.org/blog/wp-content/uploads/2014/09/arch.jpg', // WSArch
                'http://lordashbury.com/wp-content/uploads/2012/12/DSC08779_2s.jpg', // chuggins
                'http://wp.nyu.edu/university_programs/wp-content/uploads/sites/697/2014/10/NYU_Bobcat.jpg.598x1000_q85.jpg', // violets
                'http://www.krjda.com/Images/Kimmel%20Images/nyuschall.jpg', // kimmel
                'http://www.blouinartinfo.com/sites/default/files/bobst1.jpg', // bobcat
                'http://koolshops.com/wp-content/uploads/2011/02/Bobcat-Tipper-Hire-300x221.jpg', // bobcat machinery
                'http://www.sacbee.com/news/local/crime/kijw5b/picture8965613/ALTERNATES/FREE_640/IMG_2993.JPG', // bobcat euthanized
                'http://www.kcra.com/image/view/-/26688972/medRes/1/-/maxh/460/maxw/620/-/jmviy0z/-/Bobcat-Pelts-jpg.jpg', // bobcat poaching
                'http://www.buzcall.com/images/animal-attacks.jpg', // animal attacks
                'http://www.scbo2014.usp.ac.fj/wp-content/uploads/2013/12/Logo-Color.jpg', // SCB
                'http://en.parisinfo.com/var/otcp/sites/images/media/1.-photos/02.-sites-culturels-630-x-405/arc-de-triomphe-de-face-630x405-c-thinkstock/35754-1-fre-FR/Arc-de-Triomphe-de-face-630x405-C-Thinkstock_block_media_big.jpg', // arc de triomphe
                'http://www.foodnculture.com/wp-content/uploads/2014/05/superstitions2.gif', // superstitions
                'http://www.proprofs.com/quiz-school/upload/yuiupload/25027932.jpg', // historical landmakrs
                'http://i.telegraph.co.uk/multimedia/archive/03526/Sheep_grazing_in_a_3526412b.jpg', // stonehenge
                'https://upload.wikimedia.org/wikipedia/commons/a/af/All_Gizah_Pyramids.jpg', // pyramids
                'https://upload.wikimedia.org/wikipedia/commons/d/d6/Louis_Fran%C3%A7ais-Dant%C3%A8s_sur_son_rocher.jpg', // count of MC
                "http://a2.mzstatic.com/us/r1000/082/Music/v4/89/fb/43/89fb433b-c855-2307-c71c-53137339c067/cover.1200x1200-75.jpg", // ylvis
                'https://www.ucl.ac.uk/ah/images/hp-ucl-portico-alt.jpg', // UCL
                'http://www.dan-dare.org/FreeFun/Images/CartoonsMoviesTV/IceAge2Wallpaper800.jpg', // Ice age movie
 
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
                    text: this.state.text[id % 22],
                    details: this.state.details[id % 22],
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
                    text: this.state.text[id % 22],
                    details: this.state.details[id % 22],
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
                    details: this.state.nodes[i % 22].details, 
                    image: this.state.images[i % 22], 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL21haW4uanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL25vZGUuanMiLCIvVXNlcnMva2VubmV0aHpoYW5nL0Ryb3Bib3gvQ29kZS9TaXRlcy9yZWFjdC13ZWIvc3JjL2pzL3NsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBRSxDQUFFLENBQUE7SUFDM0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FDSG5DLElBQUksMEJBQTBCLG9CQUFBO0lBQzFCLGVBQWUsRUFBRSxXQUFXO1FBQ3hCLE9BQU87WUFDSCxZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRztnQkFDbkMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2hDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSTtnQkFDbEIsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUk7Z0JBQ3BDLEdBQUcsRUFB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S0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFDO29CQUMxQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUM7b0JBQ2pDLFlBQUEsRUFBWSxDQUFFLElBQUksQ0FBQyxRQUFTO2dCQUMvQixDQUFBLEVBQUMsSUFBSSxDQUFDLElBQVksQ0FBQTtjQUNyQjtLQUNUO0lBQ0QsTUFBTSxFQUFFLFdBQVc7UUFDZjtZQUNJLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsT0FBQSxFQUFPLENBQUMsRUFBQSxFQUFFLENBQUMsT0FBUSxDQUFBLEVBQUE7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFFO0FBQ3JELFlBQWtCLENBQUE7O1VBRVI7S0FDTDtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgU2xhdGUgPSByZXF1aXJlKCcuL3NsYXRlJyk7XG5cblJlYWN0LnJlbmRlcig8U2xhdGUgY291bnQ9ezF9Lz4sIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IiwidmFyIE5vZGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByb2xpZmVyYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBpbnNwZWN0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgICAgIGRldGFpbHM6IG51bGwsXG4gICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTU1LFxuICAgICAgICAgICAgICAgIHRvcDogdGhpcy5wcm9wcy5zdHlsZS50b3AgKyA1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNTAgKyAncHgnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAgKyAncHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNTAgKyAncHgnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAgKyAncHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIHRoaXMucHJvcHMuaW1hZ2UgKyAnKScsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuMjUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIHRvcDogbnVsbCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYXJlbnQ6IHRoaXMucHJvcHMucGFyZW50fSk7XG4gICAgfSxcbiAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5zcGVjdGluZzogIXRoaXMuc3RhdGUuaW5zcGVjdGluZ30pO1xuICAgICAgICB2YXIgaW5zcGVjdGluZyA9ICF0aGlzLnN0YXRlLmluc3BlY3Rpbmc7XG4gICAgICAgIGlmKGluc3BlY3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5zdGF0ZS5sb2NhdGlvbi5yaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5zdGF0ZS5sb2NhdGlvbi50b3AgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaW5zcGVjdFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnN0YXRlLmxvY2F0aW9uLnJpZ2h0ICsgMTU1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnN0YXRlLmxvY2F0aW9uLnRvcCArIDE1NSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pbmRleCk7XG4gICAgfSxcbiAgICBwcm9saWZlcmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLnByb2xpZmVyYXRlZCkge1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBudWxsO1xuXG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9kaXNwbGFjZSAzMDAgcHggYXdheSBmcm9tIHRoZSBub2RlIGluIHRoZSBhbmdsZSBmb3JtZWQgYnkgdGhlIG5vZGUgYW5kIGl0cyBwYXJlbnRcbiAgICAgICAgICAgICAgICB2YXIgZGlzcGxhY2VtZW50ID0gdGhpcy5wcm9wcy5kaXNwbGFjZW1lbnQodGhpcy5wcm9wcy5ub2RlLCB0aGlzLnN0YXRlLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5wcm9wcy5zdHlsZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTcwICsgMzAwICogZGlzcGxhY2VtZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gNSArIDMwMCAqIGRpc3BsYWNlbWVudC55LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbnNwZWN0U3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTcwICsgMzAwICogZGlzcGxhY2VtZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gNSArIDMwMCAqIGRpc3BsYWNlbWVudC55LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZS5yaWdodCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBzdHlsZS50b3AgLSAxNSArIDMwMCAqIGRpc3BsYWNlbWVudC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZS5yaWdodCAtIDE1ICsgMzAwICogZGlzcGxhY2VtZW50LnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBzdHlsZS50b3AgLSAxNSArIDMwMCAqIGRpc3BsYWNlbWVudC55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL2ZpcmVkIHRvIHByb2xpZmVyYXRlIGJlZm9yZSByZXJlbmRlclxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gdGhpcy5wcm9wcy5zdHlsZS5yaWdodCArIDMwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLng7XG4gICAgICAgICAgICAgICAgdG9wID0gdGhpcy5wcm9wcy5zdHlsZS50b3AgKyAzMDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55O1xuXG4gICAgICAgICAgICAgICAgJChcIiNzbGF0ZVwiKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgLy9yaWdodDogcmlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAvL3RvcDogdG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJys9JyArIDYwMCAqIHRoaXMucHJvcHMuZGlzcGxhY2VtZW50KHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQpLnggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICctPScgKyA2MDAgKiB0aGlzLnByb3BzLmRpc3BsYWNlbWVudCh0aGlzLnByb3BzLm5vZGUsIHRoaXMuc3RhdGUucGFyZW50KS55ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGNvbXBsZXRlLlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0ICsgMTcwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGluc3BlY3RTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgKyAxNzAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gNSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMucHJvcHMuc3R5bGUucmlnaHQgLSAxNSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMucHJvcHMuc3R5bGUudG9wIC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLnByb3BzLnN0eWxlLnJpZ2h0IC0gMTUgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLnByb3BzLnN0eWxlLnRvcCAtIDE1ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgdGhpcy5wcm9wcy5pbWFnZSArICcpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuNjUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3ByZS1iYWNrZW5kIGhhcmRjb2RlXG4gICAgICAgICAgICAvL3doZW4gYmFja2VuZCBpcyBob29rZWQgdXAsIGVhY2ggSlNPTiBvYmplY3QgcmV0dXJuZWQgd2lsbCBiZSBzdG9yZWQgaW4gYW4gYXJyYXksIHRoZSBsZW5ndGggb2Ygd2hpY2ggaXMgdGhlIGFtb3VudCBvZiBub2RlcyB0byBiZSBjcmVhdGVkLCB0aGUgdGV4dCBpbnNpZGUgd2hpY2ggYmVpbmcgdGhlIGluZm9ybWF0aW9uIHRvIGJlIGNvbnRhaW5lZCB3aXRoaW5cbiAgICAgICAgICAgIC8vdGhpcyBvYmplY3Qgd2lsbCBiZSBpbnNlcnRlZCBpbnRvIHByb2xpZmVyYXRlLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjaGFuZ2VkIHRvIGFjY29tbW9kYXRlIGZvciB0aGUgZHluYW1pc21cbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Qcm9saWZlcmF0ZSh7cmlnaHQ6IHJpZ2h0LCB0b3A6IHRvcH0sIHRoaXMucHJvcHMubm9kZSwgdGhpcy5zdGF0ZS5wYXJlbnQsIDMpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2xpZmVyYXRlZDogIXRoaXMuc3RhdGUucHJvbGlmZXJhdGVkfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBwcm9saWZlcmF0ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub2RlSW1hZ2VcIiBzdHlsZT17dGhpcy5zdGF0ZS5pbWFnZVN0eWxlfT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXt0aGlzLnByb2xpZmVyYXRlfSBcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUuc3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt0aGlzLnN0YXRlLmJ1dHRvblN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5pbnNwZWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3MgZ2x5cGhpY29uIGdseXBoaWNvbi16b29tLWluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiLz4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnNwZWN0XCIgc3R5bGU9e3RoaXMuc3RhdGUuaW5zcGVjdFN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuZGV0YWlsc308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlO1xuIiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcblxudmFyIFNsYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub2RlczogW10sXG4gICAgICAgICAgICAvL2hhcmRjb2RlIHVudGlsIGJhY2tlbmQgY2FuIGJlIGhvb2tlZCB1cFxuICAgICAgICAgICAgLy9OT1QgRklOQUwsIE9OTFkgRk9SIFRFU1RJTkcgQU5EIFBVUlBPU0VTIE9GIFBSRVNFTlRBVElPTlxuICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgICdXYXNoaW5ndG9uIFNxdWFyZSBQYXJrJyxcbiAgICAgICAgICAgICAgICAnSGlzdG9yeScsXG4gICAgICAgICAgICAgICAgJ05ZVScsXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIEFyY2gnLFxuICAgICAgICAgICAgICAgICdDb2xpbiBIdWdnaW5zJyxcbiAgICAgICAgICAgICAgICAnTllVIFZpb2xldHMnLFxuICAgICAgICAgICAgICAgICdLaW1tZWwgQ2VudGVyIGZvciBVbml2ZXJzaXR5IExpZmUnLFxuICAgICAgICAgICAgICAgICdCb2JzdCBDYXRhbG9nJyxcbiAgICAgICAgICAgICAgICAnQm9iY2F0IE1hY2hpbmVyeScsXG4gICAgICAgICAgICAgICAgJ1dpbGQgQm9iY2F0IEV1dGhhbml6ZWQnLFxuICAgICAgICAgICAgICAgICdCb2JjYXQgUG9hY2hpbmcnLFxuICAgICAgICAgICAgICAgICdBbmltYWwgQXR0YWNrcycsXG4gICAgICAgICAgICAgICAgJ1NvY2lldHkgZm9yIENvbnNlcnZhdGlvbiBCaW9sb2d5IEFubnVhbCBNZWV0aW5nJyxcbiAgICAgICAgICAgICAgICAnQXJjIGRlIFRyaW9wbWhlJyxcbiAgICAgICAgICAgICAgICAnU3VwZXJzdGl0aW9uJyxcbiAgICAgICAgICAgICAgICAnTmF0aW9uYWwgSGlzdG9yaWNhbCBMYW5kbWFya3MgUHJvZ3JhbScsXG4gICAgICAgICAgICAgICAgJ1N0b25laGVuZ2UgbW92ZWQgYnkgR2xhY2llcnMnLFxuICAgICAgICAgICAgICAgICdQeXJhbWlkcycsXG4gICAgICAgICAgICAgICAgJ1RoZSBDb3VudCBvZiBNb250ZSBDcmlzdG8nLFxuICAgICAgICAgICAgICAgICdZbHZpcyAtIFN0b25laGVuZ2UnLFxuICAgICAgICAgICAgICAgICdVbml2ZXJzaXR5IENvbGxlZ2UgTG9uZG9uIChVQ0wpJyxcbiAgICAgICAgICAgICAgICAnSWNlIEFnZSdcbiBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgYSA5Ljc1LWFjcmUgcHVibGljIHBhcmsgaW4gdGhlIE5ldyBZb3JrIENpdHkgbmVpZ2hib3Job29kIG9mIEdyZWVud2ljaCBWaWxsYWdlLCBNYW5oYXR0YW4uIE9uZSBvZiB0aGUgYmVzdCBrbm93biBvZiBOZXcgWW9yayBDaXR5XFwncyAxLDkwMCBwdWJsaWMgcGFya3MsIGl0IGlzIGEgbGFuZG1hcmsgYXMgd2VsbCBhcyBhIG1lZXRpbmcgcGxhY2UgYW5kIGNlbnRlciBmb3IgY3VsdHVyYWwgYWN0aXZpdHkuIEl0IGlzIG9wZXJhdGVkIGJ5IHRoZSBOZXcgWW9yayBDaXR5IERlcGFydG1lbnQgb2YgUGFya3MgYW5kIFJlY3JlYXRpb24uJywgLy8gV1NQXG4gICAgICAgICAgICAgICAgJ1dhc2hpbmd0b24gU3F1YXJlIFBhcmsgaXMgbmFtZWQgZm9yIEdlb3JnZSBXYXNoaW5ndG9uICgxNzMyLTE3OTkpLCB0aGUgY29tbWFuZGVyIG9mIHRoZSBDb250aW5lbnRhbCBBcm15LCB3aG8gd2FzIGluYXVndXJhdGVkIGluIE5ldyBZb3JrIENpdHkgYXMgdGhlIGZpcnN0IFByZXNpZGVudCBvZiB0aGUgVW5pdGVkIFN0YXRlcyBvbiBBcHJpbCAzMCwgMTc4OS4gJywgLy8gaGlzdG9yeVxuICAgICAgICAgICAgICAgIFwiTmV3IFlvcmsgVW5pdmVyc2l0eSBpcyBhIHByaXZhdGUgaW5zdGl0dXRpb24gdGhhdCB3YXMgZm91bmRlZCBpbiAxODMxLiBJdCBoYXMgYSB0b3RhbCB1bmRlcmdyYWR1YXRlIGVucm9sbG1lbnQgb2YgMjQsOTg1IGFuZCBpdHMgc2V0dGluZyBpcyB1cmJhbi4gSXQgdXRpbGl6ZXMgYSBzZW1lc3Rlci1iYXNlZCBhY2FkZW1pYyBjYWxlbmRhci4gTmV3IFlvcmsgVW5pdmVyc2l0eSdzIHJhbmtpbmcgaW4gdGhlIDIwMTYgZWRpdGlvbiBvZiBCZXN0IENvbGxlZ2VzIGlzIE5hdGlvbmFsIFVuaXZlcnNpdGllcywgMzIuIEl0cyB0dWl0aW9uIGFuZCBmZWVzIGFyZSAkNDYsMTcwICgyMDE0LTE1KS5cIiwgLy8gTllVXG4gICAgICAgICAgICAgICAgXCJUaGUgV2FzaGluZ3RvbiBTcXVhcmUgQXJjaCBpcyBhIG1hcmJsZSB0cml1bXBoYWwgYXJjaGJ1aWx0IGluIDE4OTIgaW4gV2FzaGluZ3RvbiBTcXVhcmUgUGFyayBpbiB0aGUgR3JlZW53aWNoIFZpbGxhZ2UgbmVpZ2hib3Job29kIG9mIExvd2VyIE1hbmhhdHRhbiBpbiBOZXcgWW9yayBDaXR5LlwiLCAvLyBXU0FyY2hcbiAgICAgICAgICAgICAgICBcIkNvbGluIEh1Z2dpbnMgKGJvcm4gSmFudWFyeSA2LCAxOTc4KSBpcyBhbiBBbWVyaWNhbiBjbGFzc2ljYWwgcGlhbmlzdCBhbmQgYnVza2VyIHdobyB0cmF2ZWxzIHdpdGggYSBiYWJ5IGdyYW5kIHBpYW5vLiBIdWdnaW5zIHN0YXJ0ZWQgcGxheWluZyBndWl0YXIgYXQgYW4gZWFybHkgYWdlLCBhbmQgdG9vayBwaWFubyBsZXNzb25zIGZyb20gMTk5NCB0byAxOTk4LCBidXQgdGhlbiBxdWl0LCBhbmQgd29ya2VkIG9kZCBqb2JzIGZvciBzb21lIHRpbWUuXCIsIC8vIENvbGluSHVnZ2luc1xuICAgICAgICAgICAgICAgICdOWVUgVmlvbGV0cyBpcyB0aGUgbmlja25hbWUgb2YgdGhlIHNwb3J0cyB0ZWFtcyBhbmQgb3RoZXIgY29tcGV0aXRpdmUgdGVhbXMgYXQgTmV3IFlvcmsgVW5pdmVyc2l0eS4gVGhlIHNjaG9vbCBjb2xvcnMgYXJlIHRoZSB0cmFkZW1hcmtlZCBodWUgXCJOWVUgVmlvbGV0XCIgYW5kIHdoaXRlLiBBbHRob3VnaCBvZmZpY2lhbGx5IGtub3duIGFzIHRoZSBWaW9sZXRzLCB0aGUgc2Nob29sIG1hc2NvdCBpcyBhIGJvYmNhdC4nLCAvL3Zpb2xldHNcbiAgICAgICAgICAgICAgICAnVGhlIEhlbGVuIGFuZCBNYXJ0aW4gS2ltbWVsIENlbnRlciBmb3IgVW5pdmVyc2l0eSBMaWZlIHNlcnZlcyBhcyBhIGh1YiBmb3IgY2FtcHVzIGFjdGl2aXR5IGF0IE5ldyBZb3JrIFVuaXZlcnNpdHkuIExvY2F0ZWQgYXQgdGhlIGhlYXJ0IG9mIGNhbXB1cywgdGhlIEtpbW1lbCBDZW50ZXIgcHJvdmlkZXMgc3BhY2UgYW5kIHJlc291cmNlcyBmb3Igc3R1ZGVudHMsIGZhY3VsdHksIHN0YWZmLCBkZXBhcnRtZW50cywgYWx1bW5pLCBhbmQgY29tbXVuaXR5IG9yZ2FuaXphdGlvbnMgd2hvIHV0aWxpemUgdGhlIGZhY2lsaXR5LicsIC8vIGtpbW1lbFxuICAgICAgICAgICAgICAgIFwiTllVJ3MgQm9ic3QgTGlicmFyeSBDYXRhbG9nLCBrbm93biBhcyBCb2JDYXQsIGlzIHNhaWQgdG8gYmUgdGhlIG9yaWdpbiBvZiB0aGUgVW5pdmVyc2l0eSdzIG1hc2NvdC5cIiwgLy8gYm9iY2F0XG4gICAgICAgICAgICAgICAgXCJGb3IgbW9yZSB0aGFuIDUwIHllYXJzLCBCb2JjYXQgQ29tcGFueSBoYXMgYnVpbHQgY29tcGFjdCBlcXVpcG1lbnQgdGhhdCBoZWxwcyB5b3Ugd29yayBtb3JlIGVmZmljaWVudGx5IGFuZCBlZmZlY3RpdmVseS4gWW91IHJlbHkgb24gdGhlIHBlcmZvcm1hbmNlLCB0b3VnaG5lc3MsIGNvbWZvcnQgYW5kIHZlcnNhdGlsaXR5IG9mIG91ciBtYWNoaW5lcyBhbmQgYXR0YWNobWVudHMuXCIsIC8vIGJvYmNhdCBtYWhpbmVyeVxuICAgICAgICAgICAgICAgICdXaWxkIGJvYmNhdCBldXRoYW5pemVkIGFmdGVyIGF0dGFja2luZyB0aHJlZSBjYXRzIGluIEdlb3JnZXRvd246IEEgYm9iY2F0IHRoYXQgbWFkZSBpdHMgd2F5IGludG8gYSBmb290aGlsbHMgbmVpZ2hib3Job29kIHdhcyBldXRoYW5pemVkIE1vbmRheSBhZnRlciBraWxsaW5nIHR3byBwZXQgY2F0cyBhbmQgbWFpbWluZyBhbm90aGVyLCBhY2NvcmRpbmcgdG8gdGhlIENhbGlmb3JuaWEgRGVwYXJ0bWVudCBvZiBGaXNoIGFuZCBXaWxkbGlmZS4nLCAvLyBib2JjYXQgZXV0aGFuaXplZFxuICAgICAgICAgICAgICAgICdBIFNhY3JhbWVudG8gQ291bnR5IG1hbiBoYXMgYmVlbiBmaW5lZCBhZnRlciBwbGVhZGluZyBndWlsdHkgdG8gc2V2ZXJhbCBjcmltaW5hbCBjaGFyZ2VzIHJlbGF0ZWQgdG8gdGhlIHBvYWNoaW5nIG9mIGJvYmNhdHMsIG9mZmljaWFscyBzYWlkIFRodXJzZGF5LicsIC8vIGJvYmNhdCBwb2FjaGluZ1xuICAgICAgICAgICAgICAgICdBbmltYWwgYXR0YWNrcyBhcmUgYW4gdW5jb21tb24gY2F1c2Ugb2YgaHVtYW4gZmF0YWxpdGllcyBhbmQgaW5qdXJpZXMuIFRoZSBmcmVxdWVuY3kgb2YgYW5pbWFsIGF0dGFja3MgdmFyaWVzIHdpdGggZ2VvZ3JhcGhpY2FsIGxvY2F0aW9uIGFuZCBoaXN0b3JpY2FsIHBlcmlvZC4nLCAvLyBhbmltYWwgYXR0YWNrc1xuICAgICAgICAgICAgICAgIFwiVGhlIFNvY2lldHkgZm9yIENvbnNlcnZhdGlvbiBCaW9sb2d5J3MgSW50ZXJuYXRpb25hbCBDb25ncmVzcyBmb3IgQ29uc2VydmF0aW9uIEJpb2xvZ3kgKElDQ0IpIGlzIHJlY29nbml6ZWQgYXMgdGhlIG1vc3QgaW1wb3J0YW50IGludGVybmF0aW9uYWwgbWVldGluZyBmb3IgY29uc2VydmF0aW9uIHByb2Zlc3Npb25hbHMgYW5kIHN0dWRlbnRzLlwiLCAvLyBTQ0JcbiAgICAgICAgICAgICAgICBcIkFyYyBkZSBUcmlvbXBoZSAtLSBUcml1bXBoYWwgQXJjaCBvZiB0aGUgU3RhciBpcyBvbmUgb2YgdGhlIG1vc3QgZmFtb3VzIG1vbnVtZW50cyBpbiBQYXJpcy4gSXQgc3RhbmRzIGluIHRoZSBjZW50cmUgb2YgdGhlIFBsYWNlIENoYXJsZXMgZGUgR2F1bGxlIChvcmlnaW5hbGx5IG5hbWVkIFBsYWNlIGRlIGwnRXRvaWxlKSwgYXQgdGhlIHdlc3Rlcm4gZW5kIG9mIHRoZSBDaGFtcHMtRWx5c2Vlcy5cIiwgLy8gYXJjIGRlIHRyaW9tcGhlXG4gICAgICAgICAgICAgICAgJ1N1cGVyc3RpdGlvbiBpcyB0aGUgYmVsaWVmIGluIHN1cGVybmF0dXJhbCBjYXVzYWxpdHktdGhhdCBvbmUgZXZlbnQgY2F1c2VzIGFub3RoZXIgd2l0aG91dCBhbnkgbmF0dXJhbCBwcm9jZXNzIGxpbmtpbmcgdGhlIHR3byBldmVudHMtc3VjaCBhcyBhc3Ryb2xvZ3kgYW5kIGNlcnRhaW4gYXNwZWN0cyBsaW5rZWQgdG8gcmVsaWdpb24sIGxpa2Ugb21lbnMsIHdpdGNoY3JhZnQgYW5kIHByb3BoZWNpZXMsIHRoYXQgY29udHJhZGljdCBuYXR1cmFsIHNjaWVuY2UuJywgLy8gc3VwZXJzdGl0aW9uXG4gICAgICAgICAgICAgICAgJ05hdGlvbmFsIEhpc3RvcmljIExhbmRtYXJrcyAoTkhMcykgYXJlIG5hdGlvbmFsbHkgc2lnbmlmaWNhbnQgaGlzdG9yaWMgcGxhY2VzIGRlc2lnbmF0ZWQgYnkgdGhlIFNlY3JldGFyeSBvZiB0aGUgSW50ZXJpb3IgYmVjYXVzZSB0aGV5IHBvc3Nlc3MgZXhjZXB0aW9uYWwgdmFsdWUgb3IgcXVhbGl0eSBpbiBpbGx1c3RyYXRpbmcgb3IgaW50ZXJwcmV0aW5nIHRoZSBoZXJpdGFnZSBvZiB0aGUgVW5pdGVkIFN0YXRlcy4nLCAvLyBuYXRpb25hbCBoaXN0b3JpY2FsIGxhbmRtYXJrcyBwcm9ncmFtXG4gICAgICAgICAgICAgICAgJ1RoZSBmYW1vdXMgcm9ja3Mgb2YgU3RvbmVoZW5nZSB3ZXJlIG5vdCBkcmFnZ2VkIGJ5IHBhZ2FucyBidXQgbW92ZWQgYnkgZ2xhY2llcnMsIGFjY29yZGluZyB0byBhIHRlYW0gb2YgV2Vsc2ggYWNhZGVtaWNzLicsIC8vIHN0b25laGVuZ2VcbiAgICAgICAgICAgICAgICAnVGhlIGFuY2llbnQgRWd5cHRpYW5zIGJ1aWx0IHB5cmFtaWRzIGFzIHRvbWJzIGZvciB0aGUgcGhhcmFvaHMgYW5kIHRoZWlyIHF1ZWVucy4gVGhlIHBoYXJhb2hzIHdlcmUgYnVyaWVkIGluIHB5cmFtaWRzIG9mIG1hbnkgZGlmZmVyZW50IHNoYXBlcyBhbmQgc2l6ZXMgZnJvbSBiZWZvcmUgdGhlIGJlZ2lubmluZyBvZiB0aGUgT2xkIEtpbmdkb20gdG8gdGhlIGVuZCBvZiB0aGUgTWlkZGxlIEtpbmdkb20uJywgLy8gcHlyYW1pZHNcbiAgICAgICAgICAgICAgICBcIlRoZSBDb3VudCBvZiBNb250ZSBDcmlzdG8gaXMgYW4gYWR2ZW50dXJlIG5vdmVsIGJ5IEZyZW5jaCBhdXRob3IgQWxleGFuZHJlIER1bWFzIGNvbXBsZXRlZCBpbiAxODQ0LiBJdCBpcyBvbmUgb2YgdGhlIGF1dGhvcidzIG1vc3QgcG9wdWxhciB3b3JrcywgYWxvbmcgd2l0aCBUaGUgVGhyZWUgTXVza2V0ZWVycy5cIiwgLy8gY291bnQgb2YgTUNcbiAgICAgICAgICAgICAgICBcIllsdmlzIC0gU3RvbmVoZW5nZSBMeXJpY3M6IE15IGxpZmUgaXMgc28gc3VjY2Vzc2Z1bC4gSSd2ZSBnb3QgZXZlcnl0aGluZyBhIG1hbiBjb3VsZCBldmVyIG5lZWQuIEdvdCBhIDEwMDAgZG9sbGFyIGhhaXJjdXQuIEFuZCBJIGV2ZW4gaGF2ZSBhIHRhbGtzaG93IG9uIFRWLlwiLCAvLyB5bHZpc1xuICAgICAgICAgICAgICAgICdVbml2ZXJzaXR5IENvbGxlZ2UgTG9uZG9uIChVQ0wpLCBlc3RhYmxpc2hlZCBpbiAxODI2IGFzIExvbmRvbiBVbml2ZXJzaXR5LCBpcyBhIHB1YmxpYyByZXNlYXJjaCB1bml2ZXJzaXR5IGluIExvbmRvbiwgRW5nbGFuZCBhbmQgYSBjb25zdGl0dWVudCBjb2xsZWdlIG9mIHRoZSBmZWRlcmFsIFVuaXZlcnNpdHkgb2YgTG9uZG9uLicsIC8vIFVDTFxuICAgICAgICAgICAgICAgICdJY2UgQWdlIGlzIGEgMjAwMiBBbWVyaWNhbiBjb21wdXRlci1hbmltYXRlZCBjb21lZHkgYWR2ZW50dXJlIGZpbG0gZGlyZWN0ZWQgYnkgQ2FybG9zIFNhbGRhbmhhIGFuZCBDaHJpcyBXZWRnZSBmcm9tIGEgc3RvcnkgYnkgTWljaGFlbCBKLiBXaWxzb24uIEl0IHdhcyBwcm9kdWNlZCBieSBCbHVlIFNreSBTdHVkaW9zIGFuZCBkaXN0cmlidXRlZCBieSAyMHRoIENlbnR1cnkgRm94LicsIC8vIGljZSBhZ2UgZmlsbVxuIFxuIFxuIFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGltYWdlczogW1xuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2QvZGEvV2FzaGluZ3Rvbl9zcXVhcmVfcGFyay5qcGcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2IvYmUvTllDXy1fV2FzaGluZ3Rvbl9TcXVhcmVfUGFyay5KUEcnLFxuICAgICAgICAgICAgICAgICdodHRwczovL3l0My5nZ3BodC5jb20vLVJaWWk1aXN4SF9NL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL3JtV3BvZTJxWnpJL3M5MDAtYy1rLW5vL3Bob3RvLmpwZycsXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly9ndnNocC5vcmcvYmxvZy93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wOS9hcmNoLmpwZycsIC8vIFdTQXJjaFxuICAgICAgICAgICAgICAgICdodHRwOi8vbG9yZGFzaGJ1cnkuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEyLzEyL0RTQzA4Nzc5XzJzLmpwZycsIC8vIGNodWdnaW5zXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93cC5ueXUuZWR1L3VuaXZlcnNpdHlfcHJvZ3JhbXMvd3AtY29udGVudC91cGxvYWRzL3NpdGVzLzY5Ny8yMDE0LzEwL05ZVV9Cb2JjYXQuanBnLjU5OHgxMDAwX3E4NS5qcGcnLCAvLyB2aW9sZXRzXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cua3JqZGEuY29tL0ltYWdlcy9LaW1tZWwlMjBJbWFnZXMvbnl1c2NoYWxsLmpwZycsIC8vIGtpbW1lbFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LmJsb3VpbmFydGluZm8uY29tL3NpdGVzL2RlZmF1bHQvZmlsZXMvYm9ic3QxLmpwZycsIC8vIGJvYmNhdFxuICAgICAgICAgICAgICAgICdodHRwOi8va29vbHNob3BzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMS8wMi9Cb2JjYXQtVGlwcGVyLUhpcmUtMzAweDIyMS5qcGcnLCAvLyBib2JjYXQgbWFjaGluZXJ5XG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cuc2FjYmVlLmNvbS9uZXdzL2xvY2FsL2NyaW1lL2tpanc1Yi9waWN0dXJlODk2NTYxMy9BTFRFUk5BVEVTL0ZSRUVfNjQwL0lNR18yOTkzLkpQRycsIC8vIGJvYmNhdCBldXRoYW5pemVkXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cua2NyYS5jb20vaW1hZ2Uvdmlldy8tLzI2Njg4OTcyL21lZFJlcy8xLy0vbWF4aC80NjAvbWF4dy82MjAvLS9qbXZpeTB6Ly0vQm9iY2F0LVBlbHRzLWpwZy5qcGcnLCAvLyBib2JjYXQgcG9hY2hpbmdcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy5idXpjYWxsLmNvbS9pbWFnZXMvYW5pbWFsLWF0dGFja3MuanBnJywgLy8gYW5pbWFsIGF0dGFja3NcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy5zY2JvMjAxNC51c3AuYWMuZmovd3AtY29udGVudC91cGxvYWRzLzIwMTMvMTIvTG9nby1Db2xvci5qcGcnLCAvLyBTQ0JcbiAgICAgICAgICAgICAgICAnaHR0cDovL2VuLnBhcmlzaW5mby5jb20vdmFyL290Y3Avc2l0ZXMvaW1hZ2VzL21lZGlhLzEuLXBob3Rvcy8wMi4tc2l0ZXMtY3VsdHVyZWxzLTYzMC14LTQwNS9hcmMtZGUtdHJpb21waGUtZGUtZmFjZS02MzB4NDA1LWMtdGhpbmtzdG9jay8zNTc1NC0xLWZyZS1GUi9BcmMtZGUtVHJpb21waGUtZGUtZmFjZS02MzB4NDA1LUMtVGhpbmtzdG9ja19ibG9ja19tZWRpYV9iaWcuanBnJywgLy8gYXJjIGRlIHRyaW9tcGhlXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cuZm9vZG5jdWx0dXJlLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wNS9zdXBlcnN0aXRpb25zMi5naWYnLCAvLyBzdXBlcnN0aXRpb25zXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cucHJvcHJvZnMuY29tL3F1aXotc2Nob29sL3VwbG9hZC95dWl1cGxvYWQvMjUwMjc5MzIuanBnJywgLy8gaGlzdG9yaWNhbCBsYW5kbWFrcnNcbiAgICAgICAgICAgICAgICAnaHR0cDovL2kudGVsZWdyYXBoLmNvLnVrL211bHRpbWVkaWEvYXJjaGl2ZS8wMzUyNi9TaGVlcF9ncmF6aW5nX2luX2FfMzUyNjQxMmIuanBnJywgLy8gc3RvbmVoZW5nZVxuICAgICAgICAgICAgICAgICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2EvYWYvQWxsX0dpemFoX1B5cmFtaWRzLmpwZycsIC8vIHB5cmFtaWRzXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvZC9kNi9Mb3Vpc19GcmFuJUMzJUE3YWlzLURhbnQlQzMlQThzX3N1cl9zb25fcm9jaGVyLmpwZycsIC8vIGNvdW50IG9mIE1DXG4gICAgICAgICAgICAgICAgXCJodHRwOi8vYTIubXpzdGF0aWMuY29tL3VzL3IxMDAwLzA4Mi9NdXNpYy92NC84OS9mYi80My84OWZiNDMzYi1jODU1LTIzMDctYzcxYy01MzEzNzMzOWMwNjcvY292ZXIuMTIwMHgxMjAwLTc1LmpwZ1wiLCAvLyB5bHZpc1xuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy51Y2wuYWMudWsvYWgvaW1hZ2VzL2hwLXVjbC1wb3J0aWNvLWFsdC5qcGcnLCAvLyBVQ0xcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy5kYW4tZGFyZS5vcmcvRnJlZUZ1bi9JbWFnZXMvQ2FydG9vbnNNb3ZpZXNUVi9JY2VBZ2UyV2FsbHBhcGVyODAwLmpwZycsIC8vIEljZSBhZ2UgbW92aWVcbiBcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIC8vZW5kIG9mIGhhcmRjb2RlXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgLy9hZGQgcGFyYWxsYXggdGFuZ2wgbG9nb1xuICAgICAgICAkKHRoaXMuZ2V0RE9NTm9kZSgpKS5kcmFnZ2FibGUoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAkKFwiI3NsYXRlXCIpLmhlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gJChcIiNzbGF0ZVwiKS53aWR0aCgpO1xuICAgICAgICB0aGlzLmFkZChudWxsLCBudWxsLCBudWxsLCAxKTtcbiAgICB9LFxuICAgIG5leHRJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudW5pcXVlSWQgPSB0aGlzLnVuaXF1ZUlkIHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzLnVuaXF1ZUlkKys7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKGxvY2F0aW9uLCBub2RlLCBwYXJlbnQsIG51bWJlcikge1xuICAgICAgICB2YXIgYXJyID0gdGhpcy5zdGF0ZS5ub2RlcztcbiAgICAgICAgaWYobm9kZSA9PSBudWxsICYmIHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMubmV4dElkKCksXG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zdGF0ZS50ZXh0WzBdLFxuICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1swXSxcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAvLzc1IGlzIDEvMiBub2RlIGhlaWdodCBhbmQgd2lkdGhcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMud2lkdGggLyAyIC0gNzUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5oZWlnaHQgLyAyIC0gNzUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmKHBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLm5leHRJZCgpO1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLnRleHRbaWQgJSAyMl0sXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuc3RhdGUuZGV0YWlsc1tpZCAlIDIyXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLndpZHRoIC8gMiArIDMwMCAqIE1hdGguc2luKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSAtIDc1LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLmhlaWdodCAvIDIgKyAzMDAgKiBNYXRoLmNvcygoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSkgLSA3NSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbG9jYXRpb24ucmlnaHQ7XG4gICAgICAgICAgICB2YXIgdG9wID0gbG9jYXRpb24udG9wO1xuXG4gICAgICAgICAgICAvL2ltYWdlcyBnb2luZyBub3JtYWxseSwgdGV4dCBhbmQgZGV0YWlscyBza2lwcGluZ1xuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDw9IG51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5uZXh0SWQoKTtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zdGF0ZS50ZXh0W2lkICUgMjJdLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiB0aGlzLnN0YXRlLmRldGFpbHNbaWQgJSAyMl0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogcmlnaHQgKyAzMDAgKiBNYXRoLnNpbigoaSAvIG51bWJlcikgKiAyICogTWF0aC5QSSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArIDMwMCAqIE1hdGguY29zKChpIC8gbnVtYmVyKSAqIDIgKiBNYXRoLlBJKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBub2RlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm9kZXM6IGFycn0pO1xuICAgIH0sXG4gICAgZGlzcGxhY2U6IGZ1bmN0aW9uKG5vZGUsIHBhcmVudCkge1xuICAgICAgICB2YXIgcmVmZXJlbmNlID0ge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICByaWdodDogbm9kZS5zdHlsZS5yaWdodCxcbiAgICAgICAgICAgICAgICB0b3A6IG5vZGUuc3R5bGUudG9wIC0gMTAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuZ2xlID0gdGhpcy5maW5kQW5nbGUocGFyZW50LCBub2RlLCByZWZlcmVuY2UpO1xuICAgICAgICB2YXIgZGlzcGxhY2VtZW50ID0ge1xuICAgICAgICAgICAgeTogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICAgICAgeDogTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpc3BsYWNlbWVudDtcbiAgICB9LFxuICAgIHByb2xpZmVyYXRlOiBmdW5jdGlvbihsb2NhdGlvbiwgbm9kZSwgcGFyZW50LCBudW1iZXIpIHtcbiAgICAgICAgLy9wcm9saWZlcmF0ZSBuZWVkcyB0byB0YWtlIGluIGEgbnVtYmVyIHBhcmFtZXRlciBsYXRlciB3aGVuIGhvb2tpbmcgdG8gdGhlIGJhY2tlbmRcbiAgICAgICAgdGhpcy5hZGQobG9jYXRpb24sIG5vZGUsIHBhcmVudCwgbnVtYmVyKTtcbiAgICB9LFxuICAgIGZpbmRBbmdsZShwMCxwMSxwMikge1xuICAgICAgICB2YXIgYSA9IE1hdGgucG93KHAxLnN0eWxlLnJpZ2h0LXAwLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDEuc3R5bGUudG9wLXAwLnN0eWxlLnRvcCwyKSxcbiAgICAgICAgYiA9IE1hdGgucG93KHAxLnN0eWxlLnJpZ2h0LXAyLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDEuc3R5bGUudG9wLXAyLnN0eWxlLnRvcCwyKSxcbiAgICAgICAgYyA9IE1hdGgucG93KHAyLnN0eWxlLnJpZ2h0LXAwLnN0eWxlLnJpZ2h0LDIpICsgTWF0aC5wb3cocDIuc3R5bGUudG9wLXAwLnN0eWxlLnRvcCwyKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHAxLnN0eWxlLnJpZ2h0IDwgcDAuc3R5bGUucmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiAyICogTWF0aC5QSSAtIE1hdGguYWNvcygoYStiLWMpIC8gTWF0aC5zcXJ0KDQgKiBhICogYikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWNvcygoYSArIGIgLSBjKSAvIE1hdGguc3FydCg0ICogYSAqIGIpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihuZXdUZXh0LCBpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnJbaV0udGV4dCA9IG5ld1RleHQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vZGVzOmFycn0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLnN0YXRlLm5vZGVzO1xuICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtub2RlczogYXJyfSk7XG4gICAgfSxcbiAgICBlYWNoTm9kZTogZnVuY3Rpb24obm9kZSwgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxOb2RlIFxuICAgICAgICAgICAgICAgICAgICBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4PXtpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGV9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLnJlbW92ZX1cbiAgICAgICAgICAgICAgICAgICAgb25Qcm9saWZlcmF0ZT17dGhpcy5wcm9saWZlcmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMuc3RhdGUubm9kZXNbaV0uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIG5vZGU9e3RoaXMuc3RhdGUubm9kZXNbaV19XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudD17dGhpcy5zdGF0ZS5ub2Rlc1tpXS5wYXJlbnR9XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM9e3RoaXMuc3RhdGUubm9kZXNbaSAlIDIyXS5kZXRhaWxzfVxuICAgICAgICAgICAgICAgICAgICBpbWFnZT17dGhpcy5zdGF0ZS5pbWFnZXNbaSAlIDIyXX1cbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50PXt0aGlzLmRpc3BsYWNlfVxuICAgICAgICAgICAgICAgID57bm9kZS50ZXh0fTwvTm9kZT5cbiAgICAgICAgICAgICk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGF0ZVwiIGlkPVwic2xhdGVcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5ub2Rlcy5tYXAodGhpcy5lYWNoTm9kZSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNsYXRlOyJdfQ==

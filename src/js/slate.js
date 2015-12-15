var Node = require('./node');

var Slate = React.createClass({
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
                <Node 
                    key={node.id}
                    index={i}
                    onChange={this.update}
                    onRemove={this.remove}
                    onProliferate={this.proliferate}
                    style={this.state.nodes[i].style}
                    node={this.state.nodes[i]}
                    parent={this.state.nodes[i].parent}
                    details={this.state.nodes[i % 22].details}
                    image={this.state.images[i % 22]}
                    displacement={this.displace}
                >{node.text}</Node>
            );
    },
    render: function() {
        return (
            <div className="slate" id="slate">
                {this.state.nodes.map(this.eachNode)}
            </div>

        );
    }
});

module.exports = Slate;
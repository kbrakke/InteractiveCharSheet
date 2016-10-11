/**
 * Created by Kris on 5/20/2016.
 */
var StatBox = React.createClass({
    render: function() {
        if(jQuery.isEmptyObject(this.props.data)){
            return(
                <div className="statBox" style={col4}>
                    <h1>LOADING</h1>
                </div>
            )
        }
        var stat = parseInt(this.props.data.stats[this.props.name.toLowerCase()])
        var sign = stat >= 10 ? '+' : '';
        return(
            <div className="statBox" style={col4}>
                <h1>{this.props.name}</h1>
                <div className="scoreAndMod" style={col6}>
                    <h3>Mod: {sign}{Math.floor((stat-10)/2)}</h3>
                    <p>Score: {stat}</p>
                </div>
                <div className="skillsPage">
                </div>
            </div>
        );
    }
});
var Ac = React.createClass({
    calculateAc: function(){
        var dex_mod=Math.floor((parseInt(this.props.dex)-10)/2)
        var acByArmor = {
            "leatherArmor" : 11+dex_mod,
            "studdedLeatherArmor" : 12+dex_mod
        };
        return acByArmor[this.props.armor]
    },
    render: function() {
        return(
            <div className="ac" style={col4}>
                <h1>ARMOR CLASS</h1>
                <b>{this.calculateAc()}</b>
            </div>
        )
    }
})
var StatPage= React.createClass({
    getCharacterDataFromServer: function() {
        $.ajax({
            url: this.props.url+'ellyjoybelle.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                //console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return{data: {}}
    },
    componentDidMount: function() {
        this.getCharacterDataFromServer;
        setInterval(this.getCharacterDataFromServer, 500);
    },
    render: function() {
        //console.log(this.state.data)
        return (
            <div className="statPage">
                <div className="row">
                    <StatBox name="STR" data={this.state.data}/>
                    <Ac armor={this.state.data.armor} dex={this.state.data}/>
                    <StatBox name="INT" data={this.state.data}/>
                </div>
                <div className="row">
                    <StatBox name="DEX" data={this.state.data}/>
                    <StatBox />
                    <StatBox name="WIS" data={this.state.data}/>
                </div>
                <div className="row">
                    <StatBox name="CON" data={this.state.data}/>
                    <div className="speed" style={col2}>
                        {this.state.data.speed}
                    </div>
                    <div className="vision" style={col2}>
                        {this.state.data.vision}
                    </div>
                    <StatBox name="CHA" data={this.state.data}/>
                </div>
            </div>
        )
    }
});
var col4 = {
    float: 'left',
    width: '33.33333%',
    borderStyle: 'groove',
    boxSizing: 'border-box'
}
var col2 = {
    float: 'left',
    width: '16.666667%',
    borderStyle: 'groove',
    boxSizing: 'border-box'
}
var col6 = {
    float: 'left',
    width: '50%',
    borderStyle: 'groove',
    boxSizing: 'border-box'
}

ReactDOM.render(
  <StatPage url="http://localhost:8080/characters/"/>,
  document.getElementById('content')
);
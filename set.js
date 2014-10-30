Array.prototype.shuffle = function() {
    var result = [];
    while( this.length ) {
        var index = Math.floor( this.length * Math.random() );
        result.push( this[ index ] );
        this.splice(index, 1);
    }
    return result;
};

var cards = [];
var Count = 12;
var _Figure = ['diamond', 'oval', 'squiggle'];
var _Style = ['solid', 'striped', 'open'];
var _Color = ['blue', 'green', 'red'];

function card_html(fig, style, color, count){
    html = '<div class="box elem"><div class="box td card">';
    img = '<img src="' + _Figure[fig] + '_' + _Style[style] + '_' + _Color[color] + '.png' + '" />';
    for(var i = 0; i <= count; i++){
        html += img;
    }
    html += "</div></div>";
    return html;
}

function init(){
    var i = 0;
    for(var fig = 0; fig < 3; fig++){
        for(var style = 0; style < 3; style++){
            for(var color = 0; color < 3; color++){
                for(var cnt = 0; cnt < 3; cnt++){
                    cards[i] = {};
                    cards[i].fig = fig;
                    cards[i].style = style;
                    cards[i].color = color;
                    cards[i].count = cnt;
                    cards[i].html = card_html(fig, style, color, cnt);
                    i++;
                }
            }
        }
    }
    cards = cards.shuffle();
}
function go(elem){
    ind = $(elem).attr('i');
    alert("fig:"+cards[ind].fig );
    $(elem).find('div:first').addClass("selected");
}

function draw(){
    $(".content").empty();
    for(var i = 0; i < Count && i < cards.length; i++){
        elem = $(cards[i].html);
        elem.attr('i', i);
        elem.click(function(){
            go(this);
        });
        $(".content").append(elem);
    }
}
$(document).ready(function(){
    init();
    draw();
    $("#next").click(function(){
        if(Count < 21){
            Count += 3;
    }
    draw();
    });
});
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
var SelCount = 0;
var _Figure = ['diamond', 'oval', 'squiggle'];
var _Style = ['solid', 'striped', 'open'];
var _Color = ['blue', 'green', 'red'];

function card_html(fig, style, color, count){
    //html = '<div class="box elem"><div class="box td card">';
    html = '<td>';
    img = '<img src="' + _Figure[fig] + '_' + _Style[style] + '_' + _Color[color] + '.png' + '" />';
    for(var i = 0; i <= count; i++){
        html += img;
    }
//    html += "</div></div>";
    html += "</td>";
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
                    cards[i].selected = false;
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
    console.log(ind);
    cards[ind].selected = !cards[ind].selected;
    if(cards[ind].selected){
        $(elem).addClass("not_selected");
        $(elem).removeClass("selected");
        SelCount--;
    }
    else {
        $(elem).removeClass("not_selected");
        $(elem).addClass("selected");
        SelCount++;
        if(SelCount == 3){
            Check();
        }
    }
}

function draw(){
    $(".game").empty();
    cols = Math.ceil(Math.min(Count, cards.length) / 3) ;
    var i = 0;
    for(var rownum = 0; rownum < 3; rownum++){
        var row = $("<tr></tr>");
        for(var colnum = 0; colnum < cols; colnum++){
            var i = colnum*3 + rownum;
            if(i < cards.length){
                td = $(cards[i].html);
                td.attr('i', i);
                td.click(function(){
                    go(this);
                });
            } else {
                td = $("<td></td>");
            }
            row.append(td);
        }
        $(".game").append(row);
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
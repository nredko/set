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
var LastHint = [0, 0, 0];
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
                    cards[i].hint = false;
                    cards[i].html = card_html(fig, style, color, cnt);
                    i++;
                }
            }
        }
    }
    cards = cards.shuffle();
    //cards.splice(12);
}

function clear(){
    for(var i = 0; i < cards.length; i++){
        cards[i].selected = false;
        cards[i].hint = false;
    }
    SelCount = 0;
}

function triple(v1, v2, v3){
    return ((v1 == v2 && v2 == v3) || (v1 != v2 && v2!= v3 && v1 != v3));
}

function is_set(card1, card2, card3){
    return triple(card1.fig, card2.fig, card3.fig) &&
           triple(card1.color, card2.color, card3.color) &&
           triple(card1.style, card2.style, card3.style) &&
           triple(card1.count, card2.count, card3.count);
}

function check(){
    var cnt = Math.min(Count, cards.length);
    var selected = [];
    for(var i = 0; i < cnt; i++){
        if(cards[i].selected){
            cards[i].num = i;
            selected.push(cards[i]);
        }
    }
    if(selected.length == 3 && is_set(selected[0], selected[1], selected[2])){
        showAlert("Правильно!");
        cards.splice(selected[2].num, 1);
        cards.splice(selected[1].num, 1);
        cards.splice(selected[0].num, 1);
        clear();
        LastHint = [0,0,0];
        if(Count > 12)
            Count -=3;
        draw();
        if(!has_set() && cards.length <= 12){
            showAlert("Игра закончена.");
            return;
        }

    } else {
        showAlert("Неправильно! Это не СЕТ.");
    }
}

function has_set(){
    var cnt = Math.min(Count, cards.length);
    for(var i = 0; i < cnt; i++){
        for(var j = i + 1; j < cnt; j++){
            for(var k = j + 1; k < cnt; k++){
                if(is_set(cards[i], cards[j], cards[k])) {
                    return true;
                }
            }
        }
    }
    return false;
}


function hint(){
    clear();
    if(!has_set()){
        showAlert("Нет вариантов");
        LastHint = [0,0,0];
        return;
    }

    var cnt = Math.min(Count, cards.length);
    for(i = LastHint[0]; i < cnt; i++){
        for(j = Math.max(i + 1, LastHint[1]); j < cnt; j++){
            for(k = Math.max(j + 1, LastHint[2]); k < cnt; k++){
                if(is_set(cards[i], cards[j], cards[k])) {
                    cards[i].hint = true;
                    cards[j].hint = true;
                    cards[k++].hint = true;
                    if(k == cnt){
                        k = 0;
                        j++;
                    }
                    if(j == cnt){
                        j = 0;
                        i++;
                    }
                    if(i == cnt){
                        i = 0;
                    }
                    LastHint = [i, j, k];
                    draw();
                    return;
                }    
            }
            LastHint[2] = 0;
        }
        LastHint[1] = 0;
    }
    LastHint[0] = 0;
}

function showAlert(str){
    $("#alert").removeClass("hidden");
    $("#alert").text(str);
    setTimeout(function(){$("#alert").addClass("hidden");}, 5000);
}

function go(elem){
    LastHint = 0;
    showAlert("");
    ind = $(elem).attr('i');
    cards[ind].selected = !cards[ind].selected;
    if(cards[ind].selected){
        if(SelCount == 3){
            clear();
            cards[ind].selected = true;
        }
        SelCount++;
        if(SelCount == 3){
            check();
        }
    }
    else {
        SelCount--;
    }
    draw();

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
                if(cards[i].selected){
                    td.addClass('selected');
                } else if(cards[i].hint){
                    td.addClass('hint');
                }
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
            clear();
            LastHint = [0,0,0];
        }
        draw();
    });
    $("#hint").click(function(){
        hint();
    });
});
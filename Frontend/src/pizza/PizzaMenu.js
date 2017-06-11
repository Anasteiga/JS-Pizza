/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List;
var API = require('../API');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    
    $("#pizza-list-quantity").html(list.length);
    
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    function _filter (content, filter) {
        var res;
        if (filter=="vega")
            res = true;
        Object.keys(content).forEach(function(key){
            if (filter=="vega") {
                if (key=="meat" || key=="ocean" || key=="chicken") {
                    return res = false;
                }
            } else if (key==filter) {
                res = true;
                return false;
            }
        });
        return res;
    }
    
    if (filter=="all") {
        pizza_shown = Pizza_List;
    } else {
        Pizza_List.forEach(function(pizza){
            if (_filter(pizza.content, filter))
                pizza_shown.push(pizza);
        });
    }

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    API.getPizzaList(function(err, data) {
        Pizza_List = data;
        //Показуємо усі піци
        showPizzaList(Pizza_List);
    
        var filters = $("#filters");
        var a = filters.find("a");
        filters.find("a").each(function() {
            var element = $(this);
            element.click(function(e){
                e.preventDefault();
                filters.find("a").each(function() {
                    $(this).removeClass("active");
                });
                element.addClass("active");
                filterPizza(element.attr("href"));
                $("#pizza-types").html(element.attr("title"));
            });
        }); 
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
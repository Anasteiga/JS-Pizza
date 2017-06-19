/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../storage/Storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart-items");

function addToCart(pizza, size) {

    function findElement (e) {
        var index = -1;
        Cart.forEach(function(element) {
            if (e.pizza.id==element.pizza.id && e.size==element.size)
                index = Cart.indexOf(element);
        });
        return index;
    }
    
    var newItem = {
        pizza: pizza,
        size: size,
        quantity: 1
        };
    var index = findElement(newItem);
    if (index==-1) {
        Cart.push(newItem);
    } else {
        Cart[index].quantity++;
    }
    
    updateCart();
}

function removeFromCart(cart_item) {
    Cart.splice(Cart.indexOf(cart_item), 1);
    updateCart();
}

function initialiseCart() {
    Cart = Storage.get("cart") || Cart;

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function totalPrice () {
    var price = 0;
    Cart.forEach(function(element) {
        price += element.pizza[element.size].price*element.quantity;
    });
    return price;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    Storage.set("cart", Cart);

    //Очищаємо старі піци в кошику
    $cart.html("");
    if (Cart.length==0) {
        $cart.html('<h4 id="empty-label">Пусто в холодильнику?<br />Замовте піцу!</h4>');
    }
    
    $("#cart-list-quantity").html(Cart.length);
    
    $("#total").html(totalPrice() + " грн.");
    
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            cart_item.quantity ++;
            updateCart();
        });
        $node.find(".minus").click(function(){
            if (cart_item.quantity > 1) {
                cart_item.quantity --;
            } else {
                removeFromCart(cart_item);
            }
            updateCart();
        });
        $node.find(".remove").click(function(){
            removeFromCart (cart_item);
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

}

$("#clear").click(function(){
    Cart = [];
    updateCart();
});

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.totalPrice = totalPrice;

exports.PizzaSize = PizzaSize;
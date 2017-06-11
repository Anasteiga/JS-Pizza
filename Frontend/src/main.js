/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

    jQuery.validator.addMethod("onlyletters", 
        function(value, element) {
            return /^[a-zA-ZА-Яа-яієїІЄЇ]+$/.test(value);
        }, "");

    jQuery.validator.addMethod("phone", 
        function(value, element) {
            return /^(\+?(380[0-9]{9})|(0[0-9]{9}))+$/.test(value);
        }, "");
    
    $("#submit").click(function() {
        $("#buyform").valid();    
    });
    
    $("#buyform").validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
          onlyletters: true
        },
        phone: {
          required: true,
          phone: true
        },
        address: {
          required: true
        }
      },
      messages: {
        name: {
          required: "Будь ласка введіть тільки ваше ім'я, без цифр",
          minlength: "Будь ласка введіть тільки ваше ім'я, без цифр",
          onlyletters: "Будь ласка введіть тільки ваше ім'я, без цифр"
        },
        phone: {
          required: "Введіть номер телефону у форматі +380 або почніть з 0",
          phone: "Введіть номер телефону у форматі +380 або почніть з 0"
        },
        address: {
          required:"Введіть адресу доставки піци"
        }
      }
    });

});
/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

function base64(str) {
    return new Buffer(str).toString('base64');
}
var crypto = require('crypto');

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);
    var order = {
        version: 3,
        public_key: "i64748828428",
        action: "pay",
        amount: order_info.sum,
        currency: "UAH",
        description: "Ім'я: " + order_info.name + ", " + "Номер: " + order_info.phone + ", " + "Адреса: " + order_info.address,
        order_id: Math.random(),
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1("2e1z1eaLL87mDR7nxrFSpMujDrE3p7JfstaJGzIF" + data + "2e1z1eaLL87mDR7nxrFSpMujDrE3p7JfstaJGzIF");

    res.send({
        success: true,
        data: data,
        signature: signature
    });
};
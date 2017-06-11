/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Вибір Піци',
        moreHeader:''
    });
};

exports.orderPage = function(req, res) {
    res.render('orderPage', {
        pageTitle: 'Замовлення',
        moreHeader: '<link rel="stylesheet/less" type="text/css" href="assets/less/no-cart-page.less" />'
    });
};
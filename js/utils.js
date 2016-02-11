/*global
    $,
    Masonry
*/
(function () {
    'use strict';
    var el = document.querySelector('.grid'),
        msnry = new Masonry(el, {
            itemSelector : '.grid-item',
            percentPosition : true
        });
}());
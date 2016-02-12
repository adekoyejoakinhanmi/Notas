/*global
    $,
    Masonry
*/
(function () {
    'use strict';
    var el = document.querySelector('.grid'),
        msnry = new Masonry(el, {
            itemSelector : '.grid-item',
            columnWidth : '.grid-item',
            percentPosition : true
        });
}());
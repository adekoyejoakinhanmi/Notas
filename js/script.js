/*jslint nomen : true*/
/*global
    Backbone,
    $,
    _
*/
(function () {
    'use strict';
    var Notas = {};

    Notas.NoteModel = Backbone.Model.extend({
        defaults: {
            title: '',
            content: '',
            date: ''
        }
    });
}());

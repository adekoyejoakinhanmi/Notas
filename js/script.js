/*jslint nomen : true*/
/*global
    Backbone,
    $,
    _,
    salvattore
*/
(function () {
    'use strict';
    var Notas = {},
        notes = [{title: "A tale of two Cities", content: "t's a real pain in the ass if we want to be doing that a lot, so let's wrap it up in a neat little generator function", time: (Date.now() + 1)}, {title: "&nbsp;", content: "t's a real pain in the ass if we want to be doing that a lot, so let's wrap it up in a neat little generator function", time: (Date.now() + 10)}, {title: "A tale of two Cities", content: "eloping a library on the other hand, please take a moment to consider if you actually need jQuery as a dependency. Maybe you can include a few lines of utility code, and forgo the requirement. If you're only targeting more modern browsers, you might not need anything more than what the browser ships with.", time: (Date.now() + 11)}, {title: "Two Cities", content: "eloping a library on the other hand, please take a moment to consider if you actually need jQuery as a dependency. Maybe you can include a few lines of utility code, and forgo the requirement. If you're only targeting more modern browsers, you might not need anything more than what the browser ships with.", time: (Date.now() + 20)}, {title: "A tale of two Cities", content: "eloping a library on the other hand, please take a moment to consider if you actually need jQuery as a dependency. Maybe you can include a few lines of utility code, and forgo the requirement. If you're only targeting more modern browsers, you might not need anything more than what the browser ships with.", time: (Date.now() + 11)}],
        notesCollection,
        notesView;

    Notas.NoteModel = Backbone.Model.extend({
        defaults: {
            title: '',
            content: '',
            date: ''
        }
    });
    
    Notas.NoteView = Backbone.View.extend({
        className : "panel panel-default",
        
        template : _.template($('#note').html()),
        
        render : function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    Notas.AllNotesCollection = Backbone.Collection.extend({
        model : Notas.NoteModel
    });
    
    Notas.AllNotesView = Backbone.View.extend({
        el : $('.grid'),
        
        render : function () {         
            this.collection.each(function (note) {
                var noteView = new Notas.NoteView({model : note}),
					noteItem = noteView.render().el;
				
				this.$el
					.masonry({columnWidth : '.item', itemSelector : '.item'})
					.append(noteItem)
					.masonry("appended", noteItem);
				
            }, this);
            
            return this;
        }
    });
    
    notesCollection = new Notas.AllNotesCollection(notes);
    notesView = new Notas.AllNotesView({collection: notesCollection});
    
    notesView.render().el;
}());

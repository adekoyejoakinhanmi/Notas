/*jslint nomen : true*/
/*global
    Backbone,
    $,
    _,
    salvattore
*/

/*
	TODOS
	-----

	1. Clean up/Refactor Code base
	2. Implement note adding functionality ++
	3. Implement note deleting functionality ++
	4. Implement note editing functionality
	5. Add LocalStorage
	6. Restructure input section
*/

(function () {
    'use strict';
    var Notas = {
		Models : {},
		Views : {},
		Collections : {}
	},
        notes = [],
        notesCollection,
        notesView,
		newTaskInputView;

    Notas.Models.NoteModel = Backbone.Model.extend({
        defaults: {
            title: '',
            content: '',
            date: ''
        }
    });
    
	/*This is the view for a single model*/
    Notas.Views.NoteView = Backbone.View.extend({
        initialize : function () {
			this.model.on('destroy', this.deleteNote, this);
		},

		events: {
			'click #del-note' : 'destroy'
		},

        template : _.template($('#note').html()),
        
        render : function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

		destroy : function () {
			this.model.destroy();
		},

		deleteNote : function () {
			this.$el.remove();
		}
    });
    
    Notas.Collections.AllNotesCollection = Backbone.Collection.extend({
        model : Notas.Models.NoteModel
    });
    
	/*This view handles adding new notes*/
	Notas.Views.NewNoteInputView = Backbone.View.extend({
		el: $('.form-pad'),

		events : {
			'click #submit-note' : 'submitFunction'
		},

		submitFunction : function (e) {
			e.preventDefault();
			var title = this.$el.find('#newNoteTitle'),
				content = this.$el.find('#newNoteContent'),
				t = new Date(),
				item = new Notas.Models.NoteModel({
					title : title.val(),
					content : content.val(),
					time : t.toISOString().replace(/T|Z/g, " ").trim()
				});
			this.collection.add(item);

			title.val('');
			content.val('Start typing here...');
		}
	});

    Notas.Views.AllNotesView = Backbone.View.extend({
        el : $('.grid'),
        
		initialize : function () {
			this.collection.on('add', this.renderOne, this);
			this.collection.on('remove', this.refreshGrid, this);
		},

        render : function () {
			this.collection.each(this.renderOne, this);
            return this;
        },
		/*This is very effective feature of masonry*/
		refreshGrid : function () {
			this.$el.masonry();
		},
		renderOne : function (note) {
			var noteView = new Notas.Views.NoteView({model : note}).render().el;

			this.$el
				 .masonry({columnWidth : '.item', itemSelector : '.item'})
				 .prepend(noteView)
				 .masonry('prepended', noteView);
		}
    });
    
    notesCollection = new Notas.Collections.AllNotesCollection(notes);
    notesView = new Notas.Views.AllNotesView({collection: notesCollection});
	newTaskInputView = new Notas.Views.NewNoteInputView({collection : notesCollection});
    

    notesView.render().el;
}());

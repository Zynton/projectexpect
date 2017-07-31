var ExpectationsListView = Backbone.View.extend({
    template: _.template( $('#expectations-list-template').html() ),
    className: 'collapsible-body',

    events: {
        'keypress #new-expectation'   :   'createOnEnter'
    },

    initialize: function() {
        this.listenTo(this.collection, 'add', this.addExpectation);
        this.listenTo(this.collection, 'remove', this.removeExpectation);
        this.$el.collapsible();
    },

    render: function() {
        console.log('Render ExpectationsListView');
        console.log(this.$el);
        var self = this;
        this.$el.append( self.template( self.collection.models ) );

        // Display all expectations for this task (a new view for each)
        this.collection.models.forEach(function(expectation) {
            self.addExpectation(expectation);
        });

        this.$input = this.$el.children('#new-expectation');
        _.defer(function(){
            self.$input.focus();
        });

        return this;
    },

    addExpectation: function( expectation ) {
        var view = new ExpectationView({ model: expectation });
        this.$el.children('input').after( view.render().el );
    },

    createOnEnter: function( event ) {
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
            return;
        }

        var newExp = new Expectation({
            title: this.$input.val(), 
            validate: true
        });
        this.collection.addExpectation(newExp);

        this.$input.val('');
        this.$input.focus();
    },

    removeExpectation: function() {
        this.render();
    }
});
// Configuration du layout général
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

// Configuration de la route racine
Router.route('/', function () {
    this.render('apropos');
});

// Configuration de la route des dépots
Router.route('/depot', function () {
    this.render('depot');
});


// Configuration de la route des dépots
Router.route('/login', function () {
    this.render('login');
});

// Configuration de la route des dépots
Router.route('/restitution', function () {
    this.render('restitution');
});

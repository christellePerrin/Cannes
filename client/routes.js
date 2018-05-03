// Configuration du layout général
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('apropos');
  } else {
    this.next();
  }
},{
  except : ['login','restitution']
});

Router.route('/debug', function(){
  this.render('debug');
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
Router.route('/depot/articles', function () {
    this.render('depotarticles');
});

// Configuration de la route des dépots
Router.route('/depot/images', function () {
    this.render('depotimages');
});

// Configuration de la route des dépots
Router.route('/login', function () {
    this.render('login');
});

// Configuration de la route des dépots
Router.route('/restitution', function () {
    this.render('restitution');
});

// Configuration de la route des dépots
Router.route('/restitution/Jour1', function () {
    this.render('restitution/Jour1');
});

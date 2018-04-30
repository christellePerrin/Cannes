Template.login.events({
  "click div.login > button" : function(e,t){
    e.preventDefault();
    var userName = t.find("input[name=user]").value;
    var password = t.find("input[name=password]").value;

    Meteor.loginWithPassword(userName, password, function(error){
      if(error){
        alert(error.message);
      } else {
        Router.go('/depot');
      }
    
    });
  }
});


Template.logout.events({
  "click a.ev_logout" : function(e,t){
    Accounts.logout();
  }
});

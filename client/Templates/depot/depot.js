Template.editArticle.events({
  "submit form.editArticle" :function(e,t){
    e.preventDefault();
    var article = {titre:"", chapo:"", contenu:"", createdAt : new Date(), owner: Meteor.userId()};
    article.titre = t.find("input[name=titre]").value;
    article.chapo = t.find("input[name=chapo]").value;
    article.contenu = t.find("textarea[name=contenu]").value;
    //console.log("Coucou",article );
    Article.insert(article);

  }
});

Template.depot.helpers({
  "articles" : function(){
    return Article.find();
  }
})

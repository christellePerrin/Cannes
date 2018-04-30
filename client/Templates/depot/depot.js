selectedArticle = new ReactiveVar(undefined);


Template.editArticle.helpers({
  "selectedArticle" : function(){
    return selectedArticle.get();
  }
});

Template.editArticle.events({
  "submit form.editArticle" :function(e,t){
    e.preventDefault();
    var article = {titre:"", soustitre:"", chapo:"", contenu:"", createdAt : + new Date(), owner: Meteor.userId()};
    article.titre = t.find("input[name=titre]").value.trim();
    article.soustitre = t.find("input[name=soustitre]").value.trim();
    article.chapo = t.find("input[name=chapo]").value.trim();
    article.contenu = t.find("textarea[name=contenu]").value;
    article.createdAt = Date.now();
    //console.log("Coucou",article );
    //empecher champs vides
    if(article.titre != "" && article.chapo != "" && article.contenu != ""){
      console.log(">>>>>>> ", selectedArticle.get());
      if(selectedArticle.get() ===undefined){
        // Naouvel article
        Article.insert(article);
      } else {
        // Mise à jour d'un article existant
        Article.upsert(selectedArticle.get()._id, {$set:article});
      }

      var form = t.find("form.editArticle");
      //nettoyer apres envoi
      form.reset();
      selectedArticle.set(undefined);
    } else {
      alert("Tous les champs ne sont pas renseignés.");
    }

  }
});

Template.depot.helpers({
  "articles" : function(){
    return Article.find();
  }
})

Template.depot.events({
  "click li.ev_selectArticle" : function(e,t){
    console.log(this);
    selectedArticle.set(this);
  },
  "click li.ev_selectArticle > span.ev_removeMe" : function(e,t){
    if(confirm("Voulez-vous réellement supprimer cet article ?")){
      Article.remove(this._id);
    }
  }
});

Template.registerHelper("isOwner", function(){
    console.log(this);
    return Meteor.userId() == this.owner;
  }
);

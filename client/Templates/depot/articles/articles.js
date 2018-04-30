selectedArticle = new ReactiveVar(undefined);


Template.editArticle.helpers({
  "selectedArticle" : function(){
    return selectedArticle.get();
  },
  "articleHasImage" : function(image_id){
    console.log(image_id);
    if(selectedArticle.get() == null) return null;
    return selectedArticle.get().image_id != null;
  },
});
Template.showArticleImage.helpers({
  "showImage" : function(){
    return Images.findOne(selectedArticle.get().image_id);
  }
});

Template.editArticle.events({
  "submit form.editArticle" :function(e,t){
    e.preventDefault();
    var article = {titre:"", soustitre:"", chapo:"", contenu:"", createdAt : + new Date(), owner: Meteor.userId()};
    article.image_id = t.find("input[name=image_id]").value;
    article.titre = t.find("input[name=titre]").value.trim();
    article.soustitre = t.find("input[name=soustitre]").value.trim();
    article.chapo = t.find("textarea[name=chapo]").value.trim();
    article.contenu = t.find("textarea[name=contenu]").value.trim();
    article.createdAt = Date.now();
    //console.log("Coucou",article );
    //empecher champs vides
    if(article.titre != "" && article.chapo != "" && article.contenu != ""){
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

  },
  "click a.annuler" : function(e,t){
    selectedArticle.set(null);
  }
});

Template.depotarticles.helpers({
  "articles" : function(){
    return Article.find();
  }
})

Template.depotarticles.events({
  "click li.ev_selectArticle" : function(e,t){
    selectedArticle.set(this);
  },
  "click li.ev_selectArticle > span.ev_removeMe" : function(e,t){
    if(confirm("Voulez-vous réellement supprimer cet article ?")){
      console.log(this.image_id);
      Images.remove(this.image_id);
      Article.remove(this._id);
    }
  }
});

Template.registerHelper("isOwner", function(){
    return Meteor.userId() == this.owner;
  }
);

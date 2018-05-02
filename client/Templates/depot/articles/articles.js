selectedArticle = new ReactiveVar(undefined);

Template.editArticle.onDestroyed(function(){
  selectedArticle.set(undefined);
  uploadedImage.set(undefined);
});


Template.editArticle.helpers({
  "selectedArticle" : function(){
    return selectedArticle.get();
  },
  "articleHasImage" : function(image_id){
    if(selectedArticle.get() === undefined){
      // Nouvel article, nouvelle image ??
      if(uploadedImage.get() != undefined){
        return true;
      } else {
        return false;
      }

    } else {
      return selectedArticle.get().image_id == uploadedImage.get();
    }
    return selectedArticle.get().image_id != null;
  },
});
Template.showArticleImage.helpers({
  "showImage" : function(){
    return Images.findOne({_id:uploadedImage.get()});
  }
});

Template.editArticle.events({
  "submit form.editArticle" :function(e,t){
    e.preventDefault();
    var article = {titre:"", isArticle: true, soustitre:"", chapo:"", contenu:"", createdAt : + new Date(), owner: Meteor.userId()};
    article.image_id = t.find("input[name=image_id]").value;
    article.titre = t.find("input[name=titre]").value.trim().replace(/à/g,"a").replace(/é|è|ê/g,"e");
    article.soustitre = t.find("input[name=soustitre]").value.trim();
    article.chapo = t.find("textarea[name=chapo]").value.trim();
    article.contenu = t.find("textarea[name=contenu]").value.trim();
    article.createdAt = Date.now();
    //console.log("Coucou",article );
    //empecher champs vides
    if(article.titre != "" && article.chapo != "" && article.contenu != ""){

      if(selectedArticle.get() ===undefined){
        // Naouvel article
        article_id = Article.insert(article);
      } else {
        // Mise à jour d'un article existant
        //Article.upsert(selectedArticle.get()._id, {$set:article});
        article_id = Article.update(selectedArticle.get()._id, {$set:article});
      }
      // var i = Images.findOne(article.image_id);
      // i.meta.parent_id = article_id;
      // Images.update({_id:article.image_id}, {$set:i});

      var form = t.find("form.editArticle");
      //nettoyer apres envoi
      form.reset();
      selectedArticle.set(undefined);
      uploadedImage.set(undefined);
    } else {
      alert("Tous les champs ne sont pas renseignés.");
    }

  },
  "click a.annuler" : function(e,t){
    if(confirm("Voulez-vous réellement annuler la publication de cet article ?")){
    selectedArticle.set(null);
    if(uploadedImage.get()) Images.remove(uploadedImage.get());
    }
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
    uploadedImage.set(this.image_id);
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

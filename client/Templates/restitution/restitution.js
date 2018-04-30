Template.restitution.helpers({
  medias(){
    var articles = Article.find().fetch();
    var ids = [];
    _.each(articles, function(article){
      if(article.image_id != "") ids.push(article.image_id);
    });
    console.log(ids);
    var images = Images.find({_id: {$nin : ids}}).fetch();
    var data = _.union(articles, images);
    return data;
  } 
});
Template.showMedia.helpers({
 render(){
  if(this.isArticle) return Template["mediaArticle"];
  else return Template["mediaImage"];
 } 
});

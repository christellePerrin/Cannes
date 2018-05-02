

function getRandomInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min;
}

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
    _.each(data, function(media){
      media.position = {x:getRandomInt(100,500), y: getRandomInt(100,500)}; 
    });
    return data;
  }
});


Template.showMedia.onRendered(function(){
  ///
});


Template.showMedia.helpers({
 render(){
   console.log(this)
  if(this.isArticle) return Template["mediaArticle"];
  else return Template["mediaImage"];
 }
});

Template.showMedia.events({
  'drag .medias': function (e) {
    e.preventDefault();
    console.log(e);
    let element = e.target;
    // element.style.position = 'absolute';
    // element.style.top = e.clientY + 'px';
    // element.style.left = e.clientX + 'px';

  }
});

Template.registerHelper("debug", function(data){
  console.log(data);
});
